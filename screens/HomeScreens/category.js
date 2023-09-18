import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "react-native-progress-bar-horizontal";
import { FlatList } from "react-native-gesture-handler";
import SingleTask from "../../components/singleTask";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

const Category = ({ navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const tasks = [
    { title: "Design a Website", time: "2.00pm", date: "27th May" },
    { title: "Walk the dog", time: "5:30pm", date: "23rd May" },
    { title: "Meet with Jelite", time: "2.00pm", date: "27th May" },
    { title: "Design a Website", time: "2.00pm", date: "27th May" },
    { title: "Walk the dog", time: "5:30pm", date: "23rd May" },
    { title: "Meet with Jelite", time: "2.00pm", date: "27th May" },
    { title: "Design a Website", time: "2.00pm", date: "27th May" },
    { title: "Walk the dog", time: "5:30pm", date: "23rd May" },
    { title: "Meet with Jelite", time: "2.00pm", date: "27th May" },
    { title: "Design a Website", time: "2.00pm", date: "27th May" },
    { title: "Walk the dog", time: "5:30pm", date: "23rd May" },
    { title: "Meet with Jelite", time: "2.00pm", date: "27th May" },
  ];
  const completed = [
    { title: "Brush my teeth", time: "2.00pm", isComplete: true },
    { title: "Train for Kungfu", time: "5:30pm", isComplete: true },
    { title: "Call LOML", time: "2.00pm", isComplete: true },
  ];
  const CompletedTask = () => {
    return (
      <View className='flex-1 p-5'>
        <FlatList
          data={completed}
          renderItem={({ item }) => <SingleTask item={item} />}
        />
      </View>
    );
  };

  const NewTask = () => {
    return (
      <View className='flex-1 p-5'>
        <FlatList
          data={tasks}
          renderItem={({ item }) => <SingleTask item={item} />}
        />
      </View>
    );
  };
  return (
    <View className='flex-1'>
      <View className='p-4 pt-16 bg-[#424874]'>
        <View className='flex-row items-center gap-3'>
          <TouchableOpacity
            onPress={() => navigation.pop()}
            className='bg-black rounded-full p-2 w-10 h-10 items-center justify-center'
          >
            <Ionicons name='arrow-back' size={20} color='white' />
          </TouchableOpacity>
          <View>
            <Text className='text-3xl font-bold text-white'>General</Text>
          </View>
        </View>
        <View className='flex-row items-center justify-between mb-2 mt-4'>
          <Text className='text-white'>Your Progress</Text>
          <Text className='text-white'>3/7 tasks</Text>
        </View>
        <ProgressBar
          progress={0.5}
          borderWidth={1}
          fillColor='#FF916A'
          unfilledColor='gray'
          height={10}
          borderColor='#4C2C8E'
          duration={100}
        />
      </View>
      <Tab.Navigator>
        <Tab.Screen name='Tasks' component={NewTask} />
        <Tab.Screen name='Completed Tasks' component={CompletedTask} />
      </Tab.Navigator>

      <View className='p-5'>
        <TouchableOpacity
          className='bg-[#424874] p-4 rounded-md mb-5 items-center flex-row justify-center'
          onPress={() => navigation.navigate("New Category")}
        >
          <Ionicons name='add' size={24} color='white' />
          <Text className='text-white font-bold text-center'>
            Create new Task
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Category;
