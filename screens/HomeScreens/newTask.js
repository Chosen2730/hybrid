import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { DateTimePick } from "../../utils/datePickAndroid";
import { DateTimePickIOS } from "../../utils/datePickerIOS";
import { baseURL, config } from "../../utils/constants";
import axios from "axios";
import { useGlobalContext } from "../../context";

const NewTask = ({ route, navigation }) => {
  const {
    isLoading,
    setIsLoading,
    getCategory,
    getCategories,
    keyboardVerticalOffset,
  } = useGlobalContext();
  const [taskInputs, setTaskInputs] = useState({});
  const [date, setDate] = useState(new Date());

  const { category } = route.params;

  const createTask = async () => {
    const url = `${baseURL}/task`;
    const { title, description } = taskInputs || {};
    if (!title || title?.length < 1) {
      Alert.alert("Title field is required");
    } else {
      setIsLoading(true);
      try {
        await axios.post(
          url,
          { title, description, date, time: date, categoryID: category?._id },
          await config()
        );
        setIsLoading(false);
        Alert.alert(
          "Success!",
          "New Task created successfully",
          [
            {
              text: "Ok",
              onPress: async () => {
                await getCategory(category?._id);
                getCategories();
                navigation.goBack();
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        Alert.alert("Ooops!", error.response.data.msg || "an error occurred");
      }
    }
  };

  return (
    <SafeAreaView className='p-4 flex-1'>
      <ScrollView>
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View className=''>
            <View className='flex-row items-center gap-3'>
              <TouchableOpacity
                onPress={() => navigation.pop()}
                className='bg-black rounded-full p-2 w-10 h-10 items-center justify-center'
              >
                <Ionicons name='arrow-back' size={20} color='white' />
              </TouchableOpacity>
              <Text className='text-2xl font-bold'>New Task</Text>
            </View>
            <TextInput
              className='bg-gray-200 p-4 rounded-md text-gray-900 my-10'
              placeholder='Write a new task'
              val={taskInputs?.title || ""}
              onChangeText={(val) =>
                setTaskInputs({ ...taskInputs, title: val })
              }
            />
            <View className='bg-gray-200 p-4'>
              <View className='justify-between flex-row items-center'>
                <Text>Category</Text>
                <Text className='bg-gray-100 p-3 rounded-md w-[100px]'>
                  {category?.title}
                </Text>
              </View>
              <View className='justify-between flex-row items-center my-4'>
                <Text>Select Date</Text>
                {Platform.OS === "android" ? (
                  <DateTimePick date={date} setDate={setDate} mode='date' />
                ) : (
                  <DateTimePickIOS date={date} setDate={setDate} mode='date' />
                )}
              </View>
              <View className='justify-between flex-row items-center'>
                <Text>Select Time</Text>
                {Platform.OS === "android" ? (
                  <DateTimePick date={date} setDate={setDate} mode='time' />
                ) : (
                  <DateTimePickIOS date={date} setDate={setDate} mode='time' />
                )}
              </View>
            </View>
            <Text className='my-5'>Optional Description</Text>
            <TextInput
              multiline={true}
              numberOfLines={10}
              placeholder='write a note'
              className='bg-gray-200 h-32 rounded-md p-4'
              val={taskInputs?.description || ""}
              onChangeText={(val) =>
                setTaskInputs({ ...taskInputs, description: val })
              }
            />
          </View>

          <TouchableOpacity
            className='bg-[#424874] p-4 rounded-md my-5 items-center flex-row justify-center'
            onPress={createTask}
            disabled={isLoading}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text className='text-white font-bold text-center'>Add Task</Text>
            )}
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default NewTask;
{
  /* <SelectDropdown
                data={allCategories}
                buttonStyle={{ borderRadius: 10, width: 100 }}
                onSelect={(selectedItem, index) => {
                  // console.log(selectedItem, index);
                }}
                buttonTextAfterSelection={(selectedItem, index) => {
                  return selectedItem;
                }}
                rowTextForSelection={(item, index) => {
                  return item;
                }}
              /> */
}
