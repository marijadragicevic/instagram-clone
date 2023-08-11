import { useContext } from "react";
import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Colors";
import { LinearGradient } from "expo-linear-gradient";
import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

const StoryFrame = ({ children, isSeen }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return isSeen ? (
    <View style={[styles.container, styles.seenContainer]}>{children}</View>
  ) : (
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
      style={styles.container}
    >
      {children}
    </LinearGradient>
  );
};

export default StoryFrame;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 2,
    borderRadius: 100,
  },
  seenContainer: {
    borderWidth: 0.5,
    borderColor: COLORS.global.lightGrey200Opacity,
  },
});
