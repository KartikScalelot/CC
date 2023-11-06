import { combineReducers, configureStore } from "@reduxjs/toolkit";
import AuthSlice from "../components/auth/AuthSlice";
import UserSlice from "../components/Cardholder/UserSlice";



const combineReducer = combineReducers({
    auth: AuthSlice,
    user: UserSlice

});

const store = configureStore({
    reducer: combineReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }).concat(),
});

export default store
