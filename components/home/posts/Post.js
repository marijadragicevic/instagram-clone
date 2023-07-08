import { View, Text } from "react-native";

import { Divider } from "react-native-elements"

import PostHeader from "./PostHeader";
import PostImage from "./PostImage";
import PostFooter from "./PostFooter";

const Post = ({ post, index }) => {
  return (
    <View>
      <Divider width={1} orientation="vertical" />
      <PostHeader profileImage={post.profileImage} user={post.user} />
      <PostImage post={post} />
      <PostFooter post={post} index={index} />
    </View>
  );
};

export default Post;
