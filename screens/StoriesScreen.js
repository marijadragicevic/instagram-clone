import { useWindowDimensions } from "react-native";
import { Text, View } from "react-native";
import SwipeComponent from "../components/ui/animations/Swipe";
import { USERS } from "../data/users";

const StoriesScreen = () => {
  const { width } = useWindowDimensions();

  return (
    <SwipeComponent number={USERS?.length}>
      {USERS?.map((_, index) => (
        <View
          key={index}
          style={{ width: width, marginTop: 50, backgroundColor: "red" }}
        >
          <Text>Story screen {index}!</Text>
        </View>
      ))}
    </SwipeComponent>
  );
};

export default StoriesScreen;
