import { View, Text } from "react-native";
import React from "react";

const NavOptions = () => {
  const data = [
    {
      id: "123",
      title: "Get a ride",
      image: "https://links.papareact.com/3pn",
      screens: "MapScreen",
    },
    {
      id: "456",
      title: "Order Food",
      image: "https://links.papareact.com/28w",
      screens: "EatsScreen",
    },
  ];
  return (
    <View>
      <Text className='text-red-600'>NavOptions</Text>
    </View>
  );
};

export default NavOptions;
