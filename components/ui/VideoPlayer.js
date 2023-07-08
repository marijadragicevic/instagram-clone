import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Video, ResizeMode } from "expo-av";
import { useRef, useState } from "react";
import { Button } from "react-native";

const VideoPlayer = ({
  style,
  sourceUri,
  isLooping = false,
  isPlaying = false,
  showControls = true,
}) => {
  const { width } = Dimensions.get("window");

  const videoPlayerRef = useRef();

  const styles = StyleSheet.create({
    video: {
      width: width,
      height: 450,
      backgroundColor: "black",
    },
  });

  return (
    <Video
      ref={videoPlayerRef}
      source={{
        uri: sourceUri,
      }}
      shouldPlay={isPlaying}
      useNativeControls={showControls}
      isLooping={isLooping}
      resizeMode={ResizeMode.CONTAIN}
      style={[styles.video, style]}
    />
  );
};

export default VideoPlayer;
