import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const ViewTask = ({ navigation }) => {
  return (
    <SafeAreaView className='p-4 flex-1'>
      <View className='flex-row items-center gap-3'>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          className='bg-black rounded-full p-2 w-10 h-10 items-center justify-center'
        >
          <Ionicons name='arrow-back' size={20} color='white' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold'>View Task</Text>
      </View>

      <View className='flex-1 my-5'>
        <View>
          <Text className='text-lg font-bold'>Task</Text>
          <Text className=''>Design a website</Text>
        </View>
        <View className='my-5'>
          <Text className='text-lg font-bold mb-1'>Details</Text>
          <Text>Category: General</Text>
          <Text className='my-1'>Date: 27th May</Text>
          <Text>Time: 2pm</Text>
        </View>
        <View className=''>
          <Text className='text-lg font-bold mb-1'>Description</Text>
          <Text className=''>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia
            repudiandae veritatis, quibusdam voluptas doloremque tenetur quaerat
            dicta accusamus ipsam qui.
          </Text>
        </View>
        <TouchableOpacity
          className='my-5'
          onPress={() => navigation.navigate("New Task")}
        >
          <Text className='text-center text-blue-500'>Edit Task</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        className='bg-[#424874] p-4 rounded-md my-5 items-center flex-row justify-center'
        onPress={() => navigation.navigate("Categories")}
      >
        <Text className='text-white font-bold text-center'>
          Mark as Completed
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ViewTask;
