import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useContext, useEffect, useLayoutEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import MediaPicker from "../../components/newPost/MediaPicker";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  albumsList,
  getAlbumsList,
  getDevicesMedia,
  mediaList,
  selectedMediaList,
  setMediaList,
  setSelectedMediaList,
} from "../../redux/slices/DevicesMedia";
import { useCallback } from "react";
import { Alert } from "react-native";
import { locales } from "../../locales/Locales";
import { getLanguage } from "../../redux/slices/Translation";
import {
  checkForDuplicate,
  handleUpdatePhotos,
  handleUpdateSelectedMedia,
} from "../../utilities/Utilities";

const NewPostScreen = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedMedia = useSelector(selectedMediaList);
  const photos = useSelector(mediaList);
  const albums = useSelector(albumsList);
  const selectedLanguage = useSelector(getLanguage);

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const addSelectedMedia = useCallback(
    (selectedPhoto, multipleSelection) => {
      if (!multipleSelection) {
        const updatePhotos = photos?.map((photo) => {
          if (photo?.isSelected) {
            return { ...photo, isSelected: false };
          }

          if (selectedPhoto.id === photo.id) {
            return {
              ...selectedPhoto,
              isSelected: !selectedPhoto?.isSelected,
            };
          }

          return photo;
        });

        const isSelected =
          updatePhotos?.filter((photo) => photo?.isSelected)?.length > 0;

        const updateSelectedMedia = isSelected
          ? [{ ...selectedPhoto, isSelected: true, number: 1 }]
          : [];

        dispatch(setMediaList(updatePhotos));
        dispatch(setSelectedMediaList(updateSelectedMedia));

        return;
      }

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

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <MediaPicker
        onSelect={addSelectedMedia}
        photos={photos}
        albums={albums}
      />
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
