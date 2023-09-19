import React from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";
import { LogBox } from "react-native";
import Category from "../screens/HomeScreens/category";
import NewCategory from "../screens/HomeScreens/newCategory";
import SidebarStack from "./sidebarStack";
import NewTask from "../screens/HomeScreens/newTask";
import ViewTask from "../screens/HomeScreens/viewTask";
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
      <Stack.Screen name='New Task' component={NewTask} />
      <Stack.Screen name='View Task' component={ViewTask} />
    </Stack.Navigator>
  );
};

export default HomeStack;
