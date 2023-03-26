import { configureStore, createSlice } from '@reduxjs/toolkit';
import { fictionSlice } from './slices/fictionSlices';
import { placeSlice } from './slices/placeSlices';

export const store = configureStore({
    reducer: {
        placeReducer: placeSlice.reducer,
        fictionReducer: fictionSlice.reducer
    },
}); 