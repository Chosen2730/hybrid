import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CreateAccount = () => {
  const navigation = useNavigation();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  return (
    <SafeAreaView>
      <View className='mt-10 p-5 items-center'>
        <Text className='font-bold text-3xl'>Create New Account</Text>
        <Text className='text-gray-500 my-3'>
          Please fill in the form to sign up
        </Text>

        <View className='w-full my-10 space-y-3'>
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900'
            placeholder='Username'
            keyboardType='name-phone-pad'
          />
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900'
            placeholder='Email Address'
            keyboardType='email-address'
          />
          <View>
            <TextInput
              className='bg-gray-200 p-4 rounded-md text-gray-900 relative'
              placeholder='Password'
              secureTextEntry={isPasswordSecure}
            />
            <TouchableOpacity
              onPress={() => setIsPasswordSecure(!isPasswordSecure)}
              className='absolute top-3 right-4'
            >
              {!isPasswordSecure ? (
                <MaterialCommunityIcons
                  name='eye-off-outline'
                  size={24}
                  color='gray'
                />
              ) : (
                <MaterialCommunityIcons
                  name='eye-outline'
                  size={24}
                  color='gray'
                />
              )}
            </TouchableOpacity>
          </View>
        </View>
        <View className='items-center w-full'>
          <TouchableOpacity className='bg-[#424874] p-4 rounded-md w-full mb-4'>
            <Text className='text-white font-bold text-center'>Sign Up</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row border w-full p-3 items-center justify-center rounded-md border-[#424874] space-x-2'>
            <Image source={require("../../assets/images/google.png")} />
            <Text>Sign Up With Google</Text>
          </TouchableOpacity>
        </View>
        <View className='mt-5 flex-row'>
          <Text>Already have an account? </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.removeListener();
              navigation.navigate("Login");
            }}
          >
            <Text className='underline'>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CreateAccount;
