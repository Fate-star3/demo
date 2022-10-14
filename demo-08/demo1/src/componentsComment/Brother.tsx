
import React, { useState, useEffect, } from 'react'
// 这种方式也安装pubsub-js插件，实现消息的发布和订阅,应用场景是兄弟组件之间传值
const Brother_A = (props: { stateA: string; setStateA: (val:string) => void; setStateB: (val:string) => void }) => {
  const { stateA, setStateA, setStateB } = props
  const onButtonClick = () => {
    setStateB(stateA)
  }
  const onResetButtonClick = () => {
    setStateA("A")
  }
  return (
    <div>
      {stateA}
      <button onClick={onButtonClick}>把组件Brother_B的B变成A</button>
      <button onClick={onResetButtonClick}>还原自身的A</button>
    </div>
  )
}

const Brother_B = (props: { stateB: string; setStateA: (val:string) => void; setStateB: (val:string) => void }) => {
  const { stateB, setStateA, setStateB } = props
  const onButtonClick = () => {
    setStateA(stateB)
  }
  const onResetButtonClick = () => {
    setStateB("B")
  }
  return (
    <div>
      {stateB}
      <button onClick={onButtonClick}>把组件Brother_A的A变成B</button>
      <button onClick={onResetButtonClick}>还原自身的B</button>
    </div>
  )
}

const Brother = () => {
  // 父组件负责状态管理    
  const [stateA, setStateA] = useState("A")
  const [stateB, setStateB] = useState("B")
  return (
    <>
      <div>Brother_A</div>
      <Brother_A stateA={stateA} setStateA={setStateA} setStateB={setStateB} />
      <div>Brother_B</div>
      <Brother_B stateB={stateB} setStateA={setStateA} setStateB={setStateB} />
    </>

  )
}

export default Brother