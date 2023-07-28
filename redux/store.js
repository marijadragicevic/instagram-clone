import { configureStore } from "@reduxjs/toolkit";

import devicesMediaReducer from "./slices/DevicesMedia";
import translationReducer from "./slices/Translation";

export const store = configureStore({
  reducer: {
    devicesMedia: devicesMediaReducer,
    translation: translationReducer,
  },
});
