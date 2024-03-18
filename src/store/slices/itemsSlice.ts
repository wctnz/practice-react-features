import { Item } from './../../types/types';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface InitialState {
    items: Item[];
    loading: boolean;
    error: string;
    page: number
    totalCount: number
}

const initialState: InitialState = {
    items: [],
    loading: false,
    error: "",
    page: 1,
    totalCount: 0
}

export const itemsSlice = createSlice({
    name: "items",
    initialState,
    reducers: {
        fetchItems(state) {
            state.loading = true
        },
        fetchItemsSuccess(state, action: PayloadAction<Item[]>) {
            state.loading = false
            state.error = ""
            state.items = action.payload
        },
        fetchItemsError(state, action: PayloadAction<string>) {
            state.loading = false
            state.error = action.payload
        },
        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload
        },
        setTotalCount(state, action: PayloadAction<number>) {
            state.totalCount = action.payload
        },
        removePost(state, action: PayloadAction<number>) {
            state.items = state.items.filter(item => item.id !== action.payload)
        }
    }
})