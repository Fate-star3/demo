import React, { useEffect, useState, useRef, memo, useLayoutEffect } from 'react'
import Item from './Item2'
import './index.css'

// 虚拟列表是对长列表的一种优化方案。在前端开发中，会碰到一些不能使用分页方式来加载列表数据的业务形态，我们称这种列表叫做长列表。
// 比如，在一些外汇交易系统中，前端会准实时的展示用户的持仓情况(收益、亏损、手数等)，此时对于用户的持仓列表一般是不能分页的。

interface Cache {
  index: number;
  top: number;
  bottom: number
}
// let startIndex = 0 // 计算当前可见区域起始数据的 startIndex
// let endIndex = 0  //  计算当前可见区域结束数据的 endIndex
// let scrollTop = 0
// let doc: HTMLElement | null = null
// // 缓存已渲染元素的位置信息
// const cache: Cache[] = []
// let anchorItem: Cache = {
//   index: 0, // 锚点元素的索引值
//   top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
//   bottom: 0 // 锚点元素的底部距离第一个元素的顶部的偏移量
// }
// let visibleCount = 0

const virtual3 = () => {
  const height = 60 //那约定每个列表项的高度为 60
  const bufferSize = 5 //缓存列表的大小
  const dataRef = useRef<any>()
  
  dataRef.current = {
    visibleCount: 0,
    anchorItem: {
      index: 0, // 锚点元素的索引值
      top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
      bottom: 0 // 锚点元素的底部距离第一个元素的顶部的偏移量
    },
    cache: [],
    doc: null,
    startIndex: 0,
    endIndex: 0,                       
    scrollTop: 0,

  }
  let startIndex = dataRef.current?.startIndex // 计算当前可见区域起始数据的 startIndex
  let endIndex = dataRef.current?.endIndex //  计算当前可见区域结束数据的 endIndex
  let scrollTop = dataRef.current?.scrollTop
  let doc = dataRef.current?.doc
  // 缓存已渲染元素的位置信息
  const cache = dataRef.current?.cache
  let anchorItem = dataRef.current?.anchorItem
  let visibleCount = dataRef.current?.visibleCount

    // {
    //   startIndex:  number;
    //   endIndex: number;
    //   scrollTop: number;
    //   doc: any;
    //   cache: Cache[];
    //   anchorItem: Cache;
    //   visibleCount: number;
    // }



  const data = new Array(1000).fill(true)
  const [visibleData, setVisibleData] = useState<any[]>()
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, seteEndOffset] = useState(0)

  // 缓存位置  方法 cachePosition 会在每个列表项组件渲染完后(componentDidMount)进行调用
  function cachePosition(node: any, index: number) {
    const rect = node.current.getBoundingClientRect()
    const top = rect.top + window.pageYOffset
    cache && cache.push({
      index,
      top,
      bottom: top + height
    })
  }

  // 滚动事件处理函数
  function handleScroll(e: any) {
    if (!doc) {
      // 兼容 iOS Safari/Webview
      doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement
    } else {
      doc = document.documentElement
    }
    console.log('----------', doc.scrollTop);
    console.log(visibleData, 'data');


    let scrollTop_ = doc.scrollTop
    if (scrollTop_ > scrollTop) {
      if (scrollTop_ > anchorItem.bottom) {
        updateBoundaryIndex(scrollTop_)
        updateVisibleData()
      }
    } else if (scrollTop_ < scrollTop) {
      if (scrollTop_ < anchorItem.top) {
        updateBoundaryIndex(scrollTop_)
        updateVisibleData()
      }
    }

    scrollTop = scrollTop_
  }

  // 计算 startIndex 和 endIndex
  function updateBoundaryIndex(scrollTop: number) {
    scrollTop = scrollTop || 0
    //用户正常滚动下，根据 scrollTop 找到新的锚点元素位置
    console.log(cache);

    let anchorItem_ = cache.find((item: { bottom: number; }) => item.bottom >= scrollTop)
    console.log(anchorItem_);

    if (anchorItem_) {
      anchorItem = {
        ...anchorItem_
      }
    }


    startIndex = anchorItem.index
    endIndex = startIndex + visibleCount
    console.warn('anchorItem.index', anchorItem.index, 'startIndex + visibleCount', startIndex + visibleCount)
  }

  function updateVisibleData() {
    console.warn('startIndex, endIndex', startIndex, endIndex)
    const visibleData = data.slice(startIndex, endIndex)
    const startOffset = anchorItem.top //初始为0
    const endOffset = (data.length - endIndex) * height
    // console.log(visibleData, startOffset, endOffset);

    setVisibleData(visibleData)// 计算当前可见区域的数据，并渲染到页面中
    setStartOffset(startOffset)//计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset，并设置到列表上
    seteEndOffset(endOffset)//计算 endIndex 对应的数据相对于可滚动区域最底部的偏移位置 endOffset，并设置到列表上
  }


  useEffect(() => {
    // 根据可视区域的高度估算可视区域能渲染的元素个数
    visibleCount = Math.ceil(window.innerHeight / height) + bufferSize
    endIndex = startIndex + visibleCount
    // console.log(visibleCount ,endIndex );
    updateVisibleData()
    // 滚动触发事件
    window.addEventListener('scroll', handleScroll, false)

    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [])

  return (
    <div>
      <div className='wrapper'>
        {/* 通过startOffset 和 endOffset ，撑开容器元素的内容高度，让其可持续的滚动；此外，还能保持滚动条处于一个正确的位置。 */}
        <div style={{ paddingTop: `${startOffset}px`, paddingBottom: `${endOffset}px` }}>
          {
            visibleData && visibleData.map((item: any, index: number) => {
              return (
                // 子组件
                <Item
                  cachePosition={cachePosition}
                  key={startIndex + index}
                  index={startIndex + index}
                />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default memo(virtual3)