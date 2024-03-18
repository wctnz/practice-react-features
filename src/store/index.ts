import { itemSlice } from './slices/itemSlice';
import { configureStore } from "@reduxjs/toolkit"
import { itemsSlice } from "./slices/itemsSlice"

export const store = configureStore({
    reducer: {
        main: itemsSlice.reducer,
        currentItem: itemSlice.reducer
    }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>