import { useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { useSelector } from "react-redux";
import { getLanguage } from "../redux/slices/Translation";

import OutlineButton from "../components/ui/OutlineButton";
import InputField from "../components/ui/InputField";

import { COLORS } from "../constants/Colors";
import { locales } from "../locales/Locales";

const ForgotPasswordScreen = () => {
  const selectedLanguage = useSelector(getLanguage);

  const [email, setEmail] = useState({
    value: "",
    error: "",
  });

  const checkIsFormValid = () => {
    if (email.error || !email.value) {
      return false;
    }
    return true;
  };

  const handleChange = (enteredText = "") => {
    const hasSpace = enteredText?.includes(" ");
    const errorMessage = hasSpace ? "Invalid input!" : "";

    setEmail({ value: enteredText, error: errorMessage });
  };

  const handleRedirect = (screenName, params = null) => {
    // replace or navigate
    if (!!params) {
      navigation.navigate(screenName, params);
    } else {
      navigation.navigate(screenName);
    }
  };

  const handleSubmit = () => {
    const isFormValid = checkIsFormValid();

    if (isFormValid) {
      handleRedirect("SideNavigation", { isCodeSent: true });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Image source={require("../assets/lock.png")} />
      </View>
      <Text style={styles.title}>Trouble logging in?</Text>
      <Text style={styles.text}>
        {locales[selectedLanguage]?.forgetPasswordDescripion}
      </Text>
      <View style={styles.innerContainer}>
        <InputField
          value={email.value}
          error={email.error}
          onChangeText={handleChange}
          onSubmitEditing={handleSubmit}
          placeholder={locales[selectedLanguage]?.inputFieldPlaceholder}
        />
        <OutlineButton
          style={styles.btn}
          isDisabled={email.error || !email.value ? true : false}
          onPress={handleSubmit}
        >
          {locales[selectedLanguage]?.sendCode}
        </OutlineButton>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    gap: 20,
  },
  innerContainer: {
    width: "85%",
    gap: 20,
  },
  iconContainer: {
    paddingHorizontal: 5,
    paddingVertical: 15,
    borderWidth: 3,
    borderRadius: 150,
  },
  btn: {
    backgroundColor: COLORS.global.lightBlue400,
    borderWidth: 0,
    borderRadius: 10,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
  },
  text: {
    width: "85%",
    textAlign: "center",
    fontSize: 15,
  },
});
