import { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";

import { COLORS } from "../../constants/Colors";

const CheckBox = ({ style, number = 0, isSelected, type = "checkbox" }) => {
  const [isChecked, setIsChecked] = useState(false);

  const paddingHorizontal =
    number > 0 && number < 10
      ? { paddingHorizontal: 8 }
      : number === 10
      ? { paddingHorizontal: 5 }
      : { paddingHorizontal: 11 };

  return (
    <View style={[styles.outerContainer, style]}>
      {type === "selected" ? (
        <View
          style={[
            styles.container,
            isSelected && styles.checked,
            paddingHorizontal,
          ]}
        >
          <Text style={styles.text}>{isSelected && number}</Text>
        </View>
      ) : (
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
      )}
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
    paddingVertical: 3,
  },
  text: {
    color: COLORS.global.white,
    textAlign: "center",
    fontSize: 12,
  },
  checked: {
    backgroundColor: COLORS.global.lightBlue600,
  },
});
