import { useContext } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  Button,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ThemeContext } from "../../../context/ThemeContext";
import { getThemeColors } from "../../../utilities/theme";

import IconButton from "../../ui/IconButton";
import { COLORS } from "../../../constants/Colors";

const Header = () => {
  const { theme, handleSwitchTheme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const navigation = useNavigation();

  const numberOfMessages = 12;

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <Pressable style={({ pressed }) => [pressed && styles.pressed]}>
        {isDarkLogo ? (
          <Image
            style={styles.logo}
            source={require("../../../assets/dark-logo.png")}
          />
        ) : (
          <Image
            style={styles.logo}
            source={require("../../../assets/light-logo.png")}
          />
        )}
      </Pressable>
      <View style={styles.iconContainer}>
        <IconButton
          icon={isDarkLogo ? "sun" : "moon"}
          size={25}
          onPress={handleSwitchTheme}
        />
        <IconButton
          icon="heart-o"
          size={25}
          onPress={() => navigation.navigate("NotificationScreen")}
        />
        <IconButton
          icon="message-circle"
          size={25}
          onPress={() => navigation.navigate("MessagesScreen")}
        >
          <View style={styles.unreadBadge}>
            <Text
              style={[styles.unreadBadgeText, { color: COLORS.global.white }]}
            >
              {numberOfMessages.toLocaleString()?.length > 3
                ? "*"
                : numberOfMessages}
            </Text>
          </View>
        </IconButton>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 25,
    paddingLeft: 10,
    paddingRight: 20,
    // paddingBottom: 10,
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 20,
  },
  logo: {
    width: 130,
    height: 60,
    resizeMode: "contain",
  },
  pressed: {
    opacity: 0.5,
  },
  unreadBadge: {
    backgroundColor: COLORS.global.lightRed600,
    position: "absolute",
    left: 15,
    bottom: 15,
    width: 25,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
  },
  unreadBadgeText: {
    fontWeight: 600,
  },
});
