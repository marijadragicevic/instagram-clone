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

const NewPostScreen = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedMedia = useSelector(selectedMediaList);
  const photos = useSelector(mediaList);
  const albums = useSelector(albumsList);

  const dispatch = useDispatch();

  const isFocused = useIsFocused();

  const updatePhotos = (selectedPhoto) => {};

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
