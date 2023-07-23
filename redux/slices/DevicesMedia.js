import { createSlice } from "@reduxjs/toolkit";
import { Alert } from "react-native";

const devicesMediaSlice = createSlice({
  name: "devicesMedia",
  initialState: {
    mediaList: [],
    albums: [],
    selectedAlbum: null,
  },
  reducers: {
    setMediaList(state, action) {
      state.mediaList = action.payload;
    },
    setAlbums(state, action) {
      state.albums = action.payload;
    },
    setSelectedAlbum(state, action) {
      state.selectedAlbum = action.payload;
    },
  },
});

export const getDevicesMedia = () => {
  return async (dispatch) => {
    try {
    } catch (error) {
      Alert.alert("error", error);
    }
  };
};

export const mediaList = (state) => state.devicesMedia.mediaList;
export const albums = (state) => state.devicesMedia.albums;
export const selectedAlbum = (state) => state.devicesMedia.selectedAlbum;

export const setMediaList = devicesMediaSlice.actions.setMediaList;
export const setAlbums = devicesMediaSlice.actions.setAlbums;
export const setSelectedAlbum = devicesMediaSlice.actions.setSelectedAlbum;

export default devicesMediaSlice.reducer;
