import { View, StyleSheet } from "react-native";

import IconButton from "../../ui/IconButton";

import { useNavigation } from "@react-navigation/native";

import { COLORS } from "../../../constants/Colors";
import { setVisibility } from "../../../redux/slices/Modals";
import { useDispatch } from "react-redux";

const PostIconsFooter = ({ post, index, isLiked, handleLikePost }) => {
  const navigation = useNavigation();

  const dispatch = useDispatch();

  return (
    <View style={styles.container}>
      <View style={styles.groupIcons}>
        <IconButton
          icon={isLiked ? "heart" : "heart-o"}
          size={25}
          color={isLiked ? COLORS.global.lightRed600 : null}
          onPress={handleLikePost}
        />
        <IconButton
          icon="message-circle"
          size={25}
          onPress={() =>
            navigation.navigate("CommentViewScreen", {
              commentId: index,
              data: post,
              focus: true,
            })
          }
        />
        <IconButton
          icon="navigation"
          size={25}
          onPress={() => dispatch(setVisibility(true))}
        />
      </View>
      <IconButton icon="bookmark" size={25} />
    </View>
  );
};

export default PostIconsFooter;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  groupIcons: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
});
