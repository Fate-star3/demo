import { useState, useCallback, useEffect,memo } from 'react'

const Button = memo((props: { onClickButton: any; children: any }) => {
  const {onClickButton,children} = props
  return (
    <>
      <button onClick={onClickButton}>{children}</button>
      <span>{Math.random()}</span>   
      {/* {count && <span>count:{count}</span>} */}
    </>
  )
})

function App() {
  const [count1, setCount1] = useState(0);
  const [count2, setCount2] = useState(0);
  const [count3, setCount3] = useState(0);

  // 以上任何一个状态改变，handleClickButton1 重新生成  
  // 同步执行
  const handleClickButton1 = () => {
    setCount1(count1 + 1)
  }
  // useCallBack的本质工作不是在依赖不变的情况下阻止函数创建，而是在依赖不变的情况下不返回新的函数地址而返回旧的函数地址。
  // 不论是否使用useCallBack都无法阻止组件render时函数的重新创建！！

// useCallBack在什么情况下使用？
// 在往子组件传入了一个函数并且子组件被React.momo缓存了的时候使用

  // useCallback 是个hooks函数 做性能优化的   
  // 返回值是你真正的传给子组件的函数   
  const handleClickButton2 = useCallback(() => {
    setCount2(count2 + 1)
  }, [count2])

  useEffect(() => {
    setTimeout(() => {
      setCount2(count2 + 1)
    }, 1200)
  }, [])
  return (
    <div className="App">
      <div>
        <Button onClickButton={handleClickButton1}>Button1</Button>
        <div>{count1}</div>
      </div>
      <div>
        <Button onClickButton={handleClickButton2}>Button2</Button>
       <div> {count2}</div>
      </div>
      <div>
        <Button
          onClickButton={() => {
            setCount3(count3 + 1)
          }}>Button3</Button>
         <div> {count3}</div>
      </div>
    </div>
  )
}
// 总结
// 1.useCallBack不要每个函数都包一下，否则就会变成反向优化，useCallBack本身就是需要一定性能的
// 2.useCallBack并不能阻止函数重新创建,它只能通过依赖决定返回新的函数还是旧的函数,从而在依赖不变的情况下保证函数地址不变
// 3.useCallBack需要配合React.memo使用
export default App