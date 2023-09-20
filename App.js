import { store } from "./Redux/store";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./navigations";
import "react-native-gesture-handler";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}

// Checkbox
// react-native-svg
// validate inputs
// date time picker
//
//  "react-native-svg": "13.9.0",
//  "react-native-date-picker": "^4.3.3",
// "@react-native-community/datetimepicker": "7.2.0",
// "expo-splash-screen": "~0.20.5"
//  "react-native-circular-progress-indicator": "^4.4.2",

// yarn add @babel/plugin-proposal-nullish-coalescing-operator @babel/plugin-proposal-optional-chaining@7.0.0 @babel/plugin-transform-arrow-functions@7.0.0-0 @babel/plugin-transform-shorthand-properties@7.0.0-0 @babel/plugin-transform-template-literals@7.0.0-0 @babel/preset-env@7.1.6 @babel/preset-env@7.1.6 expo-modules-autolinking@0.8.1

//  "@babel/plugin-proposal-nullish-coalescing-operator": "^7.18.6",
//   "@babel/plugin-proposal-optional-chaining": "7.0.0",
//   "@babel/plugin-transform-arrow-functions": "^7.0.0",
//   "@babel/plugin-transform-shorthand-properties": "^7.0.0",
//   "@babel/plugin-transform-template-literals": "^7.0.0",
//   "@babel/preset-env": "7.1.6",
