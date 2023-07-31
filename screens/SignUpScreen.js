import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from "react-native";

import { useSelector } from "react-redux";
import { getLanguage } from "../redux/slices/Translation";

import InputField from "../components/ui/InputField";
import OutlineButton from "../components/ui/OutlineButton";

import { COLORS } from "../constants/Colors";
import { locales } from "../locales/Locales";

const SignUpScreen = ({ navigation }) => {
  const selectedLanguage = useSelector(getLanguage);

  const [signupFields, setSignupFields] = useState({
    email: { value: "", error: "" },
    fullName: { value: "", error: "" },
    username: { value: "", error: "" },
    password: { value: "", error: "" },
  });

  const { email, password, fullName, username } = signupFields;

  const checkIsFormValid = () => {
    const fields = Object.values(signupFields);

    const validateFields = fields?.map((field) => {
      if (field?.error || !field?.value) {
        return "not-valid";
      }
      return "valid";
    });

    const isFormValid = !!validateFields?.find(
      (field) => field === "not-valid"
    );

    return isFormValid;
  };

  const handleChange = (field, enteredText) => {
    const hasSpace = enteredText?.length > 0 && enteredText?.includes(" ");
    const errorMessage = hasSpace
      ? locales[selectedLanguage]?.invalidInput
      : "";

    setSignupFields({
      ...signupFields,
      [field]: { value: enteredText, error: errorMessage },
    });
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
      handleRedirect("SideNavigation");
    }
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={[styles.container]}>
          <View style={styles.loginContainer}>
            <Image
              source={require("../assets/dark-logo.png")}
              style={styles.image}
              resizeMode="contain"
            />
            <Text style={styles.text}>
              {locales[selectedLanguage]?.newAccountDescription}
            </Text>
            <InputField
              value={email.value}
              error={email.error}
              onChangeText={handleChange.bind(this, "email")}
              onSubmitEditing={handleSubmit}
              placeholder={locales[selectedLanguage]?.mobileOrEmail}
            />
            <InputField
              value={fullName.value}
              error={fullName.error}
              onChangeText={handleChange.bind(this, "fullName")}
              onSubmitEditing={handleSubmit}
              placeholder={locales[selectedLanguage]?.fullName}
            />
            <InputField
              value={username.value}
              error={username.error}
              onChangeText={handleChange.bind(this, "username")}
              onSubmitEditing={handleSubmit}
              placeholder={locales[selectedLanguage]?.username}
            />
            <InputField
              value={password.value}
              error={password.error}
              onChangeText={handleChange.bind(this, "password")}
              onSubmitEditing={handleSubmit}
              placeholder={locales[selectedLanguage]?.password}
              secureTextEntry={true}
            />
            <OutlineButton
              style={styles.btn}
              isDisabled={
                email.error ||
                !email.value ||
                !password.value ||
                password?.error
                  ? true
                  : false
              }
              onPress={handleSubmit}
            >
              {locales[selectedLanguage]?.signUp}
            </OutlineButton>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default SignUpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    paddingVertical: 20,
  },
  scrollContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "85%",
    gap: 20,
  },
  image: {
    alignSelf: "center",
    width: 210,
    maxWidth: 350,
    height: 70,
  },
  input: {
    padding: 15,
    borderColor: COLORS.global.lightGrey150,
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 15,
  },
  btn: {
    backgroundColor: COLORS.global.lightBlue400,
    borderWidth: 0,
    borderRadius: 5,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 10,
  },
  forgetBtn: {
    alignSelf: "flex-end",
  },
  btnText: {
    fontWeight: 500,
    color: COLORS.global.lightBlue400,
  },
  errorText: {
    color: "red",
    fontWeight: 500,
  },
  signupContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
  },
  pressed: {
    opacity: 0.7,
    transform: [{ scale: 0.95 }],
  },
  text: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: "center",
    color: COLORS.global.grey400,
  },
});
