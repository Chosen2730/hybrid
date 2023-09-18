import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TextInput } from "react-native-gesture-handler";

const NewCategory = ({ navigation }) => {
  const colors = [
    "#FF916A",
    "#59ADFF",
    "#D2FF9A",
    "#6AFFF6",
    "#FFBB6A",
    "#092794",
    "#2FFF44",
    "#FB3EFF",
  ];
  return (
    <SafeAreaView className='p-4 flex-1'>
      <View className='flex-row items-center gap-3'>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          className='bg-black rounded-full p-2 w-10 h-10 items-center justify-center'
        >
          <Ionicons name='arrow-back' size={20} color='white' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold'>New Category</Text>
      </View>
      <TextInput
        className='bg-gray-200 p-4 rounded-md text-gray-900 my-10'
        placeholder='Input title here'
      />
      <FlatList
        data={colors}
        numColumns={6} // Adjust this number for the desired number of columns
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View
            className='w-12 h-12 rounded-full'
            style={{
              backgroundColor: item,
              margin: 8, // Adjust this margin for the desired spacing
            }}
          />
        )}
      />
      <TouchableOpacity
        className='bg-[#424874] p-4 rounded-md my-10 items-center flex-row justify-center'
        onPress={() => navigation.navigate("New Category")}
      >
        <Text className='text-white font-bold text-center'>Add Category</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NewCategory;
