import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useContext, useLayoutEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import MediaPicker from "../../components/newPost/MediaPicker";

const NewPostScreen = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <MediaPicker />
    </View>
  );
};

export default NewPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
