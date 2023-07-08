import { View, Text, StyleSheet } from "react-native";
import React, { useContext } from "react";
import { Pressable } from "react-native";
import { getThemeColors } from "../../utilities/theme";
import { ThemeContext } from "../../context/ThemeContext";
import { COLORS } from "../../constants/Colors";

const Button = ({
  children,
  onPress,
  style,
  styleText,
  isDisabled = false,
}) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        style,
        (pressed || isDisabled) && styles.pressed,
        //
      ]}
      disabled={isDisabled}
    >
      <Text style={[{ color: textColor }, styleText]}>{children}</Text>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  container: {},
  text: {
    color: COLORS.global.white,
  },
  pressed: { opacity: 0.5, transform: [{ scale: 0.95 }] },
});
