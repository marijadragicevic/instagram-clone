import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useContext } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Image } from "react-native";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import { useNavigation } from "@react-navigation/native";
import Description from "../ui/Description";
import { COLORS } from "../../constants/Colors";

const MessageItem = (props) => {
  const { theme } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const navigation = useNavigation();

  return (
    <>
      {props?.index === 0 && (
        <Description color={textColor}>Messages</Description>
      )}
      <Pressable
        style={[styles.outerContainer]}
        onPress={() =>
          navigation.navigate("MessageChat", { chatId: props?.index })
        }
      >
        <LinearGradient
          colors={[
            COLORS.global.lightYellow200,
            COLORS.global.lightYellow600,
            COLORS.global.lightYellow600,
            COLORS.global.lightOrange600,
            COLORS.global.lightRed400,
            COLORS.global.lightRed800,
            COLORS.global.pink300,
            COLORS.global.pink500,
            COLORS.global.pink500,
            COLORS.global.purple500,
          ]}
          start={{ x: 0, y: 1 }}
          end={{ x: 1, y: 0.5 }}
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 2,
            borderRadius: 100,
          }}
        >
          <Image
            style={[styles.image, { borderColor: backgroundColor }]}
            source={require("../../assets/userImage.jpeg")}
          />
        </LinearGradient>
        <View>
          <Text style={[styles.text, { color: textColor }]}>
            {props?.item?.user}
          </Text>
          <Text style={[{ color: textColor }]}>
            {props?.item?.deliveredDate}
          </Text>
        </View>
      </Pressable>
    </>
  );
};

export default MessageItem;

const styles = StyleSheet.create({
  outerContainer: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  text: { fontSize: 15, fontWeight: 500 },
  image: {
    height: 60,
    width: 60,
    borderRadius: 100,
    borderWidth: 2,
  },
});
