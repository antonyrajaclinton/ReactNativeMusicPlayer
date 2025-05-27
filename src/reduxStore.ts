import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux';
import mediaPlayerControls from './reduxReducers/mediaPlayerControls';
import mediaPlayerDatas from './reduxReducers/mediaPlayerDatas';
import snackbarSlice from './reduxReducers/snackbarSlice';

export const store = configureStore({
    reducer: {
        mediaPlayerControls: mediaPlayerControls,
        mediaPlayerDatas: mediaPlayerDatas,
        snackbar: snackbarSlice
    },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;



export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();