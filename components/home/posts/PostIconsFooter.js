import { View, Text, StyleSheet } from "react-native";

import IconButton from "../../ui/IconButton";

const PostIconsFooter = () => {
  return (
    <View style={styles.container}>
      <View style={styles.groupIcons}>
        <IconButton icon="heart-o" size={25} />
        <IconButton icon="message-circle" size={25} />
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
