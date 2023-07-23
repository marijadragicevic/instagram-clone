import { configureStore } from "@reduxjs/toolkit";

import devicesMediaReducer from "./slices/DevicesMedia";

export const store = configureStore({
  reducer: {
    devicesMedia: devicesMediaReducer,
  },
});
