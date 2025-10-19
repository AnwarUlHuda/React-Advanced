import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './slices/cartSlice'
import React from 'react'

const appStore = configureStore({ 
    reducer : {
        cart : cartReducer,
    }
})

export default appStore;
