import { View, Text, FlatList } from "react-native";
import ResultItem from "./ResultItem";

const ResultList = ({ type, list, onDeleteHistoryItem }) => {
  return (
    <FlatList
      data={list}
      keyExtractor={(_, index) => index}
      renderItem={({ item, index }) => (
        <ResultItem
          {...item}
          type={type}
          onDeleteHistoryItem={() => onDeleteHistoryItem(index)}
        />
      )}
      // contentContainerStyle={{ gap: 20 }}
    />
  );
};

export default ResultList;
