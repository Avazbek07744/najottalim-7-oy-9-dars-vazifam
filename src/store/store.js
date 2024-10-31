import { configureStore } from '@reduxjs/toolkit'
import formSlice from './formaSlice'

export const store = configureStore({
    reducer: {
        form: formSlice
    },
})