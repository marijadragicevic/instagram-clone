import { useState } from "react";
import { View, StyleSheet, Pressable } from "react-native";

import { COLORS } from "../../constants/Colors";
import { Text } from "react-native";

const CheckBox = ({ style, number }) => {
  const [isChecked, setIsChecked] = useState(false);

  const paddingHorizontal =
    number > 0 && number < 10
      ? { paddingHorizontal: 10 }
      : number === 10
      ? { paddingHorizontal: 6 }
      : { paddingHorizontal: 15 };

  return (
    <View style={[styles.outerContainer, style]}>
      <Pressable
        style={({ pressed }) => [
          styles.container,

          pressed && styles.pressed,
          isChecked && styles.checked,
          paddingHorizontal,
        ]}
        onPress={() => setIsChecked(!isChecked)}
      >
        <Text style={styles.text}>{isChecked && number}</Text>
      </Pressable>
    </View>
  );
};

export default CheckBox;

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  container: {
    borderColor: COLORS.global.lightGrey150,
    borderWidth: 1,
    borderRadius: 50,
    paddingVertical: 5,
  },
  text: {
    color: COLORS.global.white,
    textAlign: "center",
  },
  pressed: {},
  checked: {
    backgroundColor: COLORS.global.lightBlue600,
  },
});
