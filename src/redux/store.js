import { configureStore } from '@reduxjs/toolkit'
import { routerReducer } from 'react-router-redux'
import authReducer from '../components/auth/authSlice'

export const store = configureStore({
    reducer: {
        authState: authReducer,
        routeState: routerReducer,
    },
})