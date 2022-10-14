import React, { useState, useEffect } from 'react'

const Son = (props: { count: number }) => {
  const { count } = props
  return (
    <div>{count}</div>
  )
}

const FatherToSon = () => {
  const [count, setCount] = useState(0)
  return (
    <>
      <div>FatherToSon</div>
      <button onClick={() => setCount(count + 1)}>Click</button>
      <Son count={count} />
    </>
  )
}

export default FatherToSon