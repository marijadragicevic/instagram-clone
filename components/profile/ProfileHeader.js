import { View, Text, StyleSheet, Image } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { loggedInUser } from "../../screens/MessagesScreen";
import { COLORS } from "../../constants/Colors";
import ButtonContainer from "./ButtonContainer";

const ProfileHeader = ({ user }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return (
    <>
      <View style={styles.outterContainer}>
        <View style={styles.container}>
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
              source={require("../../assets/userImage.jpeg")}
              style={[styles.image, { borderColor: backgroundColor }]}
            />
          </LinearGradient>
          <View style={styles.infoContainer}>
            <View style={styles.infoInnerContainer}>
              <Text style={[styles.boldText, { color: textColor }]}>3</Text>
              <Text style={[styles.text, { color: textColor }]}>Posts</Text>
            </View>
            <View style={styles.infoInnerContainer}>
              <Text style={[styles.boldText, { color: textColor }]}>166</Text>
              <Text style={[styles.text, { color: textColor }]}>Followers</Text>
            </View>
            <View style={styles.infoInnerContainer}>
              <Text style={[styles.boldText, { color: textColor }]}>235</Text>
              <Text style={[styles.text, { color: textColor }]}>Following</Text>
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
    // backgroundColor: "red",
  },
  boldText: {
    fontSize: 18,
    fontWeight: 700,
  },
  text: {
    // fontSize: 15,
  },
});
