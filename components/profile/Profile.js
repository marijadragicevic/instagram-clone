import { View, Text, StyleSheet } from "react-native";
import React, { useContext, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import ProfileHeader from "./ProfileHeader";
import ProfileGallery from "./ProfileGallery";
import { loggedInUser } from "../../screens/MessagesScreen";

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const { backgroundColor } = getThemeColors(theme);

  const navigation = useNavigation();
  const route = useRoute();

  const currentUser = route?.params?.user || loggedInUser;

  useLayoutEffect(() => {
    navigation.setOptions({ title: currentUser });
  }, [navigation, theme]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <ProfileHeader user={currentUser} />
      <ProfileGallery />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Profile;
