import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

import ButtonContainer from "./ButtonContainer";
import StoryFrame from "../ui/StoryFrame";

import { locales } from "../../locales/Locales";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const ProfileHeader = ({ user }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  return (
    <>
      <View style={styles.outterContainer}>
        <View style={styles.container}>
          <StoryFrame>
            <Image
              source={require("../../assets/userImage.jpeg")}
              style={[styles.image, { borderColor: backgroundColor }]}
            />
          </StoryFrame>
          <View style={styles.infoContainer}>
            <View style={styles.infoInnerContainer}>
              <Text style={[styles.boldText, { color: textColor }]}>3</Text>
              <Text style={[styles.text, { color: textColor }]}>
                {locales[selectedLanguage]?.posts}
              </Text>
            </View>
            <View style={styles.infoInnerContainer}>
              <Text style={[styles.boldText, { color: textColor }]}>166</Text>
              <Text style={[styles.text, { color: textColor }]}>
                {locales[selectedLanguage]?.followers}
              </Text>
            </View>
            <View style={styles.infoInnerContainer}>
              <Text style={[styles.boldText, { color: textColor }]}>235</Text>
              <Text style={[styles.text, { color: textColor }]}>
                {locales[selectedLanguage]?.following}
              </Text>
            </View>
          </View>
        </View>
        <Text style={{ color: textColor, fontWeight: 500 }}>{user}</Text>
      </View>
      <ButtonContainer
        textColor={textColor}
        isLightTheme={isDarkLogo}
        user={user}
      />
    </>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  outterContainer: {
    padding: 15,
    gap: 3,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 20,
  },
  image: {
    height: 75,
    width: 75,
    borderRadius: 100,
    borderWidth: 2,
  },
  infoContainer: {
    flex: 1,
    flexDirection: "row",
  },
  infoInnerContainer: {
    flex: 1,
    alignItems: "center",
  },
  boldText: {
    fontSize: 18,
    fontWeight: 700,
  },
  text: {
    // fontSize: 15,
  },
});
