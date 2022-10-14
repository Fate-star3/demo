import React, { forwardRef, useRef, useImperativeHandle } from 'react'

// 用ref获取函数组件内部的方法

// forwardRef可以将ref转发给子组件
const InputSon = forwardRef((props, ref) => {
  const print = () => {
    console.log('i am a didi');
  }
  useImperativeHandle(ref, () => ({
    print
  }))

  return <button onClick={print}>Son</button>
})

export default function ForwardDemo() {
  // forward用于获取函数式组件DOM元素
  const btnRef = useRef<{
    print: () => void
  }>(null)

  // 在父组件中可以获取子组件的Dom
  return (
    <div>
      <div>useRef</div>
      <button onClick={() => {
        btnRef.current?.print()
      }}>Print</button>
      <InputSon ref={btnRef} />
    </div>
  )
}
