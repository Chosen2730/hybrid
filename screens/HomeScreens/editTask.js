import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
// import SelectDropdown from "react-native-select-dropdown";
import { DateTimePick } from "../../utils/datePickAndroid";
import { DateTimePickIOS } from "../../utils/datePickerIOS";
import { baseURL, config } from "../../utils/constants";
import axios from "axios";
import { useGlobalContext } from "../../context";
import { useNavigation } from "@react-navigation/native";

const EditTask = ({ route }) => {
  const navigation = useNavigation();
  const { isLoading, setIsLoading } = useGlobalContext();
  const [taskInputs, setTaskInputs] = useState({});
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  const { item: category } = route.params || {};
  const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;

  useEffect(() => {
    setTaskInputs({
      ...taskInputs,
      description: category?.description,
      title: category?.title,
    });
    setDate(new Date(category?.date));
    setTime(new Date(category?.time));
  }, []);

  console.log(category);

  const updateTask = async () => {
    const url = `${baseURL}/task/${category?._id}`;
    const { title } = taskInputs || {};
    if (!title || title?.length < 1) {
      Alert.alert("Title field is required");
    } else {
      setIsLoading(true);
      try {
        const res = await axios.patch(
          url,
          { ...taskInputs, date, time },
          await config()
        );
        setIsLoading(false);
        Alert.alert(
          "Success!",
          "Task Updated Successfully",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: "Home Screen" }],
                });
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
            <Text className='text-2xl font-bold'>Edit Task</Text>
          </View>
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900 my-10'
            placeholder='Write a new task'
            value={taskInputs?.title || ""}
            onChangeText={(val) => setTaskInputs({ ...taskInputs, title: val })}
          />
          <View className='bg-gray-200 p-4'>
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
                <DateTimePick date={time} setDate={setTime} mode='time' />
              ) : (
                <DateTimePickIOS date={time} setDate={setTime} mode='time' />
              )}
            </View>
          </View>
          <Text className='my-5'>Optional Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder='write a note'
            className='bg-gray-200 h-32 rounded-md p-4'
            value={taskInputs?.description || ""}
            onChangeText={(val) =>
              setTaskInputs({ ...taskInputs, description: val })
            }
          />
        </View>

        <TouchableOpacity
          className='bg-[#424874] p-4 rounded-md my-5 items-center flex-row justify-center'
          onPress={updateTask}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator />
          ) : (
            <Text className='text-white font-bold text-center'>Submit</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditTask;
