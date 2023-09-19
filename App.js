import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigations";
import { AppRegistry } from "react-native";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
AppRegistry.registerComponent("main", () => App);
