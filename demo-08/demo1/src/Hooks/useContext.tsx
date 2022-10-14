import React, { useState, useContext, ChangeEvent } from 'react'

interface UserContext {
    username: string;
    setUsername: (value: string) => void;
}

// const value = useContext(MyContext);
// 接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
// 当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。
// 定义了上下文里的数据   
const MyContext = React.createContext<UserContext>({
    username: "",
    setUsername: () => { }
})

export const MyContextProvider = (props: any) => {
    const [username, setUsername] = useState('Joye Sister');
    return (
        // 内置了 Provider 组件能力
        <MyContext.Provider value={{
            username,
            setUsername
        }}>
            {props.children}
        </MyContext.Provider>
    )
}

// 子组件
const MyEditComponent = () => {
    const myContext = useContext(MyContext);
    const [newUsername, setNewUsername] = useState("");

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUsername(e.target.value)
        // 值更新
    }
    return (
        <div>
            <input placeholder={myContext.username} onChange={handleChange} />
            <button onClick={() => myContext.setUsername(newUsername)}>Save</button>
            {/* 将新值传递给另一个context  */}
        </div>
    )
}

// 父组件
export const NewDeomo = () => {
    // connect   
    const myContext = useContext(MyContext)
    return (
        <div>
            <h3>{myContext.username}</h3>
            <MyEditComponent />
        </div>
    )
}


