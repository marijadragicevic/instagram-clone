import React from "react";
import Gallery from "../ui/Gallery";
import { useNavigation } from "@react-navigation/native";
import { locales } from "../../locales/Locales";
import { useSelector } from "react-redux";
import { getLanguage } from "../../redux/slices/Translation";

const UserTagedPostList = () => {
  const navigation = useNavigation();

  const selectedLanguage = useSelector(getLanguage);

  const handlePressOnImage = (index) => {
    navigation.navigate("PostListScreen", {
      postIndex: index,
      title: locales[selectedLanguage]?.tagged,
    });
  };

  return <Gallery onPress={handlePressOnImage} />;
};

export default UserTagedPostList;
