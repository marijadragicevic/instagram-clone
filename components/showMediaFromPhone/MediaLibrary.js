import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import {
  requestPermissionsAsync,
  getAlbumAsync,
  getAssetsAsync,
  getAlbumsAsync,
} from "expo-media-library";
import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/Colors";

import MediaLibraryItem from "./MediaLibraryItem";

const MediaLibrary = ({ textColor = COLORS.global.white }) => {
  const [photos, setPhotos] = useState([0]);
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState("Camera");

  const { width } = useWindowDimensions();

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
  }, []);

  return (
    <FlatList
      style={{ flex: 1 }}
      ListHeaderComponent={() => (
        <Picker
          selectedValue={selectedAlbum}
          style={{ color: textColor }}
          dropdownIconColor={textColor}
          onValueChange={(itemValue) => {
            setSelectedAlbum(itemValue);
            getPhotos(itemValue);
          }}
        >
          <Picker.Item value={""} label="All" />
          {albums?.map((album, index) => (
            <Picker.Item value={album.title} label={album.title} key={index} />
          ))}
        </Picker>
      )}
      ListFooterComponent={() => (
        <FlatList
          data={photos}
          keyExtractor={(item, index) => index}
          renderItem={({ item, index }) => {
            if (index === 0) {
              return (
                <>
                  <Pressable
                    style={({ pressed }) => [
                      { backgroundColor: COLORS.global.darkGrey800Opacity },
                      pressed && { opacity: 0.7 },
                    ]}
                  >
                    <View
                      style={{
                        width: width / 3,
                        flex: 1,
                        padding: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                      }}
                    >
                      <Feather name="camera" color={textColor} size={25} />
                      <Text
                        style={{
                          color: textColor,
                          position: "absolute",
                          bottom: 10,
                          left: 10,
                          fontSize: 15,
                          fontWeight: 500,
                        }}
                      >
                        Camera
                      </Text>
                    </View>
                  </Pressable>
                  <MediaLibraryItem item={item} />
                </>
              );
            } else {
              return <MediaLibraryItem item={item} />;
            }
          }}
          numColumns={3}
        />
      )}
    />
  );
};

export default MediaLibrary;
