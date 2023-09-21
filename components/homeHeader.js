import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
const HomeHeader = ({ title, navigation }) => {
  return (
    <View className='flex-row justify-between items-center p-4 pt-8'>
      <TouchableOpacity
        onPress={() => navigation.openDrawer()}
        className='flex-1'
      >
        <Ionicons name='menu-outline' size={30} color='black' />
      </TouchableOpacity>
      <Text className='text-xl font-bold text-center flex-1 text-gray-900'>
        {title}
      </Text>
      <View className='flex-1 flex-row justify-end'>
        <Image
          className='w-10 h-10 rounded-full'
          source={require("../assets/images/user.png")}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
