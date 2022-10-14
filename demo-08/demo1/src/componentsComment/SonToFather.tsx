import React, { useImperativeHandle, forwardRef, useRef, memo } from 'react'

const Son = forwardRef((props, ref) => {
  
  const sonRef = useRef<HTMLDivElement>(null)
  const click = () => {
   if (sonRef.current) {
    sonRef.current.innerHTML = '子组件向父组件通信'
    console.log(123);
    
   } 
  }
  useImperativeHandle(ref, () => ({
    click
  }))


  return (
    <div ref={sonRef}>Son</div>
  )
})

const SonToFather = () => {
  const fatherRef = useRef<HTMLDivElement>(null)
  return (
    <>
      <div >SonToFather</div>
      <button onClick={() => { fatherRef.current?.click()} }>Click</button>
      <Son ref={fatherRef} />
    </>
  )
}

export default SonToFather