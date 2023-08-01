import { useContext, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  Pressable,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";

import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";

import IconButton from "../../components/ui/IconButton";
import PreviewLocation from "../../components/newPost/PreviewLocation";

import { COLORS } from "../../constants/Colors";
import { locales } from "../../locales/Locales";

import { useSelector } from "react-redux";
import { getLanguage } from "../../redux/slices/Translation";

const PreviewPost = ({ navigation, route }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const selectedLanguage = useSelector(getLanguage);

  const isFocused = useIsFocused();

  const [showPreviewLocation, setShowPreviewLocation] = useState(false);
  const [address, setAddress] = useState(route?.params?.address);
  const [lat, setLat] = useState(route?.params?.lat);
  const [long, setLong] = useState(route?.params?.long);

  // useEffect(() => {
  //   console.log(address, lat, long, "<---picked location");
  //   if (isFocused) {
  //     setAddress(route?.params?.address);
  //     setLat(route?.params?.lat);
  //     setLong(route?.params?.long);
  //   }
  // }, [address, lat, long, isFocused]);

  const handleLocationPicker = () => {
    if (address && lat && long) {
      setShowPreviewLocation(true);
    } else {
      navigation.replace("LocationPickerScreen");
    }
  };

  const deleteLocation = () => {
    setLat(null);
    setLong(null);
    setAddress(null);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: locales[selectedLanguage]?.newPostTitle,
      headerRight: () => (
        <IconButton
          icon="check"
          size={35}
          color={COLORS.global.lightBlue500}
          onPress={() => navigation.navigate("HomeScreen")}
        />
      ),
    });
  }, [navigation, textColor]);

  return (
    <View style={[styles.container, { backgroundColor: backgroundColor }]}>
      <View style={[styles.innerContainer, { padding: 15 }]}>
        <Image
          source={{
            uri: "https://media.istockphoto.com/id/1295274245/photo/random-multicolored-spheres-computer-generated-abstract-form-of-large-and-small-balls-3d.jpg?s=612x612&w=0&k=20&c=q7NOl28YxIIOqKu6em50VlKrg6ISFyVww_nLOCr5W_A=",
          }}
          style={styles.image}
        />
        <TextInput
          style={[styles.input, styles.text, { color: textColor }]}
          placeholderTextColor={textColor}
          placeholder={locales[selectedLanguage]?.addCaption}
          multiline
        />
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.innerContainer,
          { padding: 15 },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>
          {locales[selectedLanguage]?.tagPeople}
        </Text>
      </Pressable>
      {lat && long && address ? (
        <View style={styles.innerContainer}>
          <Pressable
            style={({ pressed }) => [
              styles.locationButton,
              pressed && styles.pressed,
            ]}
            onPress={handleLocationPicker}
          >
            <Text style={[styles.text, { color: COLORS.global.lightBlue500 }]}>
              {address}
            </Text>
          </Pressable>
          <IconButton
            icon="x"
            size={20}
            style={styles.removeLocationBtn}
            onPress={deleteLocation}
          />
        </View>
      ) : (
        <Pressable
          style={({ pressed }) => [
            styles.innerContainer,
            { padding: 15 },
            pressed && styles.pressed,
          ]}
          onPress={handleLocationPicker}
        >
          <Text style={[styles.text, { color: textColor }]}>
            {locales[selectedLanguage]?.addLocation}
          </Text>
        </Pressable>
      )}

      <Pressable
        style={({ pressed }) => [
          styles.innerContainer,
          { padding: 15 },
          pressed && styles.pressed,
        ]}
      >
        <Text style={[styles.text, { color: textColor }]}>
          {locales[selectedLanguage]?.addMusic}
        </Text>
      </Pressable>
      <PreviewLocation
        lat={lat}
        long={long}
        isVisible={showPreviewLocation}
        onCloseModal={() => setShowPreviewLocation(false)}
      />
    </View>
  );
};

export default PreviewPost;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.global.lightGrey600Opacity,
  },
  text: {
    fontSize: 15,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    lineHeight: 1.5,
  },
  image: {
    width: 60,
    height: 70,
  },
  locationButton: { padding: 15, flex: 1 },
  removeLocationBtn: { padding: 15 },
  pressed: {
    backgroundColor: COLORS.global.lightGrey600Opacity,
  },
});
