import {
  View,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import SelectDropdown from "react-native-select-dropdown";
// import { DateTimePick } from "../../utils/datePickAndroind";

const NewTask = ({ navigation }) => {
  const allCategories = ["General", "Trip", "Sport"];
  const keyboardVerticalOffset = Platform.OS === "ios" ? 20 : 0;
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
            <Text className='text-2xl font-bold'>New Task</Text>
          </View>
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900 my-10'
            placeholder='Write a new task'
          />
          <View className='bg-gray-200 p-4'>
            <View className='justify-between flex-row items-center'>
              <Text>Category</Text>
              <SelectDropdown
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
              />
            </View>
            <View className='justify-between flex-row items-center my-4'>
              <Text>Select Date</Text>
              {/* <DateTimePick mode='date' /> */}
            </View>
            <View className='justify-between flex-row items-center'>
              <Text>Select Time</Text>
              {/* <DateTimePick mode='time' /> */}
            </View>
          </View>
          <Text className='my-5'>Optional Description</Text>
          <TextInput
            multiline={true}
            numberOfLines={10}
            placeholder='write a note'
            className='bg-gray-200 h-32 rounded-md p-4'
          />
        </View>

        <TouchableOpacity
          className='bg-[#424874] p-4 rounded-md my-5 items-center flex-row justify-center'
          onPress={() => navigation.navigate("Category")}
        >
          <Text className='text-white font-bold text-center'>Add Task</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default NewTask;
