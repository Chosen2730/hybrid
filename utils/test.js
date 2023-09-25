import SwipeableFlatList from "rn-gesture-swipeable-flatlist";

// Example usage
export const Swiper = ({ data }) => {
  const renderItem = ({ item }) => {
    // Render individual list items
    return <Text>items</Text>;
  };

  const renderLeftActions = (item) => {
    // Render left swipe actions for each item
    return <Text>Left action</Text>;
  };

  const renderRightActions = (item) => {
    // Render right swipe actions for each item
    return <Text>Right actions</Text>;
  };

  return (
    <SwipeableFlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={renderItem}
      renderLeftActions={renderLeftActions}
      renderRightActions={renderRightActions}
    />
  );
};
