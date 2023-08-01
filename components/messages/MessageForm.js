import { View, Text, StyleSheet, TextInput } from "react-native";
import IconButton from "../ui/IconButton";
import OutlineButton from "../ui/OutlineButton";
import { useState } from "react";
import { MESSAGES } from "../../data/messages";
import { loggedInUser } from "../../screens/MessagesScreen";
import {
  MediaTypeOptions,
  PermissionStatus,
  launchCameraAsync,
  launchImageLibraryAsync,
  useCameraPermissions,
} from "expo-image-picker";
import { Alert } from "react-native";
import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";
import { COLORS } from "../../constants/Colors";
import { locales } from "../../locales/Locales";
import { useSelector } from "react-redux";
import { getLanguage } from "../../redux/slices/Translation";

const MessageForm = ({ messageList, onAddNewMessage }) => {
  const [message, setMessage] = useState("");
  const [pickedMediaList, setPickedMediaList] = useState([]);

  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const [cameraPermissionInfo, requestCameraPermission] =
    useCameraPermissions();

  const handleSendMessage = () => {
    // messageList?.push({ content: message, user: loggedInUser });
    const trimmedMessage = message?.trim();
    onAddNewMessage({ content: trimmedMessage, user: loggedInUser }, "text");
    setMessage("");
  };

  const handleSendMedia = (mediaList) => {
    // messageList?.push({ content: message, user: loggedInUser });
    const newMessages = mediaList?.map((mediaItem) => ({
      ...mediaItem,
      user: loggedInUser,
    }));
    onAddNewMessage(newMessages, "media");
    setMessage("");
  };

  const verifyPermissions = async () => {
    if (cameraPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const permsissionResponse = await requestCameraPermission();

      return permsissionResponse.granted;
    }

    if (cameraPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permission to use this app."
      );

      return false;
    }

    return true;
  };

  const pickMediaHandler = async () => {
    // when multiple is true allowsEditing is always false
    const response = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.All,
      //   allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
      allowsMultipleSelection: true,
    });

    if (!response.canceled) {
      const mediaUriList =
        response?.assets?.length > 0 &&
        response?.assets?.map((asset) => ({
          content: asset?.uri,
          type: asset.type,
        }));
      setPickedMediaList(mediaUriList);
      handleSendMedia(mediaUriList);
    }
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const response = await launchCameraAsync({
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.7,
    });

    if (!response?.canceled) {
      const imageList = [{ content: response?.assets[0]?.uri, type: "image" }];
      setPickedMediaList(imageList);
      handleSendMedia(imageList);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View
        style={[
          styles.innerContainer,
          {
            backgroundColor: !isDarkLogo
              ? COLORS.global.darkGrey700Opacity
              : COLORS.global.lightGrey100,
          },
        ]}
      >
        <IconButton
          icon="camera"
          color={COLORS.global.lightGrey50}
          style={styles.iconContainer}
          onPress={takeImageHandler}
        />
        <TextInput
          style={[styles.input, { color: textColor }]}
          placeholder={locales[selectedLanguage]?.enterMessage}
          placeholderTextColor={
            !isDarkLogo ? COLORS.global.white : COLORS.global.lightGrey550
          }
          value={message}
          onChangeText={(enteredText) => setMessage(enteredText)}
          multiline={true}
          // numberOfLines={5}
          onSubmitEditing={handleSendMessage}
        />
        {!!message.trim() ? (
          <OutlineButton
            style={styles.outlineBtn}
            styleText={styles.outlineBtnText}
            onPress={handleSendMessage}
          >
            {locales[selectedLanguage]?.send}
          </OutlineButton>
        ) : (
          <IconButton
            icon="image"
            style={{ marginRight: 20 }}
            onPress={pickMediaHandler}
          />
        )}
      </View>
    </View>
  );
};

export default MessageForm;

const styles = StyleSheet.create({
  outerContainer: {
    position: "absolute",
    bottom: 5,
    left: 5,
    right: 5,
  },
  innerContainer: {
    padding: 5,
    borderRadius: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
  iconContainer: {
    backgroundColor: COLORS.global.ultramarine500,
    padding: 8,
    borderRadius: 100,
  },
  input: {
    flex: 1,
    paddingVertical: 3,
    paddingHorizontal: 5,
    fontSize: 15,
  },
  outlineBtn: {
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderWidth: 0,
    marginRight: 20,
  },
  outlineBtnText: {
    color: COLORS.global.ultramarine500,
    fontWeight: 500,
    fontSize: 20,
  },
});
