import { FlatList } from "react-native";
import ResultItem from "./ResultItem";
import { getLanguage } from "../../redux/slices/Translation";
import { useSelector } from "react-redux";

const ResultList = ({ type, list, onDeleteHistoryItem }) => {
  const selectedLanguage = useSelector(getLanguage);

  return (
    <FlatList
      data={list}
      keyExtractor={(_, index) => index}
      renderItem={({ item, index }) => (
        <ResultItem
          {...item}
          type={type}
          onDeleteHistoryItem={() => onDeleteHistoryItem(index)}
          selectedLanguage={selectedLanguage}
        />
      )}
      // contentContainerStyle={{ gap: 20 }}
    />
  );
};

export default ResultList;
