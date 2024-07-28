import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GlobalReducer = {
  screen: string,
}

const INITIAL_STATE: GlobalReducer = {
  screen: '',
};

const authState = createSlice({
  name: "Global",
  initialState: INITIAL_STATE,
  reducers: {
    setScreen: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
  },
});

export const { setScreen } = authState.actions;

export default authState.reducer;
