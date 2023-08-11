import React, { useContext } from "react";
import { View, Image, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";

import Description from "../ui/Description";
import StoryFrame from "../ui/StoryFrame";

import { locales } from "../../locales/Locales";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const MessageItem = (props) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const navigation = useNavigation();

  return (
    <>
      {props?.index === 0 && (
        <Description color={textColor}>
          {locales[selectedLanguage]?.messages}
        </Description>
      )}
      <Pressable
        style={[styles.outerContainer]}
        onPress={() =>
          navigation.navigate("MessageChat", { chatId: props?.index })
        }
      >
        <StoryFrame>
          <Image
            style={[styles.image, { borderColor: backgroundColor }]}
            source={require("../../assets/userImage.jpeg")}
          />
        </StoryFrame>
        <View>
          <Text style={[styles.text, { color: textColor }]}>
            {props?.item?.user}
          </Text>
          <Text style={[{ color: textColor }]}>
            {props?.item?.deliveredDate}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: { fontSize: 15, fontWeight: 500 },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
  },
});
