import React, { memo } from 'react'

interface UserState {
    name: string;
    lastname: string;
}

interface Action {
    type: string;
    data: any;
}

const actionIds = {
    setName: "setname",
    setLastname: "setLastname"
}


const userInfoReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case actionIds.setName:
            return {
                ...state,
                name: action.data
            }
        case actionIds.setLastname:
            return {
                ...state,
                lastname: action.data
            }
        default:
            return state;
    }
}

interface Props {
    name: string;
    dispatch: React.Dispatch<Action>;
}

const EditUsername: React.FC<Props> = memo((props) => {
    return (
        <input
            value={props.name}
            onChange={(e) => props.dispatch({
                type: actionIds.setName,
                data: e.target.value
            })}
        />
    )
})

// redux reducer   封装到useReducer 函数式编程
const Demo = () => {
      
    // const [state, dispatch] = useReducer(reducer, initialArg, init);  
    // 第一个参数接受reducer处理函数
    // 第二个参数接受state初始值
    // 第三个参数接受init函数，用来初始化state
    // React 会确保 dispatch 函数的标识是稳定的，并且不会在组件重新渲染时改变。这就是为什么可以安全地从 useEffect 或 useCallback 
    // 的依赖列表中省略 dispatch。 
    // 如果 Reducer Hook 的返回值与当前 state 相同，React 将跳过子组件的渲染及副作用的执行。（React 使用 Object.is 比较算法 来比较 state。）
    const [userInfo, dispatch] = React.useReducer(userInfoReducer, {
        name: "joye",
        lastname: "Sister"
    })

    return (
        <div>
            <h3>
                <div>{userInfo.name} {userInfo.lastname}</div>
                <EditUsername name={userInfo.name} dispatch={dispatch} />
                <input
                    value={userInfo.lastname}
                    onChange={(e) => dispatch({ type: actionIds.setLastname, data: e.target.value })}
                />
            </h3>
        </div>
    )
}

export default memo(Demo)
