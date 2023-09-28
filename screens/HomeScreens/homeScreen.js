import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";

import { FlatList, Swipeable } from "react-native-gesture-handler";
import CircularProgress from "react-native-circular-progress-indicator";
import { Ionicons } from "@expo/vector-icons";
import { baseURL, config } from "../../utils/constants";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { useGlobalContext } from "../../context";
// import * as Notifications from "expo-notifications";

const HomeScreen = () => {
  // const getPermissions = async () => {
  //   const { status } = await Notifications.requestPermissionsAsync();
  //   if (status !== "granted") {
  //     alert("You need to enable permissions in order to receive notifications");
  //     return;
  //   }
  // };
  // useEffect(() => {
  //   getPermissions();
  // }, []);

  const navigation = useNavigation();
  const { getCategories, isLoading, setIsLoading, categories } =
    useGlobalContext();

  const renderRightActions = (item) => {
    return (
      <TouchableOpacity
        onPress={() => deleteCategory(item?._id)}
        className='bg-red-600 mb-4 items-center justify-center px-6 flex-row rounded-r-md'
      >
        <Text className='text-white'>Delete</Text>
        <AntDesign name='delete' size={24} color='white' />
      </TouchableOpacity>
    );
  };

  const deleteCategory = async (id) => {
    const url = `${baseURL}/category/${id}`;
    setIsLoading(true);
    try {
      await axios.delete(url, await config());
      getCategories();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View className='px-4 flex-1 pt-8 bg-white'>
      {isLoading ? (
        <ActivityIndicator className='flex-1' />
      ) : categories.length < 1 ? (
        <View className='flex-1 items-center justify-center'>
          <Image source={require("../../assets/images/category.jpeg")} />
        </View>
      ) : (
        <FlatList
          data={categories}
          className='flex-1'
          renderItem={({ item }) => {
            const { tasks } = item;
            const completed = tasks.filter(
              (task) => task.isCompleted === true
            ).length;

            return (
              <Swipeable
                overshootRight={true}
                overshootLeft={false}
                onSwipeableWillOpen={() => {}}
                renderRightActions={() => renderRightActions(item)}
                // renderLeftActions={renderLeftActions}
              >
                <TouchableOpacity
                  onPress={() => navigation.navigate("Category", { item })}
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
                    {tasks.length > 0 ? (
                      <Text className='text-gray-400'>
                        {completed}/{tasks.length} tasks completed
                      </Text>
                    ) : (
                      <Text className='text-gray-400'>No task added</Text>
                    )}
                  </View>
                  <CircularProgress
                    value={
                      tasks.length > 0 &&
                      (Number(completed) / Number(tasks.length)) * 100
                    }
                    inActiveStrokeColor={"gray"}
                    inActiveStrokeOpacity={0.2}
                    progressValueColor={"black"}
                    activeStrokeColor={item.color}
                    radius={40}
                    valueSuffix={"%"}
                  />
                  {/* <Text>Circular bar</Text> */}
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
      )}

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
