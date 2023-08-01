import { useState, useContext, useEffect } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import UserPostList from "./UserPostList";
import UserTagedPostList from "./UserTagedPostList";

import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";

import { locales } from "../../locales/Locales";

import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const ProfileGallery = () => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "allPosts", title: locales[selectedLanguage]?.allPosts },
    { key: "tagedPosts", title: locales[selectedLanguage]?.tagedPosts },
  ]);
  const renderScene = SceneMap({
    allPosts: UserPostList,
    tagedPosts: UserTagedPostList,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props) => (
        <TabBar
          {...props}
          indicatorStyle={{ backgroundColor: textColor }}
          style={{ backgroundColor: backgroundColor }}
          labelStyle={{ color: textColor }}
        />
      )}
      style={{ marginTop: 10 }}
    />
  );
};

export default ProfileGallery;
