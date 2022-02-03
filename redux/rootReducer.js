import { combineReducers } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import roomsReducer from './roomSlice'

export default combineReducers({ usersReducer, roomsReducer })

