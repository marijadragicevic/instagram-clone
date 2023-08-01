import React, { useContext, useState } from "react";
import { View, TextInput, StyleSheet, Image } from "react-native";

import Button from "../ui/Button";

import { LinearGradient } from "expo-linear-gradient";

import { COLORS } from "../../constants/Colors";
import { locales } from "../../locales/Locales";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const AddComment = ({ isInputInFocus }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const [comment, setComment] = useState({
    value: "",
    error: "",
  });

  const handleChange = (eneredText) => {
    setComment({ value: eneredText, error: "" });
  };

  const handleSubmit = () => {};

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: !isDarkLogo
            ? COLORS.global.grey800
            : COLORS.global.white,
        },
      ]}
    >
      <LinearGradient
        colors={[
          COLORS.global.lightYellow200,
          COLORS.global.lightYellow600,
          COLORS.global.lightYellow600,
          COLORS.global.lightOrange600,
          COLORS.global.lightRed400,
          COLORS.global.lightRed800,
          COLORS.global.pink300,
          COLORS.global.pink500,
          COLORS.global.pink500,
          COLORS.global.purple500,
        ]}
        start={{ x: 0, y: 1 }}
        end={{ x: 1, y: 0.5 }}
        style={{
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          borderRadius: 100,
        }}
      >
        <Image
          style={[styles.image, { borderColor: backgroundColor }]}
          source={require("../../assets/userImage.jpeg")}
        />
      </LinearGradient>
      <TextInput
        value={comment.value}
        placeholder={locales[selectedLanguage]?.addNewComent + " USER's POST"}
        placeholderTextColor={COLORS.global.grey400}
        onChangeText={handleChange}
        style={[styles.input, { color: textColor }]}
        multiline={true}
        autoFocus={isInputInFocus}
      />
      <Button
        styleText={styles.btnText}
        isDisabled={!comment.value || comment.error ? true : false}
        onPress={handleSubmit}
      >
        {locales[selectedLanguage]?.post}
      </Button>
    </View>
  );
};

export default AddComment;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: 10,
    paddingLeft: 15,
    borderTopColor: COLORS.global.lightGrey200Opacity,
    borderTopWidth: 0.5,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 100,
    borderWidth: 2,
  },
  input: {
    flex: 1,
    marginLeft: 5,
    fontSize: 15,
  },
  btnText: {
    fontWeight: 500,
    color: COLORS.global.lightBlue400,
    fontSize: 17,
  },
});
