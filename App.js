import { useContext } from "react";
import { StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Provider } from "react-redux";
import { store } from "./redux/store";

import ThemeContextProvider, { ThemeContext } from "./context/ThemeContext";

import Navigation from "./navigation/Navigation";

// !!! add onPress on all buttons

const HelperComponent = () => {
  const { isDarkLogo } = useContext(ThemeContext);

  const theme = isDarkLogo ? "dark" : "light";

  return (
    <>
      <Navigation />
      <StatusBar style={theme} />
    </>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <ThemeContextProvider>
        <HelperComponent />
      </ThemeContextProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
