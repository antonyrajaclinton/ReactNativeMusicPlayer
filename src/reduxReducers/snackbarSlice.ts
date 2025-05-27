import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SnackbarStateTypes {
    visible: boolean;
    message: string;
    actionLabel?: string;
    onAction?: () => void;
    duration?: number;
}

const initialState: SnackbarStateTypes = {
    visible: false,
    message: '',
    duration: 3000,
};

const snackbarSlice = createSlice({
    name: 'snackbar',
    initialState,
    reducers: {
        showSnackbar: (state, action: PayloadAction<SnackbarStateTypes>) => {
            state.visible = true;
            state.message = action.payload.message;
            state.actionLabel = action.payload.actionLabel;
            state.onAction = action.payload.onAction;
            state.duration = action.payload.duration ?? 3000;
        },
        hideSnackbar: (state) => {
            state.visible = false;
        },
    },
});

export const { showSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
