import { useContext } from "react";
import { StyleSheet, View, Text, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { getThemeColors } from "../../../utilities/theme";
import { ThemeContext } from "../../../context/ThemeContext";

import IconButton from "../../ui/IconButton";
import { COLORS } from "../../../constants/Colors";

const PostHeader = ({ profileImage, user }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return (
    <View style={styles.outerContainer}>
      <View style={styles.innerContainer}>
        <LinearGradient
          colors={[
            COLORS.global.lightYellow200,
            COLORS.global.lightYellow600,
            COLORS.global.lightYellow600,
            COLORS.global.lightOrange600,
            COLORS.global.lightRed400,
            COLORS.global.lightRed800,
            COLORS.global.pink300,
            COLORS.global.pink500,
            COLORS.global.pink500,
            COLORS.global.purple500,
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            borderRadius: 100,
          }}
        >
          <Image
            style={[styles.image, { borderColor: backgroundColor }]}
            source={require("../../../assets/userImage.jpeg")}
          />
        </LinearGradient>
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
