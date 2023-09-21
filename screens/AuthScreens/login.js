import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import axios from "axios";
import { baseURL } from "../../utils/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = ({ navigation }) => {
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async () => {
    setIsLoading(true);
    const url = `${baseURL}/user/login`;
    try {
      const res = await axios.post(url, userDetails);
      await AsyncStorage.setItem("token", res.data.token);
      navigation.navigate("Home Screen");
      setIsLoading(false);
    } catch (error) {
      Alert.alert(error.response.data.msg);
      setIsLoading(false);
    }
  };
  const keyboardVerticalOffset = Platform.OS === "ios" ? 50 : -200;

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
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
                onChangeText={(val) =>
                  setUserDetails({ ...userDetails, email: val })
                }
              />
              <View>
                <TextInput
                  className='bg-gray-200 p-4 rounded-md text-gray-900 relative'
                  placeholder='Password'
                  secureTextEntry={isPasswordSecure}
                  onChangeText={(val) =>
                    setUserDetails({ ...userDetails, password: val })
                  }
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
              <TouchableOpacity
                className='bg-[#424874] p-4 rounded-md w-full mb-4'
                onPress={loginHandler}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className='text-white font-bold text-center'>
                    Login
                  </Text>
                )}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;
