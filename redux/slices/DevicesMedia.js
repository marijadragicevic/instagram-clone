import { createSlice } from "@reduxjs/toolkit";

import { Alert } from "react-native";

import {
  getAlbumAsync,
  getAlbumsAsync,
  getAssetsAsync,
  requestPermissionsAsync,
} from "expo-media-library";

const devicesMediaSlice = createSlice({
  name: "devicesMedia",
  initialState: {
    mediaList: [],
    albumsList: [],
    selectedMediaList: [],
  },
  reducers: {
    setMediaList(state, action) {
      state.mediaList = action.payload;
    },
    setAlbumsList(state, action) {
      state.albumsList = action.payload;
    },
    setSelectedMediaList(state, action) {
      state.selectedMediaList = action.payload;
    },
  },
});

export const getDevicesMedia = (albumName = "") => {
  return async (dispatch) => {
    try {
      const { status } = await requestPermissionsAsync();

      if (status === "granted") {
        const album = await getAlbumAsync(albumName);

        const media = await getAssetsAsync({
          first: 100,
          album: album,
          sortBy: "creationTime",
          mediaType: ["photo", "video", "audio", "unknown"],
        });
        const updateMedia = media?.assets?.map((mediaItem) => ({
          ...mediaItem,
          isSelected: false,
          number: null,
          type: mediaItem.mediaType,
        }));
        dispatch(setMediaList(updateMedia));
      }
    } catch (error) {
      Alert.alert("Device's Media Error", error);
    }
  };
};

export const getAlbumsList = () => {
  return async (dispatch) => {
    const albums = await getAlbumsAsync();
    //   {"assetCount": 861, "id": "-1739773001", "title": "Camera"}
    dispatch(setAlbumsList(albums));
    try {
    } catch (error) {
      Alert.alert("Albums Error", error?.message);
    }
  };
};

export const mediaList = (state) => state.devicesMedia.mediaList;
export const albumsList = (state) => state.devicesMedia.albumsList;
export const selectedMediaList = (state) =>
  state.devicesMedia.selectedMediaList;

export const setMediaList = devicesMediaSlice.actions.setMediaList;
export const setAlbumsList = devicesMediaSlice.actions.setAlbumsList;
export const setSelectedMediaList =
  devicesMediaSlice.actions.setSelectedMediaList;

export default devicesMediaSlice.reducer;
