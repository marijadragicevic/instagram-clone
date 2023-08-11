import { useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";

import { COLORS } from "../../constants/Colors";
import { locales } from "../../locales/Locales";

import IconButton from "../ui/IconButton";
import Button from "../ui/Button";
import StoryFrame from "../ui/StoryFrame";

import { useSelector } from "react-redux";
import { getLanguage } from "../../redux/slices/Translation";

const CommentSection = ({ post, isMain = true }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const [isLiked, setIsLiked] = useState(false);

  return (
    <View
      style={[
        styles.container,
        isMain && {
          borderBottomColor: COLORS.global.lightGrey200Opacity,
          borderBottomWidth: 0.5,
        },
      ]}
    >
      <StoryFrame>
        <Image
          style={[styles.image, { borderColor: backgroundColor }]}
          source={require("../../assets/userImage.jpeg")}
        />
      </StoryFrame>
      <View style={{ flex: 1 }}>
        <Text style={[styles.text, { color: textColor }]}>
          {post?.user || "No data"}
        </Text>
        <Text style={[{ color: textColor, fontSize: 15 }]}>
          {isMain ? post?.caption : post?.comment}
        </Text>
        {!isMain && (
          <Button styleText={{ color: COLORS.global.grey500, fontSize: 13 }}>
            {locales[selectedLanguage]?.reply}
          </Button>
        )}
      </View>
      {!isMain && (
        <View>
          <IconButton
            icon={isLiked ? "heart" : "heart-o"}
            color={isLiked ? COLORS.global.red500 : COLORS.global.grey500}
            size={15}
            onPress={() => setIsLiked(!isLiked)}
          />
          <Text style={[{ color: COLORS.global.grey500 }]}>12</Text>
        </View>
      )}
    </View>
  );
};

export default CommentSection;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    margin: 5,
  },
  image: {
    height: 45,
    width: 45,
    borderRadius: 100,
    borderWidth: 2,
  },
  textWrapper: {
    height: 40,
  },
  text: { fontWeight: 700 },
});
