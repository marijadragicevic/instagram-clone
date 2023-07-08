import React, { useContext, useLayoutEffect } from "react";
import { View, Text } from "react-native";

import MediaLibrary from "../components/showMediaFromPhone/MediaLibrary";
import IconButton from "../components/ui/IconButton";

import { getThemeColors } from "../utilities/theme";
import { ThemeContext } from "../context/ThemeContext";

const AddStoryScreen = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <IconButton
          icon="x"
          size={30}
          onPress={() => navigation.navigate("HomeScreen")}
          style={{ marginRight: 10 }}
        />
      ),
      title: "Add Story",
    });
  }, [navigation]);

  return (
    <View style={{ flex: 1, backgroundColor: backgroundColor }}>
      <MediaLibrary textColor={textColor} />
    </View>
  );
};

export default AddStoryScreen;
