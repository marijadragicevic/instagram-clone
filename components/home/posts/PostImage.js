import { Image, Pressable, Animated } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../../../constants/Colors";

const PostImage = ({ post, isLikeVisible, handleLikePost, scaleValue }) => {
  return (
    <Pressable style={{ width: "100%", height: 450 }} onPress={handleLikePost}>
      <Image
        // resizeMode="contain"
        style={{ height: "100%", width: "100%", position: "relative" }}
        source={require("../../../assets/postImage.jpg")}
      />
      {isLikeVisible && (
        <Animated.View
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            transform: [{ scale: scaleValue }],
          }}
        >
          <FontAwesome
            name="heart"
            size={30}
            color={COLORS.global.lightRed600}
          />
        </Animated.View>
      )}
    </Pressable>
  );
};

export default PostImage;
