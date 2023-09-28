import { View, Text, Image, TouchableOpacity, Platform } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useGlobalContext } from "../context";
const HomeHeader = ({ title, navigation }) => {
  const paddingTop = Platform.OS === "ios" ? 50 : 20;
  const { user } = useGlobalContext();
  const img = user?.profileImage;
  return (
    <View
      style={{ paddingTop }}
      className='flex-row justify-between items-center p-4'
    >
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
          resizeMode='cover'
          source={img ? { uri: img } : require("../assets/images/user1.png")}
        />
      </View>
    </View>
  );
};

export default HomeHeader;
