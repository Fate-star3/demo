import React ,{useLayoutEffect,memo}from 'react'

// useLayoutEffect的使用场景一般是处理DOM元素节点，在浏览器将渲染树绘制到页面之前执行
const useLayoutEffect_ = () => {
  useLayoutEffect(() => {
    let node = document.getElementById('test')
    if (node) {
      node.style.cssText = 'width:200px;height:100px;background:pink; color:#000'
    } 
      
  },[])
  return (
    <div id='test' >useLayoutEffect</div>
  )
}

export default memo(useLayoutEffect_)