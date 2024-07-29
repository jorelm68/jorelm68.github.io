import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GlobalReducer = {
  screen: string,
  isAuthenticated: boolean,
}

const INITIAL_STATE: GlobalReducer = {
  screen: '',
  isAuthenticated: false,
};

const authState = createSlice({
  name: "Global",
  initialState: INITIAL_STATE,
  reducers: {
    setScreen: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setScreen, setIsAuthenticated } = authState.actions;

export default authState.reducer;
