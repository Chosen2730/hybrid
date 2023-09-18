import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const DrawerContent = (props) => {
  const navigation = useNavigation();
  const logoutHandler = () => {
    navigation.navigate("Login");
  };
  return (
    <DrawerContentScrollView
      contentContainerStyle={{ backgroundColor: "#F4EEFF", flex: 1 }}
      {...props}
    >
      <View className='flex-1'>
        <View className='items-center mb-10'>
          <Image
            className='w-40 h-40 rounded-full object-cover mb-2'
            source={require("../assets/images/user.png")}
          />
          <Text className='font-bold text-lg'>Robinson Simon</Text>
          <Text className='font-medium'>patiencesimoniseoluwa@gmail.com</Text>
        </View>
        <DrawerItemList {...props} />
      </View>
      <View className='my-10 p-3'>
        <TouchableOpacity
          onPress={logoutHandler}
          className='bg-gray-500 space-x-2 justify-center rounded-md items-center flex-row p-3'
        >
          <Feather name='log-out' size={24} color='white' />
          <Text className='text-white font-bold'>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
