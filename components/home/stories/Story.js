import { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { getThemeColors } from "../../../utilities/theme";
import { ThemeContext } from "../../../context/ThemeContext";
import { formatText } from "../../../utilities/format";
import StoryFrame from "../../ui/StoryFrame";

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
        <StoryFrame>
          <Image
            source={require("../../../assets/userImage.jpeg")}
            style={[styles.image, imageStyle, { borderColor: backgroundColor }]}
          />
        </StoryFrame>
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
