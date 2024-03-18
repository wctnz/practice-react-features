import { itemSlice } from './../slices/itemSlice';
import { itemsSlice } from './../slices/itemsSlice';
import { AppDispatch } from './../index';
import axios from 'axios';

export const fetchItems = (page: number, limit: number) => (dispatch: AppDispatch) => {
    try {
        dispatch(itemsSlice.actions.fetchItems())
        axios.get("https://jsonplaceholder.typicode.com/posts", {
            params: {
                _page: page,
                _limit: limit,
            }
        })
            .then(response => {
                dispatch(itemsSlice.actions.fetchItemsSuccess(response.data))
                dispatch(itemsSlice.actions.setTotalCount(response.headers["x-total-count"]))
            }
            )} catch (error) {
        dispatch(itemsSlice.actions.fetchItemsError("Что-то пошло не так!"))
    }
}

export const fetchItem = (id: number) => (dispatch: AppDispatch) => {
    try {
        dispatch(itemSlice.actions.fetchItem())
        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
            .then(response => response.json())
            .then(data => dispatch(itemSlice.actions.fetchItemSuccess(data)))
    } catch (error) {
        dispatch(itemSlice.actions.fetchItemError("Что-то пошло не так!"))
    }
}
