import { View, StyleSheet } from "react-native";

import IconButton from "../../ui/IconButton";
import { useNavigation } from "@react-navigation/native";

const PostIconsFooter = ({ post, index }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.groupIcons}>
        <IconButton icon="heart-o" size={25} />
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
        <IconButton icon="navigation" size={25} />
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
