import { store } from "./Redux/store";
import { Provider } from "react-redux";
import AuthStack from "./navigations/authStack";

export default function App() {
  return (
    <Provider store={store}>
      <AuthStack />
    </Provider>
  );
}
