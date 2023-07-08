import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { useContext, useEffect, useState } from "react";
import { loggedInUser } from "../../screens/MessagesScreen";
import { Image } from "react-native";
import IconButton from "../ui/IconButton";
import VideoPlayer from "../ui/VideoPlayer";
import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/Colors";

const MessageBox = ({
  content,
  user,
  type,
  likedMessage,
  messageList,
  index,
  setActionType,
  onDeleteMessage,
}) => {
  const [isMessageLiked, setIsMessageLiked] = useState(likedMessage);
  const [lastPress, setLastPress] = useState(0);

  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const samePreviousUser = index > 0 && messageList[index - 1]?.user === user;
  const sameNextUser = messageList[index + 1]?.user === user;

  const isPreviousMessageLiked =
    index > 0 && messageList[index - 1]?.likedMessage;
  const isNextMessageLiked = messageList[index + 1]?.likedMessage;

  const lastMessage = index === messageList?.length - 1;

  const isImageVisible =
    loggedInUser !== user &&
    (isMessageLiked || (!isMessageLiked && !sameNextUser));

  const currentUserStyle =
    loggedInUser === user
      ? [
          styles.container(isDarkLogo),
          styles.loggedUser,
          !isMessageLiked && samePreviousUser && styles.previousUser(true),
          !isMessageLiked && sameNextUser && styles.nextUser(true),
        ]
      : [
          styles.container(isDarkLogo),
          !isMessageLiked && samePreviousUser && styles.previousUser(),
          !isMessageLiked && sameNextUser && styles.nextUser(),
        ];

  const handleLikeMessage = () => {
    const currentTime = new Date().getTime();
    const delay = 300;

    if (currentTime - lastPress < delay) {
      // double press happened
      setActionType("ADD_LIKE");
      messageList[index] = { ...messageList[index], likedMessage: true };
      setIsMessageLiked(true);
    }

    setLastPress(currentTime);
  };

  const handleDeleteMessage = () => {
    Alert.alert(
      "Delete message",
      "Are you sure you want to delete this message?",
      [
        {
          text: "Yes",
          onPress: () => {
            onDeleteMessage(index);
          },
        },
        {
          text: "No",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <View style={styles.outerContainer(loggedInUser === user)}>
      {isImageVisible && (
        <Image
          style={[styles.image]}
          source={require("../../assets/userImage.jpeg")}
        />
      )}
      <View
        style={[
          {
            maxWidth: "70%",
            alignItems: "flex-start",
          },
          !isImageVisible &&
            loggedInUser !== user &&
            sameNextUser && { marginLeft: 30 },
          lastMessage && { marginBottom: 70 },
          isMessageLiked && {
            marginVertical: 5,
          },
        ]}
      >
        <Pressable
          style={[
            currentUserStyle,
            type && {
              padding: 0,
              overflow: "hidden",
              backgroundColor: "transparent",
            },
          ]}
          onPress={handleLikeMessage}
          onLongPress={handleDeleteMessage}
        >
          {type === "video" ? (
            <VideoPlayer
              isPlaying={false}
              sourceUri={content}
              isLooping={false}
              showControls={true}
              style={{ maxWidth: 250, maxHeight: 250 }}
            />
          ) : type === "image" ? (
            <Image
              source={{ uri: content }}
              style={{ height: 260, width: 195 }}
              resizeMode="contain"
            />
          ) : (
            <Text
              style={[
                styles.text,
                {
                  color:
                    isDarkLogo && loggedInUser !== user
                      ? COLORS.global.black
                      : COLORS.global.white,
                },
              ]}
            >
              {content}
            </Text>
          )}
        </Pressable>
        {isMessageLiked && (
          <IconButton
            icon="heart"
            size={15}
            color={COLORS.global.red500}
            style={[
              styles.iconBtn(isDarkLogo),
              { borderColor: backgroundColor },
            ]}
            onPress={() => {
              setActionType("REMOVE_LIKE");
              messageList[index] = {
                ...messageList[index],
                likedMessage: false,
              };
              setIsMessageLiked(false);
            }}
          />
        )}
      </View>
    </View>
  );
};

export default MessageBox;

const styles = StyleSheet.create({
  outerContainer: (sameUser) => {
    return sameUser
      ? {
          flex: 1,
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
        }
      : {
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        };
  },
  container: (isDark = false) => ({
    backgroundColor: !isDark
      ? COLORS.global.lightGrey550
      : COLORS.global.lightGrey100,
    padding: 10,
    alignSelf: "flex-start",
    margin: 5,
    borderRadius: 20,
  }),
  text: {
    fontSize: 15,
  },
  loggedUser: {
    alignSelf: "flex-end",
    backgroundColor: COLORS.global.lightBlue400,
  },
  previousUser: (isLoggedUser = false) => {
    return isLoggedUser
      ? { marginTop: 1, borderTopRightRadius: 5 }
      : { marginTop: 1, borderTopLeftRadius: 5 };
  },
  nextUser: (isLoggedUser = false) => {
    return isLoggedUser
      ? { marginBottom: 1, borderBottomRightRadius: 5 }
      : { marginBottom: 1, borderBottomLeftRadius: 5 };
  },
  image: {
    height: 25,
    width: 25,
    borderRadius: 100,
    borderWidth: 2,
    marginRight: 5,
  },
  iconBtn: (isDark = false) => ({
    backgroundColor: !isDark
      ? COLORS.global.darkGrey700Opacity
      : COLORS.global.lightGrey100,
    paddingLeft: 6.5,
    paddingTop: 4,
    paddingBottom: 4,
    paddingRight: 6,
    borderRadius: 15,
    borderWidth: 2,
    marginLeft: 10,
    marginTop: -10,
  }),
});
