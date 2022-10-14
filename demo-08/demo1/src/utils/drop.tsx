import React, { useState, useEffect, useRef } from 'react'
import { Wrapper } from './style'

const Item = (props: { data: any[] }) => {
  const { data } = props

  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          <span>Name</span>
          <span>Age</span>
          <span>Message</span>
        </div>
        {
          data.map((item, index) => {
            return (
              <li key={index} className='item' draggable='true' data-index={item.id - 1}>
                <span>{item.name}</span>
                <span>{item.age}</span>
                <span>{item.msg}</span>
              </li>
            )
          })
        }
      </div>
    </Wrapper>
  )
}


let startIndex: number, endIndex: number

const Drop = (props: { children: any; dataSource: any; onDropSuccess: any }) => {

  const { children, dataSource, onDropSuccess } = props
  const liRef = useRef<any>(null)
  let data = dataSource.slice()
  // let dragged: HTMLDivElement;

  const swap = (arr: any[], start: number, end: number) => {
    [arr[start], arr[end]] = [arr[end], arr[start]]
  }

  // useEffect(() => {
  //   // 开始拖拉时，在被拖拉的节点上触发，该事件的target属性是被拖拉的节点
  //   document.addEventListener('dragstart', function (event) {
  //     // 保存被拖拉节点
  //     dragged = event.target as HTMLDivElement;
  //     // console.log(index);

  //     // console.log(dragged);
  //   }, false);

  //   // 拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的target属性是被拖拉的节点
  //   document.addEventListener('dragend', function (event) {

  //   }, false);

  //   // 拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点
  //   document.addEventListener('dragover', function (event) {
  //     const target = event.target as HTMLDivElement

  //     // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
  //     event.preventDefault();
  //   }, false);

  //   // 拖拉进入当前节点时，在当前节点上触发一次，该事件的target属性是当前节点
  //   document.addEventListener('dragenter', function (event) {
  //     // 目标节点的背景色变紫色
  //     // 由于该事件会冒泡，所以要过滤节点
  //     const target = event.target as HTMLDivElement
  //     // target.parentNode.style.borderBottom = '1px solid blue'


  //   }, false);

  //   // 拖拉操作离开当前节点范围时，在当前节点上触发，该事件的target属性是当前节点
  //   document.addEventListener('dragleave', function (event) {
  //     const target = event.target as HTMLDivElement

  //     // 目标节点的背景色恢复原样
  //     // target.style.background = '';
  //   }, false);

  //   // 被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。
  //   document.addEventListener('drop', function (event) {
  //     const target = event.target as HTMLDivElement
  //     // 防止事件默认行为（比如某些元素节点上可以打开链接），
  //     event.preventDefault();
  //     // console.log(data);
  //     // console.log(dragged);
  //     // console.log(target);
  //     startIndex = dragged.dataset.index as unknown as number
  //     endIndex = (target.parentNode as HTMLDivElement).dataset.index as unknown as number
  //     // console.log(startIndex, endIndex);

  //     swap(data, startIndex, endIndex)
  //     console.log('data', data);
  //     // console.log(dragged.dataset);
  //     onDropSuccess(data)
  //   }, false);
  //   return () => {

  //   }
  // }, [])
  const handleDragStart = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    // e.preventDefault()
    startIndex = index
    e.currentTarget.classList.add('curr')

  }
  const handleDrop = (e: React.DragEvent<HTMLLIElement>, index: number) => {
    e.preventDefault()
    // endIndex = index
    // swap(data, startIndex, endIndex)
    // console.log('handleDrag');
    // onDropSuccess(data)
  }
  return (
    <Wrapper>
      <div className="container">
        <div className="title">
          <span>Name</span>
          <span>Age</span>
          <span>Message</span>
        </div>
        {
          data.map((item: Data, index: number) => {
            return (
              <li
                key={index}
                className='item'
                draggable='true'
                data-index={item.id - 1}
                onDragStart={(e) => handleDragStart(e, index)}
                onDrop={(e) => handleDrop(e, index)}
                onDragEnter={(e) => {
                  // e.preventDefault()
                  endIndex = index
                  swap(data, startIndex, endIndex)
                  onDropSuccess(data)
                }}
                onDragOver = {(e) => {
                  e.preventDefault()
                }}
                onDragLeave={(e) => {
                  endIndex = index
                  swap(data, startIndex, endIndex)
                  onDropSuccess(data)
                }}
                onDragEnd={(e) => {
                  e.preventDefault()
                  e.currentTarget.classList.remove('curr')

                }}
                ref={liRef}
              >
                <span>{item.name}</span>
                <span>{item.age}</span>
                <span>{item.msg}</span>
              </li>
            )
          })
        }
      </div>
    </Wrapper>
  )
}

interface Data {
  id: number;
  name: string;
  age: string;
  msg: string;
}
const Main = () => {

  const state = [
    {
      id: 1,
      name: 'Joye',
      age: '25',
      msg: 'i am a girl'
    },
    {
      id: 2,
      name: 'Cooper',
      age: '28',
      msg: 'i am a boy'
    },
    {
      id: 3,
      name: 'Bob',
      age: '18',
      msg: 'i am a cat'
    },
  ]
  const [dataMain, setDataMain] = useState<Data[]>(state)

  return (
    <>
      <Drop dataSource={dataMain} onDropSuccess={(newVal: React.SetStateAction<{ name: string; age: string; msg: string, id: number }[]>) => { setDataMain(newVal) }} >
        {/* <Item data={dataMain}  /> */}
      </Drop>
    </>
  )
}

export default Main