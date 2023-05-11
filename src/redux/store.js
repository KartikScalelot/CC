import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../components/auth/services/authSlice'

export const store = configureStore({
    reducer: {
        authState: authReducer
    },
})