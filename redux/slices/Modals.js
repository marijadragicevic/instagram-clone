import { createSlice } from "@reduxjs/toolkit";

export const modalsSlice = createSlice({
  name: "modals",
  initialState: {
    isVisible: false,
  },
  reducers: {
    setVisibility(state, action) {
      state.isVisible = action.payload;
    },
  },
});

export const getIsVisible = (state) => state.modals.isVisible;

export const setVisibility = modalsSlice.actions.setVisibility;

export default modalsSlice.reducer;
