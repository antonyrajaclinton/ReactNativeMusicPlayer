import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MusicListTypes } from '../utilities/global.types';
// import type { RootState } from '../ReduxStore';

// Define a type for the slice state
interface MediaPlayerDataState {
  songLists: MusicListTypes[],
  isLoading: boolean,
  currentPlayIndex: number | null,
  totalCount: number
}

// Define the initial state using that type
const initialState: MediaPlayerDataState = {
  songLists: [],
  isLoading: true,
  currentPlayIndex: null,
  totalCount: 0
}

export const counterSlice = createSlice({
  name: 'mediaPlayerDatas',
  initialState,
  reducers: {
    setSongLists: (state, action: PayloadAction<MusicListTypes[]>) => {
      state.songLists = action.payload;
    },
    setCurrentPlayIndex: (state, action: PayloadAction<number>) => {
      state.currentPlayIndex = action.payload;
    },
    setMediaisLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setMediaTotalCount: (state, action: PayloadAction<number>) => {
      state.totalCount = action.payload;
    },
  },
})

export const { setSongLists, setCurrentPlayIndex, setMediaisLoading, setMediaTotalCount } = counterSlice.actions;

// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer;