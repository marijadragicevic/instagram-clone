import { StyleSheet, View } from "react-native";
import { COLORS } from "../../constants/Colors";

const Overlay = ({ overlayColor }) => {
  return (
    <View
      style={[
        styles.container,
        overlayColor && { backgroundColor: overlayColor },
      ]}
    ></View>
  );
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.global.lightGrey300Opacity,
  },
});
