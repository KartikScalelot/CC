import { push } from "react-router-redux"
import { store } from "../../../redux/store"
import { addUserData, changeLoading } from "../authSlice"

export const navigate = (path) => {
    store.dispatch(push(path))
}

export const setLoading = (isLoading) => {
    store.dispatch(changeLoading(isLoading))
}

export const setUserData = (userData) => {
    store.dispatch(addUserData(userData))
}