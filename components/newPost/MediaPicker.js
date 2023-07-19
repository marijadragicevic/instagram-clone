import {
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  Alert,
  useWindowDimensions,
  FlatList,
} from "react-native";

import { useIsFocused, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";

import {
  useCameraPermissions,
  launchCameraAsync,
  launchImageLibraryAsync,
  PermissionStatus,
  MediaTypeOptions,
} from "expo-image-picker";
import {
  requestPermissionsAsync,
  getAlbumAsync,
  getAssetsAsync,
  getAlbumsAsync,
} from "expo-media-library";

import IconButton from "../ui/IconButton";
import MediaList from "../ui/MediaList";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";
import ScrollDots from "../ui/ScrollDots";
import { COLORS } from "../../constants/Colors";
import MediaLibraryItem from "../showMediaFromPhone/MediaLibraryItem";

const MediaPicker = () => {
  const [pickedMediaList, setPickedMediaList] = useState([]);
  const [focusedIndex, setFocusedIndex] = useState(0);
  const [multipleSelection, setMultipleSelection] = useState(false);

  const [photos, setPhotos] = useState([0]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("Camera");

  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const isFocused = useIsFocused();
  const navigation = useNavigation();

  const [cameraPermissionInfo, requestCameraPermission] =
    useCameraPermissions();

  const { width, height } = useWindowDimensions();

  const handleMediaSubmit = useCallback(() => {
    // add media to server/context so that we can use it in other screens
    // after submit we move to location picker component
    if (pickedMediaList?.length > 0) {
      navigation?.navigate("PreviewPost");
    } else {
      Alert.alert("No media picked!", "You have to add media content first!");
    }
  }, [pickedMediaList]);

  const multipleSelectionHandler = () => {
    setMultipleSelection(!multipleSelection);
  };

  const verifyPermissions = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permsissionResponse = await requestCameraPermission();

      return permsissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permission to use this app."
      );

      return false;
    }

    return true;
  };

  // old function
  // const pickMediaHandler = async (multipleSelection) => {
  //   // when multiple is true allowsEditing is always false
  //   const response = await launchImageLibraryAsync({
  //     mediaTypes: MediaTypeOptions.All,
  //     //   allowsEditing: true,
  //     aspect: [3, 4],
  //     quality: 0.7,
  //     allowsMultipleSelection: multipleSelection,
  //   });

  //   if (!response.canceled) {
  //     const mediaUriList =
  //       response?.assets?.length > 0 &&
  //       response?.assets?.map((asset) => ({
  //         uri: asset?.uri,
  //         type: asset.type,
  //       }));
  //     setPickedMediaList(mediaUriList);
  //   }
  // };

  const pickMediaHandler = async (media) => {
    if (media) {
      setPickedMediaList([
        ...pickedMediaList,
        {
          ...media,
          type: media.mediaType,
        },
      ]);
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const response = await launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });

    if (!response?.canceled) {
      const imageList = [{ uri: response?.assets[0]?.uri, type: "image" }];
      setPickedMediaList(imageList);
    }
  };

  const handleScroll = useCallback(
    ({
      nativeEvent: {
        contentOffset: { x },
      },
    }) => {
      const offset = Math.round(x / width);
      setFocusedIndex(offset);
    },
    [setFocusedIndex]
  );

  const getAlbumsList = async () => {
    const albums = await getAlbumsAsync();
    //   {"assetCount": 861, "id": "-1739773001", "title": "Camera"}

    setAlbums(albums);
  };

  const getPhotos = async (albumName) => {
    const { status } = await requestPermissionsAsync();

    if (status === "granted") {
      const album = await getAlbumAsync(albumName);

      const photos = await getAssetsAsync({
        first: 100,
        album: album,
        sortBy: "creationTime",
        mediaType: ["photo", "video", "audio", "unknown"],
      });

      setPhotos(photos.assets);
    }
  };

  useEffect(() => {
    getAlbumsList();
    getPhotos(selectedAlbum);
  }, [selectedAlbum]);

  useEffect(() => {
    return () => {
      setMultipleSelection(false);
      setPickedMediaList([]);
      setFocusedIndex(null);
    };
  }, [isFocused]);

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerRight: () => (
        <IconButton
          icon="arrow-right"
          size={30}
          color={COLORS.global.lightBlue500}
          style={{ marginRight: 10 }}
          onPress={handleMediaSubmit}
        />
      ),
      headerLeft: () => (
        <IconButton
          icon="x"
          size={30}
          style={{ marginLeft: 10 }}
          onPress={() => navigation.goBack()}
        />
      ),
    });
  }, [navigation, textColor, pickedMediaList]);

  return (
    <View style={styles.container}>
      <FlatList
        ListHeaderComponent={() => (
          <>
            <View style={styles.mediaListContainer}>
              <MediaList
                pickedMediaList={pickedMediaList}
                onScroll={handleScroll}
                focusedIndex={focusedIndex}
              />
            </View>
            <ScrollDots
              number={pickedMediaList?.length}
              focusedIndex={focusedIndex}
            />
            <View
              style={[
                styles.buttonContainer,
                { backgroundColor: backgroundColor },
              ]}
            >
              <Picker
                selectedValue={selectedAlbum}
                style={{ color: textColor, width: 200 }}
                dropdownIconColor={textColor}
                onValueChange={(itemValue) => {
                  setSelectedAlbum(itemValue);
                  getPhotos(itemValue);
                }}
              >
                <Picker.Item value={""} label="All" />
                {albums?.map((album, index) => (
                  <Picker.Item
                    value={album.title}
                    label={album.title}
                    key={index}
                  />
                ))}
              </Picker>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  marginRight: 5,
                }}
              >
                <IconButton
                  icon={
                    multipleSelection
                      ? "checkbox-multiple-marked"
                      : "checkbox-multiple-blank-outline"
                  }
                  color={COLORS.global.white}
                  size={20}
                  style={[
                    styles.iconContainer,
                    multipleSelection && styles.enabled,
                  ]}
                  styleText={styles.selectionText}
                  onPress={multipleSelectionHandler}
                />
                <IconButton
                  icon="camera"
                  color={COLORS.global.white}
                  size={20}
                  style={styles.iconContainer}
                  onPress={takeImageHandler}
                  disabled={multipleSelection}
                />
              </View>
            </View>
          </>
        )}
        ListFooterComponent={() => (
          <FlatList
            data={photos}
            keyExtractor={(item, index) => index}
            renderItem={({ item, index }) => (
              <MediaLibraryItem
                item={item}
                multipleSelection={multipleSelection}
                imageStyle={{ height: (width - 8) / 4 }}
                numberOfColumns={4}
                onSelect={pickMediaHandler}
              />
            )}
            numColumns={4}
            style={{ backgroundColor: backgroundColor }}
          />
        )}
      />
    </View>
  );
};

export default MediaPicker;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mediaListContainer: {
    backgroundColor: COLORS.global.lightGrey300Opacity,
    width: "100%",
    height: 450,
  },
  mediaContainer: {
    position: "relative",
  },
  pagination: {
    position: "absolute",
    right: 14,
    top: 8,
    zIndex: 2,
    backgroundColor: COLORS.global.darkGrey800Opacity,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 30,
    color: COLORS.global.white,
    fontSize: 12,
    fontWeight: 600,
  },
  buttonContainer: {
    backgroundColor: "black",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconContainer: {
    backgroundColor: COLORS.global.lightGrey500,
    padding: 8,
    borderRadius: 50,
    position: "relative",
  },
  enabled: {
    backgroundColor: COLORS.global.lightBlue600,
  },
  selectionText: {
    marginLeft: 5,
    fontSize: 12,
  },
  notificationContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  notificationText: {
    fontSize: 20,
  },
});
