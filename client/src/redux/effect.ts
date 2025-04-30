import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const effectSlice = createSlice({
    name: 'effect',
    initialState: {
        value: 'mode1'
    },
    reducers: {
        changeEffect: (state, action: PayloadAction<string>) => {
            state.value = action.payload;
        }
    }
});

export const { changeEffect } = effectSlice.actions;
export default effectSlice.reducer;