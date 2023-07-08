import {
  View,
  Text,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";
import {
  requestPermissionsAsync,
  getAlbumAsync,
  getAssetsAsync,
  getAlbumsAsync,
  MediaType
} from "expo-media-library";
import { useEffect, useState } from "react";
import { Image } from "react-native";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../constants/Colors";
import { Button } from "react-native-elements";
import { ScrollView } from "react-native";

const MediaLibrary = ({ textColor }) => {
  const [photos, setPhotos] = useState([0]);
  const [albums, setAlbums] = useState([]);
  const [album, setAlbum] = useState(null);

  const { width } = useWindowDimensions();

  const getAlbumsList = async () => {
    const albums = await getAlbumsAsync();

    setAlbums(albums);

  }

  const getPhotos = async (albumName) => {
    const { status } = await requestPermissionsAsync();

    if (status === "granted") {
      const album = await getAlbumAsync(albumName);

      //   {"assetCount": 861, "id": "-1739773001", "title": "Camera"}
      setAlbum(album);


      // if (album) {
      const photos = await getAssetsAsync({ first: 1000, album: album, sortBy: "creationTime", mediaType: ["photo", "video", 'audio', 'unknown'] });
      setPhotos(photos.assets);
      // }
    }
  };

  useEffect(() => {
    getAlbumsList()
    getPhotos("Camera");
  }, []);


  return (
    <>
      <ScrollView style={{ height: 150 }}>
        <Pressable onPress={() => getPhotos('')} ><Text>All</Text></Pressable>
        {
          albums?.length > 0 && albums.map((album, index) => <Pressable onPress={() => getPhotos(album.title)} key={index} style={{ backgroundColor: '#e3e3e3', margin: 5, padding: 10 }}><Text>{album.title}</Text></Pressable>)
        }
        <Text>{album?.title}</Text>
      </ScrollView>
      <FlatList
        data={photos}
        keyExtractor={(item, index) => index}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <>
                <Pressable
                  style={({ pressed }) => [
                    pressed && { opacity: 0.7, backgroundColor: "grey" },
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
                <Pressable
                  //   onPress={() => setSelectedPhoto(item)}
                  style={({ pressed }) => [
                    {
                      padding: 1,
                    },
                    pressed && { opacity: 0.7 },
                  ]}
                >
                  {/* <Image
              source={{ uri: item.uri }}
              style={{ width: 100, height: 150, margin: 5 }}
            /> */}
                  <Image
                    source={{ uri: item.uri }}
                    style={{
                      height: 180,
                      width: (width - 6) / 3,
                    }}
                    resizeMode="cover"
                  />
                </Pressable>
              </>
            );
          } else {
            return (
              <Pressable
                //   onPress={() => setSelectedPhoto(item)}
                style={({ pressed }) => [
                  {
                    padding: 1,
                  },
                  pressed && { opacity: 0.7 },
                ]}
              >
                {/* <Image
              source={{ uri: item.uri }}
              style={{ width: 100, height: 150, margin: 5 }}
            /> */}
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    height: 180,
                    width: (width - 6) / 3,
                  }}
                  resizeMode="cover"
                />
              </Pressable>
            );
          }
        }}
        numColumns={3}
      />
    </>
  );
};

export default MediaLibrary;
