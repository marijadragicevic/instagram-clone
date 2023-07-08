import { useIsFocused } from "@react-navigation/core";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
} from "expo-location";
import { useCallback, useContext, useEffect, useLayoutEffect } from "react";
import { useState } from "react";
import { View, Text, Alert, Image } from "react-native";
import IconButton from "../../components/ui/IconButton";
import { ThemeContext } from "../../context/ThemeContext";
import { getThemeColors } from "../../utilities/theme";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getAddress, getMapPreview } from "../../utilities/location";
import { COLORS } from "../../constants/Colors";

const LocationPickerScreen = ({ navigation, route }) => {
  const [locationPermissionInfo, requestPermission] =
    useForegroundPermissions();

  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const [pickedLocation, setPickedLocation] = useState(null);
  const [address, setAddress] = useState(null);

  const isFocused = useIsFocused();

  const verifyPermission = useCallback(async () => {
    if (locationPermissionInfo.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();

      return response.granted;
    }

    if (locationPermissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location premissions to use this app."
      );

      return false;
    }

    return true;
  }, [locationPermissionInfo]);

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermission();

    console.log(hasPermission);
    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log(location.coords);

    setPickedLocation({
      lat: location?.coords?.latitude,
      long: location?.coords?.longitude,
    });
  };

  const pickOnMapHandler = (event) => {
    const lat = event.nativeEvent.coordinate.latitude;
    const long = event.nativeEvent.coordinate.longitude;

    setPickedLocation({ lat: lat, long: long });
  };

  const getLocationAdress = async (lat, long) => {
    if (pickedLocation) {
      const address = await getAddress(lat, long);
      console.log(address, "<---adresa");
      setAddress(address);
    }
  };

  const savePickedLocation = useCallback(
    (submit = false) => {
      if (submit) {
        if (pickedLocation?.lat && pickedLocation?.long) {
          navigation.replace("PreviewPost", {
            address: "Test location 123",
            lat: pickedLocation.lat,
            long: pickedLocation.long,
          });
        } else {
          Alert.alert(
            "No location picked!",
            "You have to pick a location (by tapping on map) first!"
          );
        }
      } else {
        navigation.replace("PreviewPost");
      }
    },
    [pickedLocation]
  );

  // error with google api
  // useEffect(() => {
  //   if (pickedLocation?.lat && pickedLocation?.long) {
  //     (async () => {
  //       await getLocationAdress(pickedLocation.lat, pickedLocation.long);
  //     })();
  //   }
  // }, [pickedLocation]);

  // useEffect(() => {
  //   if (isFocused && route?.params) {
  //     const mapPickedLocation = {
  //       lat: route?.params?.pickedLat,
  //       long: route?.params?.pickedLong,
  //     };

  //     setPickedLocation(mapPickedLocation);
  //   }
  // }, [route, isFocused]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <IconButton
          icon="arrow-right"
          size={30}
          color={COLORS.global.lightBlue500}
          onPress={savePickedLocation.bind(this, true)}
        />
      ),
      headerLeft: () => (
        <IconButton
          icon="x"
          size={30}
          style={{ marginRight: 10 }}
          onPress={savePickedLocation.bind(this, false)}
        />
      ),
    });
  }, [pickedLocation]);

  return (
    <View style={styles.container}>
      <MapView style={styles.map} onPress={pickOnMapHandler}>
        {pickedLocation?.lat && pickedLocation?.long && (
          <Marker
            coordinate={{
              latitude: pickedLocation.lat,
              longitude: pickedLocation.long,
            }}
          />
        )}
      </MapView>
      <IconButton
        icon="my-location"
        color={COLORS.global.lightBlue500}
        size={30}
        style={styles.currentLocation}
        onPress={getLocationHandler}
      />
    </View>
  );
};

export default LocationPickerScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: "relative",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  currentLocation: {
    padding: 10,
    backgroundColor: "white",
    position: "absolute",
    bottom: 20,
    right: 20,
    borderRadius: 50,
    elevation: 4,
  },
});
