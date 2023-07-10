import React, { useContext, useLayoutEffect } from "react";
import { View, Text } from "react-native";

import MediaLibrary from "../components/showMediaFromPhone/MediaLibrary";
import IconButton from "../components/ui/IconButton";

import { getThemeColors } from "../utilities/theme";
import { ThemeContext } from "../context/ThemeContext";
import { COLORS } from "../constants/Colors";

const AddStoryScreen = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="x"
          size={30}
          color="white"
          onPress={() => navigation.navigate("HomeScreen")}
          style={{ marginRight: 10 }}
        />
      ),
      headerRight: () => (
        <IconButton
          icon="check"
          size={30}
          color="white"
          onPress={() => navigation.navigate("HomeScreen")}
          style={{ marginRight: 10 }}
        />
      ),
      headerStyle: { backgroundColor: COLORS.global.black },
      headerTintColor: COLORS.global.white,
      title: "Add to your story",
      headerTitleAlign: "center",
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.global.black }}>
      <MediaLibrary /*backgroundColor={COLORS.global.black}*/ />
    </View>
  );
};

export default AddStoryScreen;
