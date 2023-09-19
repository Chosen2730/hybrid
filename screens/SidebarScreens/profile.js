import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ImageSelector } from "../../utils/imagePicker";

const Profile = ({ navigation }) => {
  const keyboardVerticalOffset = Platform.OS === "ios" ? 100 : 0;
  return (
    <KeyboardAvoidingView
      behavior='position'
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <View className='p-4'>
        <ImageSelector />
        <Text className='text-lg font-bold'>Profile Details</Text>
        <TextInput
          className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
          placeholder='Jones'
          value='Robinson Simon'
          keyboardType='name-phone-pad'
        />
        <TextInput
          className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
          placeholder='Jones'
          keyboardType='email-address'
          value='patiencesimoniseoluwa@gamil.com'
        />
        <TextInput
          className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
          placeholder='Jones'
          keyboardType='phone-pad'
          value='+2348132157321'
        />
        <TextInput
          className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
          placeholder='Enter Backup Email'
          keyboardType='email-address'
        />
        <TouchableOpacity
          className='bg-[#424874] p-4 rounded-md my-5 items-center flex-row justify-center'
          // onPress={() => navigation.navigate("Category")}
        >
          <Text className='text-white font-bold text-center'>Save Changes</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Profile;
