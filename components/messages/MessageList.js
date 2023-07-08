import { View, StyleSheet, FlatList } from "react-native";
import React from "react";
import { MESSAGES } from "../../data/messages";
import MessageItem from "./MessageItem";

const MessageList = () => {
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.list}
        data={MESSAGES}
        renderItem={({ item, index }) => (
          <MessageItem item={item} index={index} />
        )}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default MessageList;

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
  },
  list: {
    gap: 3,
  },
});
