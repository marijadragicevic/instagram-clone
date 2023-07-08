import { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

import Story from "./Story";

import { loggedInUser } from "../../../screens/MessagesScreen";

import { COLORS } from "../../../constants/Colors";
import { getThemeColors } from "../../../utilities/theme";
import { ThemeContext } from "../../../context/ThemeContext";

import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const AddStoryIcon = ({ }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const navigation = useNavigation();

  return (
    <Pressable
      style={({ pressed }) => [
        styles.storyContainer,
        pressed && styles.pressed,
      ]}
      onPress={() => navigation.navigate("AddStoryScreen")}
    >
      <Story
        user={loggedInUser}
        disableGradient={true}
        imageStyle={{ borderWidth: 0 }}
      />
      <View
        style={[
          styles.iconButton,
          {
            borderColor: backgroundColor,
          },
        ]}
      >
        <Ionicons name="add" size={15} color={COLORS.global.white} />
      </View>
    </Pressable>
  );
};

export default AddStoryIcon;

const styles = StyleSheet.create({
  storyContainer: {
    position: "relative",
    marginRight: 10,
  },
  iconButton: {
    position: "absolute",
    right: 0,
    bottom: 18,
    padding: 1,
    paddingLeft: 2,
    borderWidth: 2,
    borderRadius: 50,
    backgroundColor: COLORS.global.lightBlue400,
  },
  pressed: {
    transform: [{ scale: 0.95 }],
  },
});
