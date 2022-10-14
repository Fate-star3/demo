import React, { useContext, useState } from 'react'

interface UserContext {
  count: number
  setCount: (value: number) => void;
}
const MyContext = React.createContext<UserContext>({
  count: 0,
  setCount: () => { }
})
const AcrossComponentsMain= () => {
  const [count, setCount] = useState(0)
  return (
    <MyContext.Provider value={{
      count,
      setCount
    }}>
     <AcrossComponents/>
    </MyContext.Provider>
  )


}
const AcrossComponents = () => {
  const mycontext = useContext(MyContext)
  const btnClick =() => {
    mycontext.setCount(mycontext.count + 1)
  }
  return (
    <>
    {mycontext.count}
    <button onClick={btnClick}>click</button>
    <div>AcrossComponents</div>
    </>
  )
}

export default AcrossComponentsMain