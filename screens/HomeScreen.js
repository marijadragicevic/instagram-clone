import { useContext, useLayoutEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  FlatList,
} from "react-native";

import Stories from "../components/home/stories/Stories";
import Header from "../components/home/header/Header";
import Posts from "../components/home/posts/Posts";
import { ThemeContext } from "../context/ThemeContext";
import { getThemeColors } from "../utilities/theme";

const HomeScreen = ({}) => {
  const { theme } = useContext(ThemeContext);
  const { backgroundColor } = getThemeColors(theme);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: backgroundColor,
      flex: 1,
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <FlatList ListHeaderComponent={Stories} ListFooterComponent={Posts} />
    </SafeAreaView>
  );
};

export default HomeScreen;
