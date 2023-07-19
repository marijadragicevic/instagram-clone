import { FlatList } from "react-native";

import Post from "./Post";
import { POSTS } from "../../../data/posts";
import { getThemeColors } from "../../../utilities/theme";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext, useRef } from "react";

const Posts = ({ marginVertical = 10, currentIndex }) => {
  const { theme } = useContext(ThemeContext);
  const { backgroundColor } = getThemeColors(theme);

  const listRef = useRef();

  return (
    <FlatList
      ref={listRef}
      data={POSTS}
      renderItem={({ item, index }) => <Post post={item} index={index} />}
      keyExtractor={(_, index) => index}
      contentContainerStyle={{
        gap: 10,
        marginVertical: marginVertical,
        backgroundColor: backgroundColor,
      }}
      onLayout={() => {
        if (currentIndex) {
          listRef?.current?.scrollToIndex({
            index: currentIndex,
            animated: true,
          });
        }
      }}
    />
  );
};

export default Posts;
