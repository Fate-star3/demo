import React, { useState, useRef } from 'react'
// 一个非受控组件，就像是运行在 React 体系之外的表单元素。当用户将数据输入到表单字段（例如 input，dropdown 等）时，React 不需要做任何事情就
// 可以映射更新后的信息。然而，这也意味着，你无法强制给这个表单字段设置一个特定值。

const Uncontrolled = () => {
  const input = useRef<HTMLInputElement>(null)
  const handleSubmit =(e: { preventDefault: () => void }) => {
    alert('A name was submitted: ' + input.current?.value);
    e.preventDefault();
  }
  return (
   <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" ref={input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
  )
}

export default Uncontrolled