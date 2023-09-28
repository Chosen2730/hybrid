import {
  View,
  Text,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import Checkbox from "expo-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import dateFormat, { masks } from "dateformat";
import axios from "axios";
import { baseURL, config } from "../utils/constants";
import { useGlobalContext } from "../context";

const SingleTask = ({ item, navigation }) => {
  const { isLoading, setIsLoading, getCategory, getCategories, completeTask } =
    useGlobalContext();
  const [alertShown, setAlertShown] = useState(false);

  const [isSelected, setSelection] = useState(false);
  const today = dateFormat(item.date, "mmmm dS, yyyy");
  const time = dateFormat(item.time, "UTC:h:MM TT");
  const futureTime = new Date(item.date).getTime();

  // useEffect(() => {
  //   const oneHour = 60 * 60 * 1000; // One hour in milliseconds
  //   const dueTime = new Date(futureTime).getTime();
  //   const alertTime = dueTime - oneHour;
  //   const checkTime = () => {
  //     const now = Date.now();
  //     console.log(alertTime, now);
  //     if (now >= alertTime && !alertShown) {
  //       setAlertShown(true);
  //       alert("You have one hour left");
  //     }
  //   };

  //   const interval = setInterval(checkTime, 1000); // Check every second

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [futureTime, alertShown]);

  useEffect(() => {
    if (isSelected) {
      showAlert();
    }
  }, [isSelected]);
  const showAlert = () => {
    Alert.alert(
      "Complete Task",
      "Are you sure you have completed this task?",
      [
        { text: "No", onPress: () => {} },
        {
          text: "Yes",
          onPress: () => {
            completeTask(item);
          },
        },
      ],

      { cancelable: false }
    );
  };

  const deleteTask = async () => {
    const url = `${baseURL}/task/${item?._id}`;
    setIsLoading(true);
    try {
      const res = await axios.delete(url, await config());
      setIsLoading(false);
      getCategory(item?.categoryID);
      getCategories();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator />;
  }
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("View Task", { item })}
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
          {!item.isCompleted && (
            <Text className='bg-[#A6B1E1] text-gray-100 rounded-md p-2 px-4'>
              {today}
            </Text>
          )}

          <Text className='bg-[#A6B1E1] text-gray-100 rounded-md p-2 px-4'>
            {time}
          </Text>
        </View>
      </View>
      {!item.isCompleted ? (
        <Checkbox value={isSelected} onValueChange={setSelection} />
      ) : (
        <TouchableOpacity
          onPress={deleteTask}
          className='bg-red-100 p-1 rounded-full'
        >
          <MaterialCommunityIcons
            name='delete-outline'
            size={24}
            color='rgb(153 27 27)'
          />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

export default SingleTask;
