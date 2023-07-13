import React, { useState, useContext, useLayoutEffect } from "react";
import { View, Alert } from "react-native";

import MediaLibrary from "../components/showMediaFromPhone/MediaLibrary";
import IconButton from "../components/ui/IconButton";

import { getThemeColors } from "../utilities/theme";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../constants/Colors";

const AddStoryScreen = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const [selectedPhotos, setSelectedPhotos] = useState([]);

  // ?
  const addSelectedPhotos = (photo) => {
    if (selectedPhotos?.length === 10) {
      Alert.alert("", "The limit is 10 photos or videos", [], {
        cancelable: true,
      });
      return;
    }

    const isDuplicate =
      selectedPhotos?.length > 0 &&
      selectedPhotos?.find((selectedPhoto) => selectedPhoto.id === photo.id);

    if (isDuplicate) {
      const updateSelectedPhotos = selectedPhotos?.filter(
        (selectedPhoto) => selectedPhoto.id !== photo.id
      );
      setSelectedPhotos(updateSelectedPhotos);
    } else {
      setSelectedPhotos([...selectedPhotos, photo]);
    }
  };

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
      <MediaLibrary />
    </View>
  );
};

export default AddStoryScreen;
