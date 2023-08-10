import { useContext } from "react";

import UserPostList from "./UserPostList";
import UserTagedPostList from "./UserTagedPostList";
import SwipeComponent from "../ui/animations/Swipe";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { locales } from "../../locales/Locales";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const ProfileGallery = () => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const navbarList = [
    { title: locales[selectedLanguage]?.allPosts, position: 0 },
    {
      title: locales[selectedLanguage]?.taggedPosts,
      position: 1,
    },
  ];

  return (
    <SwipeComponent style={{ marginTop: 10 }} navbarList={navbarList}>
      {/* Render your tab content here */}
      <UserPostList />
      <UserTagedPostList />
    </SwipeComponent>
  );
};

export default ProfileGallery;
