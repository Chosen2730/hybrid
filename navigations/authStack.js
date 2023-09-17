import React from "react";
import Onboarding from "../screens/AuthScreens/onboarding";
import { SafeAreaView } from "react-native-safe-area-context";

const AuthStack = () => {
  return (
    <SafeAreaView>
      <Onboarding />
    </SafeAreaView>
  );
};

export default AuthStack;
