import { combineReducers} from "redux"

import {reducer as HomeReducer}   from '@/pages/Home/store'




export default combineReducers({
  home:HomeReducer,
  
})