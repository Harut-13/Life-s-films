import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    lng: 'en-US'
}

const globalSlice = createSlice({
    name: 'globalSlice',
    initialState,
    reducers: {
        changeLNG(state, action) {
            state.lng = action.payload
        }
    }
})

export const { changeLNG } = globalSlice.actions
export default globalSlice.reducer