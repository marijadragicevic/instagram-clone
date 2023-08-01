import { useState, useContext } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import User from "./User";
import Button from "../ui/Button";

import { USERS } from "../../data/users";
import { COLORS } from "../../constants/Colors";
import { locales } from "../../locales/Locales";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const UsersList = () => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const isLightTheme = theme === "light";

  const [usersList, setUsersList] = useState(USERS);

  const navigation = useNavigation();

  const removeUser = (id) => {
    const updateUsersList = usersList?.filter((_, index) => id !== index);
    setUsersList(updateUsersList);
  };

  return (
    <View style={styles.container}>
      <View style={styles.btnContainer}>
        <Text style={[styles.text, { color: textColor }]}>
          {locales[selectedLanguage]?.discoverPeople}
        </Text>
        <Button
          styleText={styles.btnText}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          {locales[selectedLanguage]?.seeAll}
        </Button>
      </View>
      <FlatList
        contentContainerStyle={styles.list}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        data={usersList}
        renderItem={({ item, index }) => (
          <User
            item={item}
            onRemove={removeUser.bind(this, index)}
            textColor={textColor}
            backgroundColor={backgroundColor}
            isLightTheme={isLightTheme}
            selectedLanguage={selectedLanguage}
          />
        )}
        nestedScrollEnabled
        keyExtractor={(_, index) => index}
      />
    </View>
  );
};

export default UsersList;

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    margin: 10,
  },
  list: {
    gap: 5,
  },
  btnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
    paddingTop: 5,
  },
  btnText: {
    color: COLORS.global.lightBlue400,
    fontWeight: 500,
  },
  text: {
    fontWeight: 500,
  },
});
