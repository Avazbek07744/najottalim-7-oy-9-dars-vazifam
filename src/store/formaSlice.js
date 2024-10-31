import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value: []
}

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        add: (state, action) => {
            state.value = [...state.value, action.payload]
        },
        remove: (state, action) => {
            state.value = state.value.filter(value => {
                return value.id != action.payload
            })
        },
        clear: (state, action) => {
            state.value = []
        },
        update: (state, action) => {
            state.value = state.value.map(value => {
                if (value.id == action.payload.id) {
                    value = action.payload
                }
                return value
            })
        }
    }
})

export default formSlice.reducer;
export const { add, remove, clear, update } = formSlice.actions