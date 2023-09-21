import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import CircularProgress from "react-native-circular-progress-indicator";
import { Ionicons } from "@expo/vector-icons";

const HomeScreen = ({ navigation }) => {
  const categories = [
    { color: "orange", title: "General", tasks: "10", completed: "5" },
    { color: "blue", title: "Shopping", tasks: "6", completed: "2" },
    { color: "#D2FF9A", title: "Trips", tasks: "9", completed: "4" },
  ];
  return (
    <View className='px-4 flex-1 pt-8 bg-white'>
      <FlatList
        data={categories}
        className='flex-1'
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Category")}
            style={[
              {
                borderColor: item.color,
              },
              {
                shadowColor: "#171717",
                shadowOffset: { width: -2, height: 4 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
                elevation: 5,
              },
            ]}
            className={`p-6 border-l-4 mb-5 rounded-md bg-gray-50 flex-row items-center justify-between`}
          >
            <View>
              <Text className='text-lg text-gray-700 font-bold'>
                {item.title}
              </Text>
              <Text className='text-gray-400'>
                {item.completed}/{item.tasks} tasks
              </Text>
            </View>
            <CircularProgress
              value={(Number(item.completed) / Number(item.tasks)) * 100}
              inActiveStrokeColor={"gray"}
              inActiveStrokeOpacity={0.2}
              progressValueColor={"black"}
              activeStrokeColor={item.color}
              radius={40}
              valueSuffix={"%"}
            />
            {/* <Text>Circular bar</Text> */}
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity
        className='bg-[#424874] p-4 rounded-md my-10 items-center flex-row justify-center'
        onPress={() => navigation.navigate("New Category")}
      >
        <Ionicons name='add' size={24} color='white' />
        <Text className='text-white font-bold text-center'>
          Create new Category
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
