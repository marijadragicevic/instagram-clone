import { View, Text } from "react-native";
import React, { createContext, useState } from "react";

const initilaTheme = {
  theme: "light",
  isDarkLogo: true,
  handleSwitchTheme: () => {},
};

export const ThemeContext = createContext(initilaTheme);

const ThemeContextProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");
  const [isDarkLogo, setIsDarkLogo] = useState(true);

  const handleSwitchTheme = () => {
    if (theme === "dark") {
      setTheme("light");
      setIsDarkLogo(true);
      return;
    }
    setTheme("dark");
    setIsDarkLogo(false);
  };

  const value = {
    theme: theme,
    handleSwitchTheme: handleSwitchTheme,
    isDarkLogo: isDarkLogo,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
