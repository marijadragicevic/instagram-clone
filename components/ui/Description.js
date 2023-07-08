import { View, Text, StyleSheet } from "react-native";
import { COLORS } from "../../constants/Colors";

const Description = ({ children, color }) => {
  return <Text style={[styles.text, { color: color }]}>{children}</Text>;
};

export default Description;

const styles = StyleSheet.create({
  text: {
    color: COLORS.global.white,
    fontSize: 18,
    // fontWeight: 500,
    margin: 10,
  },
});
