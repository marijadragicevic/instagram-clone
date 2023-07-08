import { View, Text, TextInput, StyleSheet } from "react-native";
import React from "react";
import { COLORS } from "../../constants/Colors";

const InputField = ({
  value,
  error,
  onChangeText,
  placeholder = "",
  secureTextEntry = false,
  onSubmitEditing,
}) => {
  return (
    <View>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        onSubmitEditing={onSubmitEditing}
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        style={[styles.input, error && { borderColor: "red" }]}
      />
      {!!error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  input: {
    padding: 15,
    borderColor: COLORS.global.lightGrey150,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 15,
  },
  errorText: {
    color: "red",
    fontWeight: 500,
  },
});
