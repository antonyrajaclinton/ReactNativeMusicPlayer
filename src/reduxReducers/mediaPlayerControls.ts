import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../ReduxStore';

// Define a type for the slice state
interface CounterState {
  isMediaPlaying: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  isMediaPlaying: false
}

export const counterSlice = createSlice({
  name: 'mediaPlayerControls',
  initialState,
  reducers: {
    setPlayerStatus: (state,action: PayloadAction<boolean>) => {
      state.isMediaPlaying = action.payload;
    },
    // setPlayerPause: (state) => {
    //   state.isMediaPlaying = false;
    // },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { setPlayerStatus, } = counterSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer;