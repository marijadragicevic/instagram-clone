import { useContext, useLayoutEffect } from "react";
import { StyleSheet, FlatList } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import ProfileHeader from "./ProfileHeader";
import ProfileGallery from "./ProfileGallery";
import { loggedInUser } from "../../screens/MessagesScreen";
import { Picker } from "@react-native-picker/picker";
import { useDispatch, useSelector } from "react-redux";
import { getLanguage, setLanguage } from "../../redux/slices/Translation";

const Profile = () => {
  const { theme } = useContext(ThemeContext);
  const { backgroundColor, textColor } = getThemeColors(theme);

  const navigation = useNavigation();
  const route = useRoute();

  const dispatch = useDispatch();
  const language = useSelector(getLanguage);

  const currentUser = route?.params?.user || loggedInUser;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: currentUser,
      headerRight: () => (
        <Picker
          selectedValue={language}
          style={{ color: textColor, width: 150 }}
          dropdownIconColor={textColor}
          onValueChange={(itemValue) => {
            dispatch(setLanguage(itemValue));
          }}
          mode="dropdown"
        >
          <Picker.Item value={"english"} label="ENG" />
          <Picker.Item value={"serbian"} label="SRB" />
        </Picker>
      ),
    });
  }, [navigation, theme, route, language]);

  return (
    <FlatList
      style={[styles.container, { backgroundColor: backgroundColor }]}
      ListHeaderComponent={() => <ProfileHeader user={currentUser} />}
      ListFooterComponent={() => <ProfileGallery />}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
export default Profile;
