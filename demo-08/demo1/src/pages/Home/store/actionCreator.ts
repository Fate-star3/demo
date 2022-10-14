// import {getHomeInfoRequest} from '@/api/request'
import { Dispatch } from 'redux'
import * as actionTypes from './constant'




export const changeLoading = (data:boolean) => ({
    type:actionTypes.GET_LOADING,
    data
})

// export const getHomeInfo = () => {
//     return (dispatch:Dispatch) => {
//         getHomeInfoRequest().then(data =>{
//             const action = changeHomeInfo(data.data.data)
//             dispatch(action)
//             dispatch(changeLoading(false))
//         })
//     }
// }