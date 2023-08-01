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
import { getLanguage } from "../redux/slices/Translation";
import { locales } from "../locales/Locales";
import {
  checkForDuplicate,
  handleUpdatePhotos,
  handleUpdateSelectedMedia,
} from "../utilities/Utilities";

const AddStoryScreen = ({ navigation }) => {
  const isFocused = useIsFocused();

  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const dispatch = useDispatch();

  const selectedMedia = useSelector(selectedMediaList);
  const photos = useSelector(mediaList);
  const albums = useSelector(albumsList);
  const selectedLanguage = useSelector(getLanguage);

  const addSelectedMedia = useCallback(
    (selectedPhoto) => {
      const duplicate = checkForDuplicate(selectedMedia, selectedPhoto?.id);

      if (selectedMedia?.length === 10 && !duplicate) {
        Alert.alert("", locales[selectedLanguage]?.mediaPickerWarning, [], {
          cancelable: true,
        });
        return;
      }

      const updatedPhotos = handleUpdatePhotos(photos, selectedPhoto);
      const updatedSelectedMedia = handleUpdateSelectedMedia(
        selectedMedia,
        selectedPhoto,
        duplicate
      );

      dispatch(setMediaList(updatedPhotos));
      dispatch(setSelectedMediaList(updatedSelectedMedia));
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
        type="addStory"
      />
    </View>
  );
};

export default AddStoryScreen;
