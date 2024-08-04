import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type GlobalReducer = {
  screen: string,
  width: number,
  isAuthenticated: boolean,
  showEssay: boolean,
}

const INITIAL_STATE: GlobalReducer = {
  screen: '',
  width: 0,
  isAuthenticated: false,
  showEssay: true,
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
