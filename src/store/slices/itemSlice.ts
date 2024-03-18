import { Item } from './../../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    item: Item;
    loading: boolean;
    error: string;
}

const initialState: InitialState = {
    item: {
        userId: 1,
        id: 1,
        title: "",
        body: ""
    },
    loading: false,
    error: ""
}

export const itemSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        fetchItem(state) {
            state.loading = true
        },
        fetchItemSuccess(state, action: PayloadAction<Item>) {
            state.loading = false
            state.error = ""
            state.item = action.payload
        },
        fetchItemError(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        }
    }
})