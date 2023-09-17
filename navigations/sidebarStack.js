import React from "react";
import "react-native-gesture-handler";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../screens/HomeScreens/homeScreen";
import Profile from "../screens/SidebarScreens/profile";
import Help from "../screens/SidebarScreens/help";
import Faqs from "../screens/SidebarScreens/faqs";
import Rate from "../screens/SidebarScreens/rate";
import { getHeaderTitle } from "@react-navigation/elements";
import HomeHeader from "../components/homeHeader";
import DrawerContent from "../components/drawerContent";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

const SidebarStack = () => {
  const Drawer = createDrawerNavigator();
  const icons = ["home", "user", "question", "info", "staro"];
  return (
    <Drawer.Navigator
      screenOptions={{
        header: ({ navigation, route, options }) => {
          const title = getHeaderTitle(options, route.name);
          return <HomeHeader title={title} navigation={navigation} />;
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "gray",
        drawerActiveBackgroundColor: "#424874",
      }}
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <Drawer.Screen
        name='Home'
        component={HomeScreen}
        options={{
          headerTitle: "Categories",
          drawerIcon: ({ color }) => (
            <AntDesign name='home' size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Profile'
        component={Profile}
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name='user' size={24} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name='Help Center'
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name='questioncircleo' size={24} color={color} />
          ),
        }}
        component={Help}
      />
      <Drawer.Screen
        name='FAQS'
        options={{
          drawerIcon: ({ color }) => (
            <Feather name='info' size={24} color={color} />
          ),
        }}
        component={Faqs}
      />
      <Drawer.Screen
        name='Rate Us'
        options={{
          drawerIcon: ({ color }) => (
            <AntDesign name='staro' size={24} color={color} />
          ),
        }}
        component={Rate}
      />
    </Drawer.Navigator>
  );
};

export default SidebarStack;
