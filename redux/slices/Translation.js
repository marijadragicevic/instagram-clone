import { createSlice } from "@reduxjs/toolkit";

export const translationSlice = createSlice({
  name: "translation",
  initialState: {
    language: "english",
  },
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },
  },
});

export const getLanguage = (state) => state.translation.language;

export const setLanguage = translationSlice.actions.setLanguage;

export default translationSlice.reducer;
