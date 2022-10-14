import React, { useState, useMemo } from 'react'

export default function UseMemoTest() {
  // 简而言之，useMemo是用来缓存计算属性的。
  const [text, setText] = useState('')
  const [data, setData] = useState([
    { id: 1, name: 'Bob' },
    { id: 2, name: 'Joye' },
    { id: 3, name: 'Make' },
    { id: 4, name: 'Cooper' },
  ])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }

  const getList = useMemo(() => {
    return data.filter(item => {
      if (item.name.includes(text)) {
        return item
      }
    });
  }, [text]);

  return (
    <div style={{ marginTop: 20 }}>
      {/* 当输入不同的内容，会触发渲染 */}
      <input type="text" onChange={(e) => handleChange(e)} />
      {
        getList.map(item => <div key={item.id}>{item.name}</div>)
      }
    </div>
  )
}