import React, {
  useEffect,
  useContext,
  useLayoutEffect,
  useCallback,
} from "react";
import { View, Alert } from "react-native";

import MediaLibrary from "../components/showMediaFromPhone/MediaLibrary";
import IconButton from "../components/ui/IconButton";

import { getThemeColors } from "../utilities/theme";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../constants/Colors";
import { useDispatch, useSelector } from "react-redux";
import {
  albumsList,
  getAlbumsList,
  getDevicesMedia,
  mediaList,
  selectedMediaList,
  setMediaList,
  setSelectedMediaList,
} from "../redux/slices/DevicesMedia";

import { useIsFocused } from "@react-navigation/native";

const AddStoryScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const dispatch = useDispatch();

  const selectedMedia = useSelector(selectedMediaList);
  const photos = useSelector(mediaList);
  const albums = useSelector(albumsList);

  const addSelectedMedia = useCallback(
    (selectedPhoto) => {
      const duplicate = selectedMedia?.find(
        (selectedMediaItem) => selectedPhoto.id === selectedMediaItem.id
      );

      if (selectedMedia?.length === 10 && !duplicate) {
        Alert.alert("", "The limit is 10 photos or videos", [], {
          cancelable: true,
        });
        return;
      }

      const updatePhotos = photos?.map((photo) => {
        if (selectedPhoto.id === photo.id) {
          return {
            ...selectedPhoto,
            isSelected: !selectedPhoto?.isSelected,
          };
        }

        return photo;
      });

      let updateSelectedMedia = [];

      if (selectedMedia?.length === 0) {
        updateSelectedMedia = [
          ...selectedMedia,
          { ...selectedPhoto, isSelected: true, number: 1 },
        ];
      } else if (selectedMedia?.length > 0) {
        updateSelectedMedia = duplicate
          ? selectedMedia
              ?.filter(
                (selectedMediaItem) => selectedMediaItem?.id !== duplicate?.id
              )
              ?.map((filteredMedia, index) => ({
                ...filteredMedia,
                number: index + 1,
              }))
          : [
              ...selectedMedia,
              {
                ...selectedPhoto,
                isSelected: true,
                number: selectedMedia?.length + 1,
              },
            ];
      }

      dispatch(setMediaList(updatePhotos));
      dispatch(setSelectedMediaList(updateSelectedMedia));
    },
    [selectedMedia, photos]
  );

  useEffect(() => {
    if (isFocused) {
      dispatch(getAlbumsList());
      dispatch(getDevicesMedia("Camera"));
    }

    return () => {
      dispatch(setSelectedMediaList([]));
      dispatch(getAlbumsList());
      dispatch(getDevicesMedia("Camera"));
    };
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="x"
          size={30}
          color="white"
          onPress={() => navigation.navigate("HomeScreen")}
          style={{ marginRight: 10 }}
        />
      ),
      headerRight: () => (
        <IconButton
          icon="check"
          size={30}
          color="white"
          onPress={() => navigation.navigate("HomeScreen")}
          style={{ marginRight: 10 }}
        />
      ),
      headerStyle: { backgroundColor: COLORS.global.black },
      headerTintColor: COLORS.global.white,
      title: "Add to your story",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.global.black }}>
      <MediaLibrary
        onSelect={addSelectedMedia}
        photos={photos}
        albums={albums}
      />
    </View>
  );
};

export default AddStoryScreen;
