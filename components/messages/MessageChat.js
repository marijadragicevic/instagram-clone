import { View, Text, FlatList, scrollToEnd, StyleSheet } from "react-native";
import React, {
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { MESSAGES } from "../../data/messages";
import MessageBox from "./MessageBox";
import MessageForm from "./MessageForm";
import { Image } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";

const MessageChat = ({ route, navigation }) => {
  const listRef = useRef();

  const chatId = route?.params?.chatId;
  const user = route?.params?.user;
  const data = user
    ? MESSAGES.find((item, index) => item.user === user)
    : MESSAGES.find((_, index) => index === chatId);

  const [updatedMessageList, setUpdatedMessageList] = useState(
    data?.messageContent || []
  );
  const [actionType, setActionType] = useState(null);

  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const handleActionType = (value) => {
    setActionType(value);
  };

  const handleAddNewMessage = (newMessage, type) => {
    setActionType("ADD_NEW_MESSAGE");
    if (type === "text") {
      setUpdatedMessageList([...updatedMessageList, newMessage]);
    } else {
      setUpdatedMessageList([...updatedMessageList, ...newMessage]);
    }
  };

  const handleDeleteMessage = (id) => {
    const messageList = updatedMessageList?.filter(
      (message, index) => id !== index
    );
    setUpdatedMessageList(messageList);
  };

  useLayoutEffect(() => {
    navigation?.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Image
            style={[styles.image]}
            source={require("../../assets/userImage.jpeg")}
          />
          <Text style={{ ...styles.headerText, color: textColor }}>
            {data?.user}
          </Text>
        </View>
      ),
    });
  }, [navigation, textColor]);

  return (
    <View
      style={{
        paddingHorizontal: 10,
        flex: 1,
        position: "relative",
        backgroundColor: backgroundColor,
      }}
    >
      <FlatList
        ref={listRef}
        data={updatedMessageList}
        renderItem={({ item, index }) => (
          <MessageBox
            {...item}
            messageList={updatedMessageList}
            index={index}
            setActionType={handleActionType}
            onDeleteMessage={handleDeleteMessage}
          />
        )}
        keyExtractor={(_, index) => index}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() => {
          if (actionType === "ADD_NEW_MESSAGE") {
            listRef?.current?.scrollToEnd();
          }
        }}
      />
      <MessageForm
        messageList={updatedMessageList}
        onAddNewMessage={handleAddNewMessage}
      />
    </View>
  );
};

export default MessageChat;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 20,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 500,
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 100,
  },
});
