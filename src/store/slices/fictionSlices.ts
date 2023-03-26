import { createSlice } from "@reduxjs/toolkit";

export const fictionSlice = createSlice({
    name: 'fictionSlice',
    initialState: { 
        selected_fiction: "no fiction selected",
    },
    reducers: {
        selectFiction: (state, action) => {
            state.selected_fiction = action.payload
        }
    }
})

export const { selectFiction } = fictionSlice.actions;