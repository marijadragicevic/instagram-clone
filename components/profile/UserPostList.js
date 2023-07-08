import { View, Text, Image, ScrollView, Pressable } from "react-native";
import React from "react";
import { POSTS } from "../../data/posts";
import Gallery from "../ui/Gallery";
import { useNavigation } from "@react-navigation/native";

const UserPostList = () => {
  const navigation = useNavigation();

  const handlePressOnImage = (index) => {
    navigation.navigate("PostListScreen", {
      postIndex: index,
      title: "Posts",
    });
  };

  return <Gallery onPress={handlePressOnImage} />;
};

export default UserPostList;
