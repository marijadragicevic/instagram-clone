import Gallery from "../ui/Gallery";
import { useNavigation } from "@react-navigation/native";
import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";
import { locales } from "../../locales/Locales";

const UserPostList = () => {
  const navigation = useNavigation();

  const selectedLanguage = useSelector(getLanguage);

  const handlePressOnImage = (index) => {
    navigation.navigate("PostListScreen", {
      postIndex: index,
      title: locales[selectedLanguage]?.posts,
    });
  };

  return <Gallery onPress={handlePressOnImage} />;
};

export default UserPostList;
