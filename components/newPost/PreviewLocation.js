import { useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Modal, Pressable } from "react-native";
import { getMapPreview } from "../../utilities/location";
import { COLORS } from "../../constants/Colors";

const PreviewLocation = ({ lat, long, onCloseModal, isVisible }) => {
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useLayoutEffect(() => {
    if (lat && long) {
      const mapPreview = getMapPreview(lat, long);
      setImagePreviewUrl(mapPreview);
    }
  }, [lat, long]);

  return (
    <View style={styles.container}>
      <Modal animationType="fade" transparent={true} visible={isVisible}>
        <Pressable onPress={onCloseModal} style={styles.innerContainer}>
          <Pressable style={styles.innerContainer}>
            <View style={styles.imageContainer}>
              {imagePreviewUrl ? (
                <Image source={{ uri: imagePreviewUrl }} style={styles.image} />
              ) : (
                <Image
                  source={require("../../assets/icon.png")}
                  style={styles.image}
                />
              )}
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
};

export default PreviewLocation;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  innerContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: COLORS.global.blackOpacity,
  },
  imageContainer: {
    position: "absolute",
    zIndex: 5,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    backgroundColor: COLORS.global.lightGrey500Opacity,
    borderRadius: 5,
  },
  image: {
    width: 300,
    height: 200,
  },
});
