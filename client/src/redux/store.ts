import { configureStore } from "@reduxjs/toolkit";
import effectReducer from './effect.ts';
import mouseReducer from './mouse.ts';

export const store = configureStore({
    reducer: {
        effect: effectReducer,
        mouse: mouseReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;