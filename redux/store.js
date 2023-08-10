import { configureStore } from "@reduxjs/toolkit";

import devicesMediaReducer from "./slices/DevicesMedia";
import translationReducer from "./slices/Translation";
import modalsReducer from "./slices/Modals";

export const store = configureStore({
  reducer: {
    devicesMedia: devicesMediaReducer,
    translation: translationReducer,
    modals: modalsReducer,
  },
});
