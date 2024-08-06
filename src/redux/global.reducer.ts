import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import constants from "../lib/constants";

const authState = createSlice({
  name: "Global",
  initialState: constants.EMPTY_GLOBAL_STATE,
  reducers: {
    setScreen: (state, action: PayloadAction<string>) => {
      state.screen = action.payload;
    },
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    setShowEssay: (state, action: PayloadAction<boolean>) => {
      state.showEssay = action.payload;
    },
  },
});

export const { setScreen, setWidth, setIsAuthenticated, setShowEssay } = authState.actions;

export default authState.reducer;
