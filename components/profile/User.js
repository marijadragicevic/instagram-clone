import { useState } from "react";
import { View, StyleSheet, Text, Image } from "react-native";

import IconButton from "../ui/IconButton";
import Button from "../ui/Button";

import { COLORS } from "../../constants/Colors";
import { locales } from "../../locales/Locales";

import { formatText } from "../../utilities/format";

const User = ({
  item,
  onRemove,
  textColor,
  backgroundColor,
  isLightTheme,
  selectedLanguage,
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const formatedUserText = formatText(item?.user);

  return (
    <View style={[styles.container]}>
      <IconButton
        icon="x"
        style={styles.icon}
        size={20}
        color={COLORS.global.lightGrey500Opacity}
        onPress={onRemove}
      />
      <Image
        source={require("../../assets/userImage.jpeg")}
        style={styles.image}
      />
      <Text style={[styles.text, { color: textColor }]}>
        {formatedUserText}
      </Text>
      <Text style={{ color: COLORS.global.lightGrey500 }}>
        {locales[selectedLanguage]?.aboutUser}
      </Text>
      <Button
        style={[
          styles.button,
          !isFollowing
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
    </View>
  );
};

export default User;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    alignItems: "center",
    gap: 10,
    width: 150,
    padding: 10,
    borderWidth: 0.5,
    borderRadius: 5,
    borderColor: COLORS.global.lightGrey500Opacity,
  },
  icon: {
    position: "absolute",
    top: 5,
    right: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 100,
  },
  button: {
    paddingVertical: 6,
    paddingHorizontal: 15,
    borderRadius: 8,
    alignSelf: "stretch",
  },
  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: 600,
  },
});
