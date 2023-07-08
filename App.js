import { StatusBar } from "expo-status-bar";
import { StyleSheet } from 'react-native'

import ThemeContextProvider, { ThemeContext } from "./context/ThemeContext";

import Navigation from "./navigation/Navigation";
import { useContext } from "react";

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
    <ThemeContextProvider>
      <HelperComponent />
    </ThemeContextProvider>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
