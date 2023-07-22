import { useRef, useState } from "react";
import { View } from "react-native";

import { Divider } from "react-native-elements";

import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostFooter from "./PostFooter";
import { Animated } from "react-native";

const Post = ({ post, index }) => {
  const [isLikeVisible, setIsLikeVisible] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [lastPress, setLastPress] = useState(0);

  // Define the animated value for scaling the heart icon
  const scaleValue = useRef(new Animated.Value(1)).current;

  const activateAnimations = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 3,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 0.2,
        duration: 150,
        useNativeDriver: true,
        delay: 200,
      }),
    ]).start(() => {
      setIsLikeVisible(false);
      // scaleValue.setValue(1)
    });
  };

  const handleLikePost = (type) => {
    const isDoublePress = type === "image";

    const currentTime = new Date().getTime();
    const delay = 300;

    if (currentTime - lastPress < delay && !isLikeVisible && isDoublePress) {
      // double press happened
      setIsLikeVisible(true);

      setIsLiked(true);
      activateAnimations();
    } else if (!isDoublePress) {
      if (!isLiked) {
        setIsLikeVisible(true);
        activateAnimations();
      }
      setIsLiked(!isLiked);
    }

    setLastPress(currentTime);
  };

  return (
    <View>
      <Divider width={1} orientation="vertical" />
      <PostHeader profileImage={post.profileImage} user={post.user} />
      <PostImage
        post={post}
        isLikeVisible={isLikeVisible}
        handleLikePost={handleLikePost.bind(this, "image")}
        scaleValue={scaleValue}
      />
      <PostFooter
        post={post}
        index={index}
        isLiked={isLiked}
        handleLikePost={handleLikePost.bind(this, "icon")}
      />
    </View>
  );
};

export default Post;
