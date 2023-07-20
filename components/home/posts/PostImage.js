import { useRef, useState } from "react";
import { Image, Pressable, Animated } from "react-native";

import { FontAwesome } from "@expo/vector-icons";

import { COLORS } from "../../../constants/Colors";

const PostImage = ({ post }) => {
  const iconRef = useRef();

  const [lastPress, setLastPress] = useState(0);
  const [isLikeVisible, setIsLikeVisible] = useState(false);

  // Define the animated value for scaling the heart icon
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handleLikePost = () => {
    const currentTime = new Date().getTime();
    const delay = 300;

    if (currentTime - lastPress < delay && !isLikeVisible) {
      // double press happened
      setIsLikeVisible(true);

      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 3,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.2,
          duration: 300,
          useNativeDriver: true,
          delay: 200,
        }),
      ]).start(() => {
        setIsLikeVisible(false);
        // scaleValue.setValue(1)
      });
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
        <Animated.View
          ref={iconRef}
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
