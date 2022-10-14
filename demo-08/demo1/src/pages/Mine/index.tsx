import React, { useEffect, useState, useRef } from 'react'
import { getRestaurantsRequest } from '@/common/api'
import { Wrapper } from './style'
import { IDataType } from './constants'
interface Cache {
  index: number;
  top: number;
  bottom: number
}

let startIndex = 0 // 计算当前可见区域起始数据的 startIndex
let endIndex = 0  //  计算当前可见区域结束数据的 endIndex
let scrollTop = 0
let doc: HTMLElement | null = null
// 缓存已渲染元素的位置信息
const cache: Cache[] = []
let anchorItem: Cache = {
  index: 0, // 锚点元素的索引值
  top: 0, // 锚点元素的顶部距离第一个元素的顶部的偏移量(即 startOffset)
  bottom: 0 // 锚点元素的底部距离第一个元素的顶部的偏移量
}
let visibleCount = 0 //可视容器能容纳最大的列表数量



const Items = (props: { data?: IDataType; index?: number; cachePosition?: any; }) => {

  const { data, index, cachePosition } = props
  const node = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    cachePosition(node, index)
  }, [])

  return (
    <div className='wrapper' ref={node}  draggable="true">
      {
        data && data.map((item) => {
          return (
            <li key={item.id}  draggable="false">
              <div className="poilist-item" style={{ position: "relative" }}>
                <div className="poilist-item-icon">
                  <img className="poilist-item-icon-pic" src={item.pic} draggable="false" />
                  <div className="poilist-item-icon-poitypepic">
                    <img className="poitype-pic" src={item.pic_icon} draggable="false" />
                  </div>
                </div>
                <div className="poilist-item-info">
                  <div className="poilist-item-info1">
                    <div className="poilist-item-info1name">{item.name}{index}</div>
                  </div>
                  <div className="poilist-item-info2">
                    <div className="poilist-item-info2left">
                      <span className="poi-info-txt score">{item.score}</span>
                      <span className="poi-info-txt">{item.sales}</span>
                      <span className="poi-info-txt">{item.average}</span>
                    </div>
                    <div className="poilist-item-info2right">
                    </div>
                  </div>
                  <div className="poilist-item-info3">
                    <div className="poilist-item-info3left">
                      <span className="poi-info-txt">{item.first_send}</span>
                      <span className="poi-info-txt no-margin-right">{item.delivery}</span>
                    </div>
                    <div className="poilist-item-info3right">
                      <span className="poi-info-txt">{item.time}</span>
                      <span className="poi-info-txt no-margin-right">{item.distance}</span>
                    </div>
                  </div>
                  <div className="poilist-item-info4">
                    <div className="poilist-item-info4item">
                      <div className="poilist-item-info4itemtxt">
                        <img className="info4-item-txtlefticon" src={item.info_icon} />
                        <span className="info4-item-txt" style={{ color: "rgb(155, 118, 56)" }}>{item.info_text}</span>
                      </div>
                    </div>
                    <div className="poilist-item-info4item">
                      <div className="poilist-item-info4itemtxt">
                        <img className="info4-item-txtlefticon" src={item.info_icon2} />
                        <span className="info4-item-txt" style={{ color: "rgb(255, 128, 0)" }}>{item.info_text2}</span>
                      </div>
                    </div>
                  </div>
                  <div className="poilist-item-info5 more-icon-need">
                    <div className="d_cmm-label-comp-wrap">
                      <div className="d_sublabel-container d_multi-line">
                        <div className="d_sublabel-block">
                          <div className="d_sublabel" style={{ borderColor: "rgb(255, 217, 178)" }}>
                            <div className="d_lb-wrap">
                              <div className="d_lb" style={{ color: "rgb(255, 128, 0)" }}>{item.desc1}<span>
                              </span>
                              </div>
                            </div>
                          </div>
                          <div className="d_sublabel" style={{ borderColor: "rgb(255, 198, 193) " }}>
                            <div className="d_lb-wrap">
                              <div className="d_lb" style={{ color: "rgb(255, 74, 38)" }}>{item.desc2}<span>
                              </span>
                              </div>
                            </div>
                          </div>
                          <div className="d_sublabel" style={{ borderColor: "rgb(255, 198, 193)" }}>
                            <div className="d_lb-wrap">
                              <div className="d_lb" style={{ color: "rgb(255, 74, 38)" }}>{item.desc3}
                                <span>
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          )
        })
      }

    </div>
  )
}

const Mine = () => {

  const [dataItem, setData] = useState<IDataType>()
  const height = 105 //那约定每个列表项的高度为 60
  const bufferSize = 5 //缓存列表的大小
  useEffect(() => {
    getRestaurantsRequest().then(res => {
      setData(res.data.slice(0, 1))
    })
  }, [])
  const data = new Array(1000).fill(true)
  const [visibleData, setVisibleData] = useState<any[]>()
  const [startOffset, setStartOffset] = useState(0)
  const [endOffset, seteEndOffset] = useState(0)

  // 缓存位置  方法 cachePosition 会在每个列表项组件渲染完后(componentDidMount)进行调用
  function cachePosition(node: any, index: number) {
    const rect = node.current.getBoundingClientRect()
    const top = rect.top + window.pageYOffset //获取
    cache && cache.push({
      index,
      top, // 锚点元素的底部距离第一个元素的顶部的偏移量
      bottom: top + height // 锚点元素的底部距离第一个元素的底部的偏移量
    })
  }


  // 滚动事件处理函数
  function handleScroll(e: any) {
    if (!doc) {
      doc = window.document.body.scrollTop ? window.document.body : window.document.documentElement
      //  doc = topRef.current as HTMLDivElement
    }
    // console.log('----------', doc.scrollTop);
    // console.log(visibleData, 'data');


    let scrollTop_ = doc.scrollTop //浏览器被卷去的长度
    if (scrollTop_ > scrollTop) {
      // 浏览器滚动的距离大于锚点元素的top bottom时
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
    // console.log(cache);

    let anchorItem_ = cache.find(item => item.bottom >= scrollTop)
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
    // console.warn('startIndex, endIndex', startIndex, endIndex)
    const visibleData = data.slice(startIndex, endIndex)
    const startOffset = anchorItem.top //初始为0
    const endOffset = (data.length - endIndex) * height
    console.log(visibleData, startOffset, endOffset);

    setVisibleData(visibleData)// 计算当前可见区域的数据，并渲染到页面中
    setStartOffset(startOffset)//计算 startIndex 对应的数据在整个列表中的偏移位置 startOffset，并设置到列表上
    seteEndOffset(endOffset)//计算 endIndex 对应的数据相对于可滚动区域最底部的偏移位置 endOffset，并设置到列表上
  }


  useEffect(() => {
    // 根据可视区域的高度估算可视区域能渲染的元素个数
    visibleCount = Math.ceil(window.innerHeight / height) + bufferSize
    endIndex = startIndex + visibleCount //可视区域最后一个元素的index
    // console.log(visibleCount ,endIndex );
    updateVisibleData()
    // 滚动触发事件
    window.addEventListener('scroll', handleScroll, false)
    return () => {
      window.removeEventListener('scroll', handleScroll, false)
    }
  }, [])
  // const topRef = useRef<HTMLDivElement>(null)

  return (
    <Wrapper>
      {/* <div style={{width:'100%',height:'300px'}} ref={topRef}>1</div> */}
      <div style={{ paddingTop: `${startOffset}px`, paddingBottom: `${endOffset}px` }} >
        {
          visibleData && visibleData.map((item: any, index: number) => {
            return (
              // 子组件
              <Items
                data={dataItem}
                cachePosition={cachePosition}
                key={startIndex + index}
                index={startIndex + index}
              />
            )
          })
        }
      </div>
    </Wrapper>
  )
}


export default Mine