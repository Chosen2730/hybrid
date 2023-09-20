import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigations";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
