import { useContext } from "react";
import { Text, Image, StyleSheet, Pressable } from "react-native";
import { getThemeColors } from "../../../utilities/theme";
import { ThemeContext } from "../../../context/ThemeContext";
import { formatText } from "../../../utilities/format";
import StoryFrame from "../../ui/StoryFrame";
import { useNavigation } from "@react-navigation/native";

const Story = ({ user, image, imageStyle, disableGradient, id }) => {
  const navigation = useNavigation();

  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const formatedUserText = formatText(user);

  const handlePress = () => {
    navigation.navigate("StoriesScreen", { storyId: id });
  };

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={handlePress}
    >
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
    </Pressable>
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
  pressed: {
    transform: [{ scale: 0.9 }],
  },
});
