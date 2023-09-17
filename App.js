import { StyleSheet } from "react-native";
import { store } from "./Redux/store";
import { Provider } from "react-redux";
import HomeScreen from "./screens/homeScreen";

export default function App() {
  return (
    <Provider store={store}>
      <HomeScreen />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
