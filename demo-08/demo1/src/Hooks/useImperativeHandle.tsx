import React, { useImperativeHandle, forwardRef, useRef, memo } from 'react'
// 语法
// useImperativeHandle(ref, createHandle, [deps])
// ref
// 需要被赋值的ref对象。

// createHandle：
// createHandle函数的返回值作为ref.current的值。

// [deps]
// 依赖数组，依赖发生变化会重新执行createHandle函数。

// 应用场景：解决父组件获取子组件的数据或者调用子组件的里声明的函数。


// useImperativeHandle 应当与 forwardRef 一起使用; 这个函数和useLayoutEffect执行时机一致
// 通过useImperativeHandle可以只暴露特定的操作
// 1.通过useImperativeHandle的Hook, 将父组件传入的ref和useImperativeHandle第二个参数返回的对象绑定到了一起
// 2.所以在父组件中, 调用inputRef.current时, 实际上是返回的对象



const InputSon = forwardRef((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null)
  // 作用: 减少父组件获取的DOM元素属性,只暴露给父组件需要用到的DOM方法
  // 参数1: 父组件传递的ref属性
  // 参数2: 返回一个对象,父组件通过ref.current调用对象中方法
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        inputRef.current && (inputRef.current.focus())
      },
      state:{
        name:'joye',
        sex:'female'
      }
    }
  })
  return <input type="text" ref={inputRef} />
})

const useImperativeHandle_ = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focus = () => {
    inputRef.current && (inputRef.current.focus())
    console.log(inputRef.current);
    

  }
  return (
    <>
      <div>useImperativeHandle</div>
      <button onClick={() => focus()}>聚焦</button>
      <InputSon ref={inputRef} />
    </>
  )

}

// useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。在大多数情况下，应当避免使用 ref 这样的命令式代码。
// forwardRef可以将ref转发给子组件
// const JMInput = forwardRef((props, ref) => {
//   return <input type="text" ref={ref} />
// })

// export function ForwardDemo() {
//   // forward用于获取函数式组件DOM元素
//   const inputRef1 = useRef<HTMLInputElement>(null)
//   const getFocus = () => {
//     inputRef1.current && (inputRef1.current.focus())
//   }
// // 在父组件中可以获取子组件的Dom
//   return (
//     <div>
//       <button onClick={getFocus}>聚焦</button>
//       <JMInput ref={inputRef1} />
//     </div>
//   )
// }

export default memo(useImperativeHandle_)