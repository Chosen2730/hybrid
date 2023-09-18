import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SingleTask = ({ item }) => {
  const [isSelected, setSelection] = useState(false);
  useEffect(() => {
    if (item.isComplete) setSelection(true);
  });
  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate("Category")}
      style={[
        {
          shadowColor: "#171717",
          shadowOffset: { width: -2, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
          elevation: 5,
        },
      ]}
      className={`p-3 border-l-4 mb-5 rounded-md bg-gray-50 flex-row items-center justify-between border-gray-400`}
    >
      <View>
        <Text className='text-lg text-gray-700 font-bold'>{item.title}</Text>
        <View className='flex-row items-center space-x-4 mt-3'>
          {!item.isComplete && (
            <Text className='bg-[#A6B1E1] text-gray-100 rounded-md p-2 px-4'>
              {item.date}
            </Text>
          )}

          <Text className='bg-[#A6B1E1] text-gray-100 rounded-md p-2 px-4'>
            {item.time}
          </Text>
          {item.isComplete && (
            <TouchableOpacity className='bg-red-100 p-1 rounded-full'>
              <MaterialCommunityIcons
                name='delete-outline'
                size={24}
                color='rgb(153 27 27)'
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Checkbox value={isSelected} onValueChange={setSelection} />
    </TouchableOpacity>
  );
};

export default SingleTask;
