import { useContext } from "react";
import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";

import IconButton from "../ui/IconButton";

import { COLORS } from "../../constants/Colors";
import { locales } from "../../locales/Locales";

import { LinearGradient } from "expo-linear-gradient";
import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

const ResultItem = ({
  user,
  image,
  type,
  onDeleteHistoryItem,
  selectedLanguage,
}) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("ProfileSearchScreen", { user: user })}
      style={({ pressed }) => [
        styles.container,
        pressed && {
          backgroundColor: isDarkLogo
            ? COLORS.global.lightGrey200Opacity
            : COLORS.global.lightGrey300Opacity,
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
      <View style={styles.infoContainer}>
        <Text style={[styles.mainText, { color: textColor }]}>{user}</Text>
        <Text style={[styles.text]}>{locales[selectedLanguage]?.fullName}</Text>
      </View>
      {type === "history" && (
        <IconButton
          icon="x"
          size={15}
          color={COLORS.global.lightGrey500}
          onPress={onDeleteHistoryItem}
          // onPress={() => console.log("iconButton press")}
        />
      )}
    </Pressable>
  );
};

export default ResultItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    padding: 10,
  },
  infoContainer: {
    flex: 1,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 100,
    borderWidth: 2,
  },
  mainText: {
    fontWeight: 500,
  },
  text: {
    fontSize: 12,
    color: COLORS.global.lightGrey500,
  },
});
