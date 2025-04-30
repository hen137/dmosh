import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const mouseSlice = createSlice({
    name: 'mouse',
    initialState: {
        xPos: 0,
        yPos: 0
    },
    reducers: {
        updatesPos: (state, action: PayloadAction<{xPos: number, yPos: number}>) => {
            state.xPos = action.payload.xPos;
            state.yPos = action.payload.yPos;
        }
    }
});

export const { updatesPos } = mouseSlice.actions;
export default mouseSlice.reducer;