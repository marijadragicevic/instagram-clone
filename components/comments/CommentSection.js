import { useContext, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import { COLORS } from "../../constants/Colors";
import IconButton from "../ui/IconButton";
import Button from "../ui/Button";

const CommentSection = ({ post, isMain = true }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

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
      <View style={{ flex: 1 }}>
        <Text style={[styles.text, { color: textColor }]}>
          {post?.user || "No data"}
        </Text>
        <Text style={[{ color: textColor, fontSize: 15 }]}>
          {isMain ? post?.caption : post?.comment}
        </Text>
        {!isMain && (
          <Button styleText={{ color: COLORS.global.grey500, fontSize: 13 }}>
            Reply
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
