import { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import UsersList from "./UsersList";

import { COLORS } from "../../constants/Colors";
import { loggedInUser } from "../../screens/MessagesScreen";
import { locales } from "../../locales/Locales";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";
import { formatText } from "../../utilities/format";

const ButtonContainer = ({ textColor, isLightTheme, user }) => {
  const selectedLanguage = useSelector(getLanguage);

  const [isActive, setIsActive] = useState(false);
  const [isLoggedInUser, setIsLoggedInUser] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (user === loggedInUser) {
      setIsLoggedInUser(true);
    } else {
      setIsLoggedInUser(false);
    }
  }, [user]);

  return (
    <>
      <View style={styles.container}>
        {!isLoggedInUser ? (
          <>
            <Button
              style={[
                styles.button,
                !isLoggedInUser && !isFollowing
                  ? {
                      backgroundColor: COLORS.global.lightBlue400,
                    }
                  : {
                      backgroundColor: isLightTheme
                        ? COLORS.global.lightGrey100
                        : COLORS.global.darkGrey700Opacity,
                    },
              ]}
              styleText={[
                styles.text,
                !isLoggedInUser &&
                  !isFollowing && { color: COLORS.global.white },
              ]}
              onPress={() => {
                setIsFollowing(!isFollowing);
              }}
            >
              {isFollowing
                ? locales[selectedLanguage]?.following
                : locales[selectedLanguage]?.follow}
            </Button>
            <Button
              style={[
                styles.button,
                {
                  backgroundColor: isLightTheme
                    ? COLORS.global.lightGrey100
                    : COLORS.global.darkGrey700Opacity,
                },
              ]}
              styleText={[styles.text]}
              onPress={() => navigation.navigate("MessageChat", { user: user })}
            >
              {locales[selectedLanguage]?.message}
            </Button>
          </>
        ) : (
          <>
            <Button
              style={[
                styles.button,
                {
                  backgroundColor: isLightTheme
                    ? COLORS.global.lightGrey100
                    : COLORS.global.darkGrey700Opacity,
                },
              ]}
              styleText={styles.text}
            >
              {formatText(locales[selectedLanguage]?.editProfile, false, 13)}
            </Button>
            <Button
              style={[
                styles.button,
                {
                  backgroundColor: isLightTheme
                    ? COLORS.global.lightGrey100
                    : COLORS.global.darkGrey700Opacity,
                },
              ]}
              styleText={styles.text}
            >
              {locales[selectedLanguage]?.shareProfile}
            </Button>
          </>
        )}
        <IconButton
          style={[
            styles.iconButton,
            {
              backgroundColor: isLightTheme
                ? COLORS.global.lightGrey100
                : COLORS.global.darkGrey700Opacity,
            },
          ]}
          icon={isActive ? "person-add-alt-1" : "person-add-alt"}
          size={20}
          onPress={() => setIsActive(!isActive)}
        />
      </View>
      {isActive && <UsersList />}
    </>
  );
};

export default ButtonContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 10,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
  },
  iconButton: {
    paddingVertical: 6,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
  },
});
