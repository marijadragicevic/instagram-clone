import { View, Text } from "react-native";
import React from "react";
import Gallery from "../ui/Gallery";
import { useNavigation } from "@react-navigation/native";

const UserTagedPostList = () => {
  const navigation = useNavigation();

  const handlePressOnImage = (index) => {
    navigation.navigate("PostListScreen", {
      postIndex: index,
      title: "Tagged",
    });
  };

  return <Gallery onPress={handlePressOnImage} />;
};

export default UserTagedPostList;
