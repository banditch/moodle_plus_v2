import thunk from 'redux-thunk'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'

import userDataReducer from './features/UserDataSlice'
import adminDataReducer from './features/AdminSlice'

const reducers = combineReducers({
    userData: userDataReducer,
    adminData: adminDataReducer,
})

const persistConfig = {
    key: 'root',
    storage: AsyncStorage, // Use AsyncStorage instead of localStorage
    whitelist: ["userData", "adminData"]
} 

const persistedReducer = persistReducer(persistConfig, reducers)
export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: [thunk] 
})
