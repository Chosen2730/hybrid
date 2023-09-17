import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import Category from "../screens/HomeScreens/category";
import NewCategory from "../screens/HomeScreens/newCategory";
import SidebarStack from "./sidebarStack";
LogBox.ignoreLogs(["Sending..."]);
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={"Home"}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name='Categories' component={SidebarStack} />
      <Stack.Screen name='Category' component={Category} />
      <Stack.Screen name='New Category' component={NewCategory} />
    </Stack.Navigator>
  );
};

export default HomeStack;
