import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useGlobalContext } from "../context";

const DrawerContent = (props) => {
  const { user, getUserProfile } = useGlobalContext();
  const navigation = useNavigation();
  const logoutHandler = async () => {
    try {
      await AsyncStorage.clear();
      navigation.navigate("Login");
    } catch (e) {
      // clear error
    }
  };

  useEffect(() => {
    getUserProfile();
  }, []);
  const img = user?.profileImage;
  return (
    <DrawerContentScrollView
      contentContainerStyle={{ backgroundColor: "rgb(243 244 246)", flex: 1 }}
      {...props}
    >
      <View className='flex-1'>
        <View className='items-center mb-10'>
          {/* <Image
            className='w-40 h-40 rounded-full object-cover mb-2'
            source={require("../assets/images/user.png")}
          /> */}
          <Image
            className='w-40 h-40 rounded-full bg-gray-100'
            resizeMode='cover'
            source={img ? { uri: img } : require("../assets/images/user1.png")}
            style={{ width: 200, height: 200 }}
          />
          <Text className='font-bold text-lg'>{user?.fullName}</Text>
          <Text className='font-medium'>{user?.email}</Text>
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
