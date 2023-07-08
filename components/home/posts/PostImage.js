import { useRef, useState } from "react";
import { View, Text, Image, Pressable } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../../constants/Colors";

const PostImage = ({ post }) => {
  const iconRef = useRef();

  const [lastPress, setLastPress] = useState(0);
  const [isLikeVisible, setIsLikeVisible] = useState(false);

  const handleLikePost = () => {
    const currentTime = new Date().getTime();
    const delay = 300;

    if (currentTime - lastPress < delay) {
      // double press happened
      setIsLikeVisible(true);
      setTimeout(() => {
        setIsLikeVisible(false);
      }, 500);
    }

    setLastPress(currentTime);
  };

  return (
    <Pressable style={{ width: "100%", height: 450 }} onPress={handleLikePost}>
      <Image
        // resizeMode="contain"
        style={{ height: "100%", width: "100%", position: "relative" }}
        source={require("../../../assets/postImage.jpg")}
      />
      {isLikeVisible && (
        <View
          ref={iconRef}
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            alignItems: "center",
            justifyContent: "center",
            // transform: [{ scale: 1.5 }],
          }}
        >
          <FontAwesome
            name="heart"
            size={100}
            color={COLORS.global.lightRed600}
          />
        </View>
      )}
    </Pressable>
  );
};

export default PostImage;
