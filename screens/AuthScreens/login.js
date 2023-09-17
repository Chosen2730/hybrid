import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const Login = ({ navigation }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  return (
    <SafeAreaView>
      <View className='mt-10 justify-center p-5 items-center'>
        <Text className='font-bold text-3xl'>Welcome Back</Text>
        <Text className='text-gray-500 my-3'>
          Please sign in to sync your account
        </Text>

        <View className='w-full my-10 space-y-3'>
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
          <Text className='text-gray-500 text-sm text-center'>
            Forgot password?
          </Text>
        </View>
        <View className='items-center w-full'>
          <TouchableOpacity className='bg-[#424874] p-4 rounded-md w-full mb-4'>
            <Text className='text-white font-bold text-center'>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity className='flex-row border w-full p-3 items-center justify-center rounded-md border-[#424874] space-x-2'>
            <Image source={require("../../assets/images/google.png")} />
            <Text>Login With Google</Text>
          </TouchableOpacity>
        </View>
        <View className='mt-5 flex-row'>
          <Text>Don't have an account? </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("Create Account")}
          >
            <Text className='underline italic'>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Login;
