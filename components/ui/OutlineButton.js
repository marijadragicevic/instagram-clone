import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../constants/Colors";

const OutlineButton = ({
  children,
  onPress,
  style,
  styleText,
  isDisabled = false,
}) => {
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
      <Text style={[styles.text, styleText]}>{children}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: COLORS.global.grey800,
    paddingVertical: 7,
    paddingHorizontal: 15,
  },
  text: {
    color: COLORS.global.white,
    fontSize: 18,
  },
  pressed: { opacity: 0.5, transform: [{ scale: 0.95 }] },
});

export default OutlineButton;
