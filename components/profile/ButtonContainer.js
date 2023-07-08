import { View, StyleSheet } from "react-native";

import Button from "../ui/Button";
import IconButton from "../ui/IconButton";
import { useEffect, useState } from "react";
import { COLORS } from "../../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { loggedInUser } from "../../screens/MessagesScreen";

const ButtonContainer = ({ textColor, isLightTheme, user }) => {
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
              !isLoggedInUser && !isFollowing && { color: COLORS.global.white },
            ]}
            onPress={() => {
              setIsFollowing(!isFollowing);
            }}
          >
            {isFollowing ? "Following" : "Follow"}
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
            Message
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
            Edit profile
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
            Share profile
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
