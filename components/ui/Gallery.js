import { Image, Pressable, FlatList, useWindowDimensions } from "react-native";
import { POSTS } from "../../data/posts";

const Gallery = ({ list, onPress }) => {
  const data = list?.length > 0 ? list : POSTS;

  const { width } = useWindowDimensions();

  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingTop: 2,
      }}
      numColumns={3}
      renderItem={({ itemData, index }) => (
        <Pressable
          style={({ pressed }) => [
            {
              padding: 1,
            },
            pressed && { opacity: 0.7 },
          ]}
          onPress={() => onPress(index)}
        >
          <Image
            source={require("../../assets/postImage.jpg")}
            style={{
              height: 150,
              width: (width - 6) / 3,
            }}
            resizeMode="cover"
          />
        </Pressable>
      )}
    />
  );
};

export default Gallery;
