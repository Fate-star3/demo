import React, { useState } from 'react'
// 如果一个 input 表单元素的值是由 React 控制，就其称为受控组件。当用户将数据输入到受控组件时，会触发修改状态的事件处理器，这时由你的代码来
// 决定此输入是否有效（如果有效就使用更新后的值重新渲染）。如果不重新渲染，则表单元素将保持不变。
// 在 HTML 中，表单元素（如<input>、 <textarea> 和 <select>）通常自己维护 state，并根据用户输入进行更新。而在 React 中，可变状态
// （mutable state）通常保存在组件的 state 属性中，并且只能通过使用 setState()来更新。

// 我们可以把两者结合起来，使 React 的 state 成为“唯一数据源”。渲染表单的 React 组件还控制着用户输入过程中表单发生的操作。被 React 以这种方式
// 控制取值的表单输入元素就叫做“受控组件”。

const controlled = () => {
  const [value, setValue] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value)
  }
  const handleSubmit = (e: { preventDefault: () => void }) => {
    alert('A name was submitted: ' + value);
    e.preventDefault();
  }
  return (
    <form onSubmit={handleSubmit}>
      <label>
        名字:{value}
        <input type="text" value={value} onChange={handleChange} />
      </label>
      <input type="submit" value="提交" />
    </form>
  )
}

export default controlled