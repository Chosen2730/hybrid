import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { ScrollView, TextInput } from "react-native-gesture-handler";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { baseURL } from "../../utils/constants";
import axios from "axios";
import { useGlobalContext } from "../../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CreateAccount = () => {
  const navigation = useNavigation();
  const [isPasswordSecure, setIsPasswordSecure] = useState(true);
  const [userDetails, setUserDetails] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { keyboardVerticalOffset } = useGlobalContext();

  const signUpHandler = async () => {
    const url = `${baseURL}/user/signup`;
    const { email, password, fullName, tel, confirmPassword } = userDetails;
    if (!fullName || fullName.length < 1) {
      Alert.alert("Error!", "Fullname field is required");
    } else if (!email || email.length < 1) {
      Alert.alert("Error!", "email field is required");
    } else if (!tel || tel.length < 1) {
      Alert.alert("Error!", "Phone number field is required");
    } else if (!password || password.length < 1) {
      Alert.alert("Error!", "Password field is required");
    } else if (!confirmPassword || confirmPassword.length < 1) {
      Alert.alert("Error!", "Confirm password field is required");
    } else {
      setIsLoading(true);
      try {
        const res = await axios.post(url, userDetails);
        setIsLoading(false);
        Alert.alert(
          "Success!!",
          "Your account has been successfully created, Login to Continue",
          [{ text: "Ok", onPress: () => navigation.navigate("Login") }],
          { cancelable: false }
        );
        setUserDetails({});
      } catch (error) {
        Alert.alert(
          "Ooops!",
          error.response?.data?.msg ||
            "An error occured, check your internet connection and try again"
        );
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");

        if (value !== null) {
          navigation.navigate("Home Screen");
        }
      } catch (e) {
        console.log(e);
      }
    };

    getToken();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        <KeyboardAvoidingView
          behavior='position'
          keyboardVerticalOffset={keyboardVerticalOffset}
        >
          <View className='mt-10 p-5 items-center'>
            <Text className='font-bold text-3xl'>Create New Accounts</Text>
            <Text className='text-gray-500 my-3'>
              Please fill in the form to sign up
            </Text>

            <View className='w-full my-10 space-y-3'>
              <TextInput
                className='bg-gray-200 p-4 rounded-md text-gray-900'
                placeholder='Full Name'
                keyboardType='name-phone-pad'
                value={userDetails?.fullName || ""}
                onChangeText={(val) =>
                  setUserDetails({ ...userDetails, fullName: val })
                }
              />
              <TextInput
                className='bg-gray-200 p-4 rounded-md text-gray-900'
                placeholder='Email Address'
                keyboardType='email-address'
                value={userDetails?.email || ""}
                onChangeText={(val) =>
                  setUserDetails({ ...userDetails, email: val })
                }
              />
              <TextInput
                className='bg-gray-200 p-4 rounded-md text-gray-900'
                placeholder='Phone Number'
                keyboardType='phone-pad'
                value={userDetails?.tel || ""}
                onChangeText={(val) =>
                  setUserDetails({ ...userDetails, tel: val })
                }
              />
              <View>
                <TextInput
                  className='bg-gray-200 p-4 rounded-md text-gray-900 relative'
                  placeholder='Password'
                  secureTextEntry={isPasswordSecure}
                  value={userDetails?.password || ""}
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
              <View>
                <TextInput
                  className='bg-gray-200 p-4 rounded-md text-gray-900 relative'
                  placeholder='Confirm Password'
                  secureTextEntry={isPasswordSecure}
                  value={userDetails?.confirmPassword || ""}
                  onChangeText={(val) =>
                    setUserDetails({ ...userDetails, confirmPassword: val })
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
            </View>
            <View className='items-center w-full'>
              <TouchableOpacity
                onPress={signUpHandler}
                className='bg-[#424874] p-4 rounded-md w-full mb-4'
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator />
                ) : (
                  <Text className='text-white font-bold text-center'>
                    Sign Up
                  </Text>
                )}
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
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateAccount;
