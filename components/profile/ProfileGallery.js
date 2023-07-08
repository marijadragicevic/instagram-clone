import { useState } from "react";
import { useWindowDimensions } from "react-native";
import { SceneMap, TabBar, TabView } from "react-native-tab-view";

import UserPostList from "./UserPostList";
import UserTagedPostList from "./UserTagedPostList";
import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { useContext } from "react";

const ProfileGallery = () => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const layout = useWindowDimensions();

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: "allPosts", title: "all Posts" },
    { key: "tagedPosts", title: "taged Posts" },
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
      style={{ marginTop: 20 }}
    />
  );
};

export default ProfileGallery;
