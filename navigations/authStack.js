import React from "react";
import Onboarding from "../screens/AuthScreens/onboarding";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import CreateAccount from "../screens/AuthScreens/createAccount";
import Login from "../screens/AuthScreens/login";
import { LogBox } from "react-native";
LogBox.ignoreLogs(["Sending..."]);
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Onboard"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Onboard' component={Onboarding} />
      <Stack.Screen name='Create Account' component={CreateAccount} />
      <Stack.Screen name='Login' component={Login} />
    </Stack.Navigator>
  );
};

export default AuthStack;
