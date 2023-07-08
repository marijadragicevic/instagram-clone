import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useContext, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import { COLORS } from "../../constants/Colors";
import { USERS } from "../../data/users";

const SearcForm = ({ setSearchResult }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const handleSearch = (enteredText) => {
    if (!enteredText) {
      setSearchResult([]);
      return;
    }
    const searchResult = USERS?.filter((user) =>
      user.user.includes(enteredText)
    );
    setSearchResult(searchResult, enteredText);
  };

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Pressable
        style={[
          styles.innerContainer,
          {
            backgroundColor: isDarkLogo
              ? COLORS.global.lightGrey150
              : COLORS.global.darkGrey800Opacity,
          },
        ]}
      >
        <TextInput
          // value={searchedValue}
          onChangeText={handleSearch}
          style={[styles.input, { color: textColor }]}
          placeholder="Search"
          placeholderTextColor={textColor}
        />
        <View style={[styles.iconContainer]}>
          <Ionicons
            name="search"
            style={[styles.icon]}
            size={20}
            color={textColor}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default SearcForm;

const styles = StyleSheet.create({
  container: { padding: 10, paddingTop: 40 },
  innerContainer: {
    position: "relative",
    overflow: "hidden",
    borderRadius: 10,
  },
  input: { padding: 10, paddingLeft: 40, fontSize: 15 },
  iconContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 0,
  },
  icon: {},
});