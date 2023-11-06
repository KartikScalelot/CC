import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { values } from "lodash";
import { async } from "q";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { createUserServices, getAllUserServices } from "../auth/services/UserServics";

const initialState = {
    allusers: [],
    isError: false,
    isError: false
};

export const createUserProfile = createAsyncThunk(
    "user/createaccount",
    async (payload) => {
        return await createUserServices(payload);
    },
);
export const getAllUser = createAsyncThunk(
    "user/getalluser",
    async (payload) => {
        return await getAllUserServices(payload);
    },
);

const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createUserProfile.fulfilled, (state, action) => {
            // let user = action?.payload?.data?.Data;
            // state.user = user ? user : {};
        });
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            // let user = action?.payload?.data?.Data;
            state.allusers = action?.payload?.data?.Data
            // state.user = user ? user : {};
        });
    },
});
export default userSlice.reducer;

// export const selectEvent = (state) => state.eventPersonalDetails.;

// export const useEventList = () => {
//     const allEventList = useSelector(selectEvent);
//     return useMemo(() => allEventList, [allEventList]);
// };
