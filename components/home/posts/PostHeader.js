import { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { getThemeColors } from "../../../utilities/theme";
import { ThemeContext } from "../../../context/ThemeContext";

import IconButton from "../../ui/IconButton";
import StoryFrame from "../../ui/StoryFrame";

const PostHeader = ({ profileImage, user }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <StoryFrame>
          <Image
            style={[styles.image, { borderColor: backgroundColor }]}
            source={require("../../../assets/userImage.jpeg")}
          />
        </StoryFrame>
        <Text style={[styles.text, { color: textColor }]}>{user}</Text>
      </View>
      {/* transform to button */}
      <IconButton icon="dots-three-vertical" size={17} color={textColor} />
    </View>
  );
};

export default PostHeader;

const styles = StyleSheet.create({
  outerContainer: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    margin: 5,
  },
  image: {
    height: 35,
    width: 35,
    borderRadius: 100,
    borderWidth: 2,
  },
  text: { fontWeight: 700 },
});
