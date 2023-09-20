import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import AuthStack from "./authStack";
import HomeStack from "./homeStack";
LogBox.ignoreLogs(["Sending..."]);
const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash Screen' component={AuthStack} />
      <Stack.Screen name='Home Screen' component={HomeStack} />
    </Stack.Navigator>
  );
};

export default AppStack;
