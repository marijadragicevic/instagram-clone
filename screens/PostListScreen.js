import { useLayoutEffect } from "react";
import Posts from "../components/home/posts/Posts";

const PostListScreen = ({ route, navigation }) => {
  const postIndex = route?.params?.postIndex || 0;
  const title = route?.params?.title || "";

  useLayoutEffect(() => {
    navigation.setOptions({ title: title });
  }, [navigation, route]);

  return <Posts marginVertical={0} currentIndex={postIndex} />;
};

export default PostListScreen;
