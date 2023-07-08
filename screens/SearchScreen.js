import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import SearcForm from "../components/search/SearcForm";
import { getThemeColors } from "../utilities/theme";
import { ThemeContext } from "../context/ThemeContext";
import ResultList from "../components/search/ResultList";
import { USERS } from "../data/users";

const SearchScreen = ({ navigation }) => {
  const { theme, isDarkLogo } = useContext(ThemeContext);
  const { textColor, backgroundColor } = getThemeColors(theme);

  const [searchValue, setSearchValue] = useState("");
  const [resultList, setResultList] = useState([]);
  const [resultHistoryList, setResultHistoryList] = useState(USERS.slice(0, 3));

  const handleSearchResult = (result, searchValue) => {
    setResultList(result);
    setSearchValue(searchValue);
  };

  const handleDeleteHistoryItem = (id) => {
    const updateHistoryList = resultHistoryList?.filter(
      (_, index) => index !== id
    );
    setResultHistoryList(updateHistoryList);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => <SearcForm setSearchResult={handleSearchResult} />,
    });
  }, [navigation]);

  return (
    <View
      style={[styles.container, { backgroundColor: backgroundColor, flex: 1 }]}
    >
      {!searchValue ? (
        <ResultList
          type="history"
          list={resultHistoryList}
          onDeleteHistoryItem={handleDeleteHistoryItem}
        />
      ) : (
        <ResultList type="result" list={resultList} />
      )}
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
