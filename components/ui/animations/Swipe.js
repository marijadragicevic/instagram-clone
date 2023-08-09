import { useContext, useMemo } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  Text,
  View,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import { COLORS } from "../../../constants/Colors";
import { ThemeContext } from "../../../context/ThemeContext";
import { getThemeColors } from "../../../utilities/theme";

const SwipeComponent = ({
  children,
  style,
  number = 2,
  inputRange,
  outputRange,
  showNavbar = true,
  navbarList,
}) => {
  const translationX = new Animated.Value(0);

  const { width } = useWindowDimensions();

  const translateX = translationX.interpolate({
    inputRange: inputRange || [0, 1],
    outputRange: outputRange || [0, -width],
  });

  const activateAnimation = (value) => {
    Animated.timing(translationX, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {});
  };

  const panResponder = useMemo(() => {
    return PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        if (
          Math.abs(gestureState.dx) > 5 &&
          Math.abs(gestureState.dx) > Math.abs(gestureState.dy)
        ) {
          return true;
        }

        return false;
      },
      onPanResponderMove: (event, gestureState) => {
        if (gestureState.dx < 0) {
          // Right swipe
          activateAnimation(1);
        } else {
          // Left swipe
          activateAnimation(0);
        }
      },
      onPanResponderRelease: () => {
        // Reset or finalize swipe handling
      },
    });
  }, []);

  const handleNavbarChange = (position) => {
    activateAnimation(position);
  };

  return (
    <View {...panResponder.panHandlers} style={[{ flex: 1 }, style]}>
      {showNavbar && (
        <SwipeNavbar navbarList={navbarList} onSelect={handleNavbarChange} />
      )}
      <Animated.View
        style={{
          flex: 1,
          flexDirection: "row",
          width: width * number,
          transform: [{ translateX }],
        }}
      >
        {children}
      </Animated.View>
    </View>
  );
};

const SwipeNavbar = ({ navbarList, onSelect }) => {
  const { theme } = useContext(ThemeContext);
  const { textColor } = getThemeColors(theme);

  return (
    <View style={style.navbarContainer}>
      {navbarList?.map((navbarItem, index) => {
        return (
          <Pressable
            style={[
              style.navbarItem,
              navbarItem?.isActive && style.active(textColor),
            ]}
            key={index}
            onPress={() => {
              onSelect(navbarItem?.position);
            }}
          >
            <Text style={[style.navbarText, { color: textColor }]}>
              {navbarItem.title}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
};

export default SwipeComponent;

const style = StyleSheet.create({
  navbarContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    marginHorizontal: 5,
  },
  navbarItem: {
    padding: 5,
    flex: 1,
    borderBottomColor: COLORS.global.lightGrey200Opacity,
    borderBottomWidth: 1,
  },
  navbarText: {
    textAlign: "center",
  },
  active: (color) => ({
    borderBottomColor: color,
    borderBottomWidth: 2.5,
  }),
});
