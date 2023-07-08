import {
  Button,
  Pressable,
  StyleSheet,
  View,
  Text,
  Image,
  TextInput,
} from "react-native";
import OutlineButton from "../components/ui/OutlineButton";
import { useEffect, useState } from "react";
import InputField from "../components/ui/InputField";
import { COLORS } from "../constants/Colors";

const LoginScreen = ({ navigation }) => {
  const [loginFields, setLoginFields] = useState({
    email: { value: "", error: "" },
    password: { value: "", error: "" },
  });

  const { email, password } = loginFields;

  const checkIsFormValid = () => {
    if (email.error || password.error || !email.value || !password.value) {
      return false;
    }
    return true;
  };

  const handleChange = (field, enteredText) => {
    const hasSpace = enteredText?.length > 0 && enteredText?.includes(" ");
    const errorMessage = hasSpace ? "Invalid input!" : "";

    setLoginFields({
      ...loginFields,
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
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 35,
        backgroundColor: "white",
      }}
    >
      <View style={[styles.container]}>
        <View style={styles.loginContainer}>
          <Image
            source={require("../assets/dark-logo.png")}
            style={styles.image}
            resizeMode="contain"
          />
          <InputField
            value={email.value}
            error={email.error}
            onChangeText={handleChange.bind(this, "email")}
            onSubmitEditing={handleSubmit}
            placeholder="Phone number, username or -->email<--"
          />
          <InputField
            value={password.value}
            error={password.error}
            onChangeText={handleChange.bind(this, "password")}
            onSubmitEditing={handleSubmit}
            placeholder="Password"
            secureTextEntry={true}
          />
          <Pressable
            style={({ pressed }) => [
              styles.forgetBtn,
              pressed && styles.pressed,
            ]}
            onPress={() => handleRedirect("ForgotPasswordScreen")}
          >
            <Text style={styles.btnText}>Forgot password?</Text>
          </Pressable>
          <OutlineButton
            style={styles.btn}
            isDisabled={
              email.error || !email.value || !password.value || password?.error
                ? true
                : false
            }
            onPress={handleSubmit}
          >
            Log In
          </OutlineButton>
        </View>
        <View style={styles.signupContainer}>
          <Text>Don't have an account?</Text>
          <Pressable
            style={({ pressed }) => [pressed && styles.pressed]}
            onPress={() => handleRedirect("SignUpScreen")}
          >
            <Text style={styles.btnText}>Sign up</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
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
});
