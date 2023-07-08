import { useContext, useEffect, useRef, useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import { COLORS } from "../../constants/Colors";

const ScrollDots = ({ number, focusedIndex }) => {
  const numberList = Array.apply(null, { length: number });

  const scrollViewRef = useRef();

  const [layouts, setLayouts] = useState([]);

  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const scrollToCurrentDot = (index) => {
    if (layouts?.length > 0) {
      scrollViewRef?.current?.scrollTo({
        y: 0,
        x: layouts[index]?.x,
        animated: true,
      });
    }
  };

  useEffect(() => {
    scrollToCurrentDot(focusedIndex);
  }, [focusedIndex]);

  if (numberList?.length > 1) {
    return (
      <View style={styles.outerContainer}>
        <ScrollView
          ref={scrollViewRef}
          scrollEnabled={false}
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.innerContainer}
          contentContainerStyle={{ gap: 8, alignItems: "center" }}
        >
          {numberList?.map((_, index) => (
            <Text
              key={index}
              onLayout={(event) => {
                setLayouts([...layouts, event?.nativeEvent?.layout]);
              }}
              style={[
                styles.text,
                focusedIndex === index
                  ? { color: COLORS.global.grey500, fontSize: 20 }
                  : { color: textColor },
              ]}
            >
              ●
            </Text>
          ))}
        </ScrollView>
      </View>
    );
  }
};

export default ScrollDots;

const styles = StyleSheet.create({
  outerContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    maxWidth: 80,
  },
  text: {
    fontSize: 15,
  },
});
