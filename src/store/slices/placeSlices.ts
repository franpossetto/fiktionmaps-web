import { createSlice } from "@reduxjs/toolkit";

export const placeSlice = createSlice({
    name: 'placeSlice',
    initialState: { 
        selected_place: 'no place selected',
    },
    reducers: {
        selectPlace: (state, action) => {
            state.selected_place = action.payload
        }
    }
})

export const { selectPlace } = placeSlice.actions;