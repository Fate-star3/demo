import React, { useEffect, useState,useLayoutEffect,memo } from 'react'

// useEffect的使用场景很多，一般用来处理异步任务
const useEffect_ = (props: { size: number }) => {
  const [state, setState] = useState("hello world")
  const { size } = props
  const [size1, setSize] = useState(window.innerWidth)
  useEffect(() => {
    let i = 0;
    while (i <= 100000000) {
      i++;
    };
    setState("world hello");
  }, []);

  useEffect(() => {
    setSize(size)
  }, [size])
  return (
   <>
    <div>useEffect:{size1}</div>
    <div>{state}</div></>
  )
}

export default memo(useEffect_)