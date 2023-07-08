import { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

import { USERS } from "../data/users";

import { ThemeContext } from "../context/ThemeContext";
import { getThemeColors } from "../utilities/theme";
import Stories from "../components/home/stories/Stories";
import MessageList from "../components/messages/MessageList";
import Description from "../components/ui/Description";

export const loggedInUser = USERS[0]?.user;

const MessagesScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  useLayoutEffect(() => {
    navigation.setOptions({ title: loggedInUser });
  }, []);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <FlatList
        ListHeaderComponent={Stories}
        ListFooterComponent={MessageList}
      />
    </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
});
