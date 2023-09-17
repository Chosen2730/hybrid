import { store } from "./Redux/store";
import { Provider } from "react-redux";
import AuthStack from "./navigations/authStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AuthStack />
      </NavigationContainer>
    </Provider>
  );
}
