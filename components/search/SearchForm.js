import { useContext } from "react";
import { View, TextInput, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";

import { COLORS } from "../../constants/Colors";
import { USERS } from "../../data/users";
import { locales } from "../../locales/Locales";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const SearchForm = ({ setSearchResult, type, style }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

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
    <View
      style={[styles.container, style, { backgroundColor: backgroundColor }]}
    >
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
          placeholder={locales[selectedLanguage]?.search}
          placeholderTextColor={textColor}
        />
        <View style={[styles.iconContainer]}>
          <Ionicons
            name={type === "share" ? "md-person-add-outline" : "search"}
            style={[styles.icon]}
            size={20}
            color={textColor}
          />
        </View>
      </Pressable>
    </View>
  );
};

export default SearchForm;

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
