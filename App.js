import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigations";
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";

export default function App() {
  // const getColor = async () => {
  //   const color = await SystemUI.getBackgroundColorAsync();
  //   console.log(color);
  // };
  // getColor();

  // useEffect(() => {
  //   SystemUI.setBackgroundColorAsync("red");
  // }, []);

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <Provider store={store}>
      <NavigationContainer theme={MyTheme}>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
