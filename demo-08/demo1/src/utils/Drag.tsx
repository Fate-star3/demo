import React, { useState, useEffect, useRef,Children } from 'react'
import { Wrapper } from './style'

interface Data {
  id: number;
  name: string;
  age: string;
  msg: string;
}
const Item = (props: { data: Data[] }) => {
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
              <Droppable key={index} index={index} >
                <li className='item'  >
                  <span>{item.name}</span>
                  <span>{item.age}</span>
                  <span>{item.msg}</span>
                </li>
              </Droppable>
            )
          })
        }
      </div>
    </Wrapper>
  )
}

const Droppable = (props: { children: any, index: number }) => {
  const { children, index } = props
  return (
    <div draggable='true'>
      {children}
    </div>
  )
}

let startIndex: number, endIndex: number
let dragged: HTMLDivElement

const Drop = (props: { children: any; dataSource: any; onDropSuccess: any }) => {

  const { children, dataSource, onDropSuccess } = props
  let data = dataSource.slice()


  const swap = (
    arr: any[], start: number, end: number
    ) => {
    [arr[start], arr[end]] = [arr[end], arr[start]]
  }
  const reorder = (
    arr: any[], start: number, end: number
    ) => {
    const result = Array.from(arr)
    const [removed] = result.splice(start, 1)
    result.splice(end, 0, removed)

    return result
  }
  Children.map(children,(child) => {
    console.log(child);
    
  })
  console.log(children,children.props);

  const handleDrop = (event: { target: any; preventDefault: () => void }) => {

    const target = event.target
    // 防止事件默认行为（比如某些元素节点上可以打开链接），
    event.preventDefault();
    // console.log(dragged);
    // console.log(target);
    startIndex = dragged.dataset.index as unknown as number
    endIndex = (target.parentNode as HTMLDivElement).dataset.index as unknown as number
    // console.log(startIndex, endIndex);
    // swap(data, startIndex, endIndex)
    // console.log('data', data);
    // onDropSuccess(data)

  }

  useEffect(() => {
    // 开始拖拉时，在被拖拉的节点上触发，该事件的target属性是被拖拉的节点
    document.addEventListener('dragstart', function (event) {
      // 保存被拖拉节点
      dragged = event.target as HTMLDivElement;
    }, false);

    // 拖拉结束时（释放鼠标键或按下 ESC 键）在被拖拉的节点上触发，该事件的target属性是被拖拉的节点
    document.addEventListener('dragend', function (event) {

    }, false);

    // 拖拉到当前节点上方时，在当前节点上持续触发（相隔几百毫秒），该事件的target属性是当前节点
    document.addEventListener('dragover', function (event) {
      event.preventDefault()
      const target = event.currentTarget as HTMLDivElement
      // 防止拖拉效果被重置，允许被拖拉的节点放入目标节点
      // console.log(target);
    }, false);

    // 拖拉进入当前节点时，在当前节点上触发一次，该事件的target属性是当前节点
    document.addEventListener('dragenter', function (event) {
      event.preventDefault()
      // 由于该事件会冒泡，所以要过滤节点
      const target = event.target as HTMLDivElement
    }, false);

    // 拖拉操作离开当前节点范围时，在当前节点上触发，该事件的target属性是当前节点
    document.addEventListener('dragleave', function (event) {
      const target = event.target as HTMLDivElement

    }, false);

    // 被拖拉的节点或选中的文本，释放到目标节点时，在目标节点上触发。
    document.addEventListener('drop', handleDrop, false);
    return () => {

    }
  }, [])

  return (
    <>{children}</>

  )
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
      <Drop dataSource={dataMain} onDropSuccess={(newVal: React.SetStateAction<Data[]>) => { setDataMain(newVal) }} >
        {/* {[1,2,3].map(item => <p onClick={()=>{console.warn('1111')}}>{item}</p>)} */}
        {/* <Droppable></Droppable> */}
        <Item data={state}/>
      </Drop>
    </>
  )
}

export default Main


{/* <DragDropContext onDragEnd={onDragEnd}>
  <Droppable droppableId='droppable'>
    {droppableProvided => (
      <div ref={droppableProvided.innerRef}>
        {list.map((item, index: number) => (
          <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided, snapshot) => (
              <div
                ref={provided.innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                style={{
                  ...provided.draggableProps.style,
                  opacity: snapshot.isDragging ? 0.8 : 1,
                }}
              >
                <List.Item
                  key={item.name}
                  prefix={
                    <Image
                      src={item.avatar}
                      style={{ borderRadius: 20 }}
                      fit='cover'
                      width={40}
                      height={40}
                    />
                  }
                  description={item.description}
                >
                  {item.name}
                </List.Item>
              </div>
            )}
          </Draggable>
        ))}
        {droppableProvided.placeholder}
      </div>
    )}
  </Droppable>
</DragDropContext> */}
