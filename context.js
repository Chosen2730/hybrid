import { createContext, useContext, useEffect, useState } from "react";
import { baseURL, config } from "./utils/constants";
import axios from "axios";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});
  const [user, setUser] = useState({});
  const keyboardVerticalOffset = Platform.OS === "ios" ? 50 : -200;

  const getCategories = async () => {
    const url = `${baseURL}/category`;
    setIsLoading(true);
    try {
      const res = await axios.get(url, await config());
      setIsLoading(false);
      setCategories(res.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const getCategory = async (id) => {
    const url = `${baseURL}/category/${id}`;
    setIsLoading(true);
    try {
      const res = await axios.get(url, await config());
      setIsLoading(false);
      setCategory(res.data);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const completeTask = async (item) => {
    const url = `${baseURL}/task/${item?._id}`;
    setIsLoading(true);
    try {
      await axios.patch(url, { isCompleted: true }, await config());
      await Alert.alert("Task updated");
      getCategory(item?.categoryID);
      getCategories();
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const completedTasks = category?.tasks?.filter(
    (task) => task.isCompleted === true
  );

  const unCompletedTasks = category?.tasks?.filter(
    (task) => task.isCompleted !== true
  );

  const getUser = async () => {
    try {
      const currentUser = await AsyncStorage.getItem("user");
      if (currentUser !== null) {
        return JSON.parse(currentUser);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const getUserProfile = async () => {
    let currentUser = await getUser();
    const id = currentUser.user_id;
    const url = `${baseURL}/user/${id}`;
    setIsLoading(true);
    try {
      const res = await axios.get(url, await config());
      setIsLoading(false);
      const jsonValue = JSON.stringify(res.data);
      await AsyncStorage.removeItem("user");
      await AsyncStorage.setItem("user", jsonValue);
      currentUser = await getUser();
      setUser(currentUser);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const editProfileDetails = async (data) => {
    setIsLoading(true);
    const userInputs = data.userInputs || {};
    const id = userInputs.user_id;
    const url = `${baseURL}/user/${id}`;
    const { fullName, tel, backupEmail } = userInputs;
    let formInput = new FormData();
    formInput.append("fullName", fullName);
    formInput.append("tel", tel);
    formInput.append("backupEmail", backupEmail);
    if (data.image) {
      formInput.append("image", {
        uri: data.image.uri,
        type: "image/jpeg",
        name: "profile-img",
      });
    }
    try {
      const res = await axios.patch(url, formInput, await config());
      setIsLoading(false);
      // console.log(res.data.updatedUser)
      Alert.alert(res.data.msg);
      getUserProfile();
    } catch (error) {
      Alert.alert(error.response?.data?.msg);
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <AppContext.Provider
      value={{
        getCategories,
        categories,
        isLoading,
        setIsLoading,
        category,
        getCategory,
        completeTask,
        completedTasks,
        unCompletedTasks,
        getUserProfile,
        user,
        editProfileDetails,
        keyboardVerticalOffset,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
