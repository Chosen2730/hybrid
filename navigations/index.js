import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import AuthStack from "./authStack";
import HomeStack from "./homeStack";
import AsyncStorage from "@react-native-async-storage/async-storage";
LogBox.ignoreLogs(["Sending..."]);
const Stack = createStackNavigator();

const AppStack = () => {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const getToken = async () => {
      try {
        const value = await AsyncStorage.getItem("token");
        if (value !== null) {
          setToken(value);
        }
      } catch (e) {
        console.log(e);
      }
    };
    getToken();
  });

  return (
    <Stack.Navigator initialRouteName='' screenOptions={{ headerShown: false }}>
      <Stack.Screen name='Splash Screen' component={AuthStack} />
      <Stack.Screen name='Home Screen' component={HomeStack} />
    </Stack.Navigator>
  );
};

export default AppStack;
