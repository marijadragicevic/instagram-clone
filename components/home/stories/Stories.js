import { View, StyleSheet, FlatList } from "react-native";

import Story from "./Story";

import { USERS } from "../../../data/users";
import AddStoryIcon from "./AddStoryIcon";

const Stories = () => {
  return (
    <View style={styles.container}>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.list}
        data={USERS}
        renderItem={({ item, index }) => {
          if (index === 0) {
            return (
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <AddStoryIcon />
                <Story {...item} id={index} />
              </View>
            );
          }
          return <Story {...item} id={index} />;
        }}
        keyExtractor={(item, index) => index}
      />
    </View>
  );
};

export default Stories;

const styles = StyleSheet.create({
  container: {
    marginBottom: 5,
    padding: 5,
  },
  list: {
    alignItems: "center",
    gap: 8,
  },
});
