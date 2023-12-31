import { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "../../../context/ThemeContext";
import { getThemeColors } from "../../../utilities/theme";

import PostIconsFooter from "./PostIconsFooter";

import { COLORS } from "../../../constants/Colors";
import { locales } from "../../../locales/Locales";

import { useSelector } from "react-redux";
import { getLanguage } from "../../../redux/slices/Translation";

const Likes = ({ post, selectedLanguage }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor } = getThemeColors(theme);

  return (
    <View style={styles.likesContainer}>
      <Text style={[styles.text, { color: textColor }]}>
        {post.likes.toLocaleString("en")} {locales[selectedLanguage]?.likes}
      </Text>
    </View>
  );
};

const Caption = ({ user, content }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor } = getThemeColors(theme);

  return (
    <View style={styles.captionContainer}>
      <Text style={[styles.text, { color: textColor }]}>
        <Text>{user}</Text>
        <Text style={styles.captionText}>{content}</Text>
      </Text>
    </View>
  );
};

const CommentsSection = ({ post, index, selectedLanguage }) => {
  const navigation = useNavigation();

  const content =
    post?.comments?.length > 1
      ? `${locales[selectedLanguage]?.viewAllComments} (${post?.comments?.length})`
      : `${locales[selectedLanguage]?.viewComment} (${post?.comments?.length})`;

  return (
    <View style={{ alignItems: "flex-start" }}>
      <Pressable
        style={({ pressed }) => [styles.comment, pressed && styles.pressed]}
        onPress={() =>
          navigation.navigate("CommentViewScreen", {
            commentId: index,
            data: post,
          })
        }
      >
        <Text style={{ color: COLORS.global.lightGrey500 }}>{content}</Text>
      </Pressable>
      <View>
        {post?.comments?.map((comment, index) => {
          if (index < 2) {
            return (
              <Caption
                user={comment.user}
                content={comment.comment}
                key={index}
              />
            );
          }
        })}
      </View>
    </View>
  );
};

const PostFooter = ({ post, index, isLiked, handleLikePost }) => {
  const isCommentVisible = post?.comments?.length > 0;

  const selectedLanguage = useSelector(getLanguage);

  return (
    <View style={styles.container}>
      <PostIconsFooter
        post={post}
        index={index}
        isLiked={isLiked}
        handleLikePost={handleLikePost}
      />
      <Likes post={post} selectedLanguage={selectedLanguage} />
      <Caption user={post.user} content={post.caption} />
      {isCommentVisible && (
        <CommentsSection
          post={post}
          index={index}
          selectedLanguage={selectedLanguage}
        />
      )}
    </View>
  );
};

export default PostFooter;

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  likesContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  text: {
    fontWeight: 600,
  },
  captionContainer: {
    marginTop: 5,
  },
  captionText: {
    fontWeight: 400,
  },
  comment: {
    marginTop: 5,
  },
  pressed: {
    opacity: 0.5,
    transform: [{ scale: 0.95 }],
  },
});
