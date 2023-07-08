import { Text, Pressable, StyleSheet } from "react-native";
import {
  Feather,
  FontAwesome,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";

const IconButton = ({
  children,
  icon,
  size = 24,
  color = "",
  onPress,
  style,
  styleText,
  disabled = false,
}) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const currentColor = color || textColor;

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        style,
        disabled && styles.disabled,
        pressed && styles.pressed,
      ]}
      disabled={disabled}
    >
      {icon?.includes("heart") ? (
        <FontAwesome name={icon} size={size} color={currentColor} />
      ) : icon?.includes("dots") ? (
        <Entypo name={icon} size={size} color={currentColor} />
      ) : icon?.includes("location") || icon?.includes("person-add") ? (
        <MaterialIcons name={icon} size={size} color={currentColor} />
      ) : (
        <Feather name={icon} size={size} color={currentColor} />
      )}
      {children && typeof children === "string" && (
        <Text style={[styles.text, styleText]}>{children}</Text>
      )}
      {children && typeof children !== "string" && children}
    </Pressable>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "white",
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.9 }],
  },
  disabled: {
    opacity: 0.5,
  },
});
