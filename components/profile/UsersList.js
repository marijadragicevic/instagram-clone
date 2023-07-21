import { useState, useContext } from "react";
import { FlatList, View, StyleSheet, Text } from "react-native";

import { USERS } from "../../data/users";
import User from "./User";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";
import Button from "../ui/Button";
import { COLORS } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";

const UsersList = () => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

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
        <Text style={[styles.text, { color: textColor }]}>Discover people</Text>
        <Button
          styleText={styles.btnText}
          onPress={() => navigation.navigate("NotificationScreen")}
        >
          See all
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
