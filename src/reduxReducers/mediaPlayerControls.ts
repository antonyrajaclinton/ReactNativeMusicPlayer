import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
// import type { RootState } from '../ReduxStore';

// Define a type for the slice state
interface CounterState {
  playerStatus: boolean
}

// Define the initial state using that type
const initialState: CounterState = {
  playerStatus: false
}

export const counterSlice = createSlice({
  name: 'mediaPlayerControls',
  initialState,
  reducers: {
    startPlayer: (state) => {
      state.playerStatus = true;
    },
    pausePlayer: (state) => {
      state.playerStatus = false;
    },
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload
    // },
  },
})

export const { startPlayer, pausePlayer } = counterSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

export default counterSlice.reducer;