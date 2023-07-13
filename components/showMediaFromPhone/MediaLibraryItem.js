import { useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  Image,
} from "react-native";

import { COLORS } from "../../constants/Colors";
import CheckBox from "../ui/CheckBox";

import { formatDuration } from "../../utilities/format";

const MediaLibraryItem = ({ item, onSelect }) => {
  const [isSelected, setIsSelected] = useState(false);

  const { width } = useWindowDimensions();

  return (
    <Pressable
      onPress={() => {
        setIsSelected(!isSelected);
        // onSelect();
      }}
      style={({ pressed }) => [
        { padding: 1, position: "relative" },
        pressed && { opacity: 0.7 },
      ]}
    >
      <Image
        source={{ uri: item.uri }}
        style={{
          height: 200,
          width: (width - 6) / 3,
        }}
        resizeMode="cover"
      />
      {item.mediaType === "video" && (
        <Text
          style={{
            color: COLORS.global.white,
            fontSize: 10,
            position: "absolute",
            right: 5,
            bottom: 5,
            backgroundColor: COLORS.global.lightGrey500Opacity,
            padding: 2,
            borderRadius: 5,
          }}
        >
          {formatDuration(item.duration)}
        </Text>
      )}
      <CheckBox style={styles.checkbox} isSelected={isSelected} />
    </Pressable>
  );
};

export default MediaLibraryItem;

const styles = StyleSheet.create({
  checkbox: {
    position: "absolute",
    top: 5,
    right: 5,
  },
});
