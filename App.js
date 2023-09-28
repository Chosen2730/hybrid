import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigations";
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { name as appName } from "./app.json";
import { AppProvider } from "./context";
import registerNNPushToken from "native-notify";

export default function App() {
  registerNNPushToken(12574, "wcaiW4dfXizu4qpPcROGku");
  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: "white",
    },
  };

  return (
    <Provider store={store}>
      <AppProvider>
        <NavigationContainer theme={MyTheme}>
          <AppStack />
        </NavigationContainer>
      </AppProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => App);
// eas build --profile preview --platform android
