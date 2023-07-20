import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { getThemeColors } from "../../../utilities/theme";
import { useContext } from "react";
import { ThemeContext } from "../../../context/ThemeContext";
import { COLORS } from "../../../constants/Colors";
import { formatText } from "../../../utilities/format";

const Story = ({ user, image, imageStyle, disableGradient }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const formatedUserText = formatText(user);

  return (
    <View style={styles.container}>
      {disableGradient ? (
        <Image
          source={require("../../../assets/userImage.jpeg")}
          style={[styles.image, imageStyle]}
        />
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
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            borderRadius: 100,
          }}
        >
          <Image
            source={require("../../../assets/userImage.jpeg")}
            style={[styles.image, imageStyle, { borderColor: backgroundColor }]}
          />
        </LinearGradient>
      )}
      {user && (
        <Text style={{ color: textColor, fontSize: 12 }}>
          {formatedUserText}
        </Text>
      )}
    </View>
  );
};

export default Story;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    gap: 0,
    maxWidth: 85,
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 100,
    borderWidth: 3,
  },
});
