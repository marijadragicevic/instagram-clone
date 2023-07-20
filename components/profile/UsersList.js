import { useState, useContext } from "react";
import { FlatList, View, StyleSheet } from "react-native";

import { USERS } from "../../data/users";
import User from "./User";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

const UsersList = () => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const isLightTheme = theme === "light";

  const [usersList, setUsersList] = useState(USERS);

  const removeUser = (id) => {
    const updateUsersList = usersList?.filter((_, index) => id !== index);
    setUsersList(updateUsersList);
  };

  return (
    <View style={styles.container}>
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
});
