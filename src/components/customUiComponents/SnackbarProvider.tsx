import React from 'react';
import { Snackbar } from 'react-native-paper';
import { hideSnackbar } from '../../reduxReducers/snackbarSlice';
import { useAppDispatch, useAppSelector } from '../../reduxStore';

export const SnackbarProvider = () => {
    const dispatch = useAppDispatch();
    const { visible, message, actionLabel, onAction, duration } = useAppSelector((state) => state.snackbar);

    const onDismissSnackBar = () => {
        dispatch(hideSnackbar());
    };

    return (
        <Snackbar
            visible={visible}
            duration={duration}
            onDismiss={onDismissSnackBar}
            action={
                (actionLabel && onAction) ? {
                    label: actionLabel,
                    onPress: () => {
                        onAction?.();
                        onDismissSnackBar();
                    },
                } : undefined
            }
        >
            {message}
        </Snackbar>
    );
};
