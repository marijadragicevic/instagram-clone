import {
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  Image,
  View,
} from "react-native";

import { COLORS } from "../../constants/Colors";
import CheckBox from "../ui/CheckBox";

import { formatDuration } from "../../utilities/format";
import { useSelector } from "react-redux";
import { selectedMediaList } from "../../redux/slices/DevicesMedia";

const MediaLibraryItem = ({
  item,
  onSelect,
  style,
  multipleSelection = false,
  imageStyle,
  numberOfColumns = 3,
}) => {
  const selectedMedia = useSelector(selectedMediaList);

  const { width } = useWindowDimensions();

  const number = selectedMedia?.find(
    (selectedMediaItem) => selectedMediaItem.id === item.id
  )?.number;

  return (
    <Pressable
      onPress={(event) => {
        event.preventDefault();
        // ?
        if (onSelect) {
          onSelect(item, multipleSelection);
        }
      }}
      style={({ pressed }) => [
        { padding: 1, position: "relative" },
        style,
        pressed && { opacity: 0.7 },
      ]}
    >
      <Image
        source={{ uri: item.uri }}
        style={[
          {
            height: 200,
            width: (width - 2 * numberOfColumns) / numberOfColumns,
          },
          imageStyle,
        ]}
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
      {item?.isSelected && <View style={[styles.overlay, imageStyle]}></View>}
      {multipleSelection && (
        <CheckBox
          style={styles.checkbox}
          isSelected={item?.isSelected}
          type="selected"
          number={number}
        />
      )}
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
  overlay: {
    padding: 2,
    backgroundColor: COLORS.global.darkGrey800Opacity,
    width: "100%",
    height: 200,
    position: "absolute",
    top: 1,
    right: 0,
    left: 1,
    bottom: 0,
  },
});
