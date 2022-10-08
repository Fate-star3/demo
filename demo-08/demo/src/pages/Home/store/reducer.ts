import * as actionTypes from './constant'
import { AnyAction } from 'redux'

const stateDefault = {
    Loading: true,
    
}

const reducer = (state = stateDefault, action: AnyAction) => {
    switch (action.type) {
       
        case actionTypes.GET_LOADING:
            return {
                ...state,
                Loading: action.data,

            }
        default:
            return state
    }
}

export default reducer