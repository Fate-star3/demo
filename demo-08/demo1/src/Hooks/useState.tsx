import React, { memo, useState } from 'react'


const useState_ = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>useState:{count}</div>
      <button onClick={() => setCount(count + 1)} >+1</button></>
  )
}

export default memo(useState_)