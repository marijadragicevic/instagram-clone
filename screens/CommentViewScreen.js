import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { getThemeColors } from "../utilities/theme";
import CommentSection from "../components/comments/CommentSection";
import { FlatList } from "react-native";
import AddComment from "../components/comments/AddComment";

const CommentViewScreen = ({ route }) => {
  const { theme } = useContext(ThemeContext);
  const { backgroundColor } = getThemeColors(theme);

  const post = route.params.data;
  const commentList = post?.comments;
  const isInputInFocus = route?.params?.focus || false;

  // <View style={[styles.container, { backgroundColor: backgroundColor }]}>
  //   <CommentSection post={post} />
  //   <Divider width={1} orientation="vertical" />
  //   <FlatList
  //     data={commentList}
  //     renderItem={({ itemData }) => <CommentSection post={itemData} />}
  //   />
  // </View>
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={[styles.container, { backgroundColor: backgroundColor }]}
        ListHeaderComponent={() => <CommentSection post={post} />}
        ListFooterComponent={() => (
          <FlatList
            data={commentList}
            renderItem={({ item }) => (
              <CommentSection post={item} isMain={false} />
            )}
          />
        )}
      />
      <AddComment isInputInFocus={isInputInFocus} />
    </View>
  );
};

export default CommentViewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
  },
});
