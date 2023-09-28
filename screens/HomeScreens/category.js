import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import ProgressBar from "react-native-progress-bar-horizontal";
import { FlatList } from "react-native-gesture-handler";
import SingleTask from "../../components/singleTask";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useGlobalContext } from "../../context";

const Category = ({ route, navigation }) => {
  const Tab = createMaterialTopTabNavigator();
  const { getCategory, isLoading, category, completedTasks, unCompletedTasks } =
    useGlobalContext();

  const [progress, setProgress] = useState(0);
  const { item } = route.params;
  const id = item._id;

  useEffect(() => {
    getCategory(id);
  }, []);

  useEffect(() => {
    if (category.tasks?.length > 0) {
      const p =
        Number(completedTasks?.length) / Number(category?.tasks?.length);
      setProgress(p);
    }
  }, [category]);

  const CompletedTask = () => {
    return (
      <View className='flex-1 p-5'>
        {completedTasks?.length < 1 ? (
          <View className='items-center justify-center flex-1'>
            <Image source={require("../../assets/images/notask2.png")} />
          </View>
        ) : (
          <FlatList
            data={completedTasks}
            renderItem={({ item }) => (
              <SingleTask
                getCategory={getCategory}
                navigation={navigation}
                item={item}
              />
            )}
          />
        )}
      </View>
    );
  };

  const NewTask = () => {
    return (
      <View className='flex-1 p-5'>
        {unCompletedTasks?.length < 1 ? (
          <View className='items-center justify-center flex-1'>
            <Image source={require("../../assets/images/notask.png")} />
          </View>
        ) : (
          <FlatList
            data={unCompletedTasks}
            renderItem={({ item }) => (
              <SingleTask navigation={navigation} item={item} />
            )}
          />
        )}
      </View>
    );
  };

  if (isLoading) {
    return (
      <View className='items-center bg-gray-700 flex-1 justify-center'>
        <ActivityIndicator size={20} />
      </View>
    );
  }

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
            <Text className='text-3xl font-bold text-white'>
              {category?.title}
            </Text>
          </View>
        </View>
        <View className='flex-row items-center justify-between mb-2 mt-4'>
          <Text className='text-white'>Your Progress</Text>
          <Text className='text-white'>
            {completedTasks?.length}/{category?.tasks?.length} tasks
          </Text>
        </View>
        <ProgressBar
          progress={progress}
          borderWidth={1}
          fillColor={category?.color}
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
          onPress={() => navigation.navigate("New Task", { category })}
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
