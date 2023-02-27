import { configureStore, createSlice } from '@reduxjs/toolkit';
import { placeSlice } from './slices/placeSlices';

export const store = configureStore({
    reducer: {
        placeReducer: placeSlice.reducer
    },
}); 