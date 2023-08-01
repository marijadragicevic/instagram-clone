import { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  useWindowDimensions,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import { Feather } from "@expo/vector-icons";

import { COLORS } from "../../constants/Colors";

import MediaLibraryItem from "./MediaLibraryItem";

import { useDispatch } from "react-redux";
import { getDevicesMedia } from "../../redux/slices/DevicesMedia";

const MediaLibrary = ({
  textColor = COLORS.global.white,
  onSelect,
  albums,
  photos,
  type = "addPost",
}) => {
  const [selectedAlbum, setSelectedAlbum] = useState("Camera");

  const dispatch = useDispatch();

  const { width } = useWindowDimensions();

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
            dispatch(getDevicesMedia(itemValue));
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
                  <MediaLibraryItem
                    item={item}
                    onSelect={onSelect}
                    type={type}
                  />
                </>
              );
            } else {
              return (
                <MediaLibraryItem item={item} onSelect={onSelect} type={type} />
              );
            }
          }}
          numColumns={3}
        />
      )}
    />
  );
};

export default MediaLibrary;
