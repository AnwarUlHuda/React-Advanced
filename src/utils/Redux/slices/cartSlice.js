import { createSlice, current } from '@reduxjs/toolkit'
import React from 'react'

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: []
    },
    reducers: {
        addItem: (state, action) => {
            state.items.push(action.payload);
        },
        // removeItem: (state, action) => {
        //     state.items.pop();
        // },
        clearCart: (state, action) => {
            // state.items = [];
            // state.items.length = 0;
            return { items: [] }
        }
    }
})

export const { addItem, removeItem, clearCart } = cartSlice.actions

export default cartSlice.reducer
