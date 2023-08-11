import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Animated, BackHandler } from "react-native";

import { USERS } from "../../../data/users";
import { locales } from "../../../locales/Locales";

import SearchForm from "../../search/SearchForm";
import ResultList from "../../search/ResultList";
import Button from "../../ui/Button";
import Overlay from "../../ui/Overlay";

import { getThemeColors } from "../../../utilities/theme";
import { ThemeContext } from "../../../context/ThemeContext";
import { getIsVisible, setVisibility } from "../../../redux/slices/Modals";
import { getLanguage } from "../../../redux/slices/Translation";
import { COLORS } from "../../../constants/Colors";

const ShareScreen = ({}) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const dispatch = useDispatch();

  const isVisible = useSelector(getIsVisible);
  const selectedLanguage = useSelector(getLanguage);

  const slideAnimation = new Animated.Value(0);

  const handleSearch = () => {};

  const activateAnimation = (value) => {
    Animated.timing(slideAnimation, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      if (!value) {
        dispatch(setVisibility(false));
      }
    });
  };

  const animatedStyle = {
    transform: [
      {
        translateY: slideAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [700, 0], // Adjust this value to control slide distance
        }),
      },
    ],
  };

  useEffect(() => {
    if (isVisible) {
      activateAnimation(1);
    }
  }, [isVisible]);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      () => {
        activateAnimation(0);
      }
    );

    return () => backHandler.remove();
  }, []);

  return (
    isVisible && (
      <>
        <Overlay />
        <Animated.View
          style={[
            styles.container,
            animatedStyle,
            { backgroundColor: backgroundColor },
          ]}
        >
          <SearchForm
            type="share"
            style={styles.search}
            setSearchResult={handleSearch}
          />
          <ResultList
            type="share"
            list={USERS}
            style={{ backgroundColor: backgroundColor }}
          />
          <Button
            style={styles.button}
            styleText={{ color: COLORS.global.white }}
            onPress={() => activateAnimation(0)}
            // isDisabled
          >
            {locales[selectedLanguage]?.send}
          </Button>
        </Animated.View>
      </>
    )
  );
};

export default ShareScreen;

const styles = StyleSheet.create({
  container: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    overflow: "hidden",
    elevation: 10,
    height: "90%",
    bottom: 0,
    right: 0,
    left: 0,
  },
  search: {
    paddingTop: 10,
  },
  button: {
    backgroundColor: COLORS.global.lightBlue400,
    alignItems: "center",
    borderRadius: 5,
    margin: 10,
    padding: 5,
  },
});
