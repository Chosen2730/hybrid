import { createContext, useContext, useState } from "react";
import { baseURL, config } from "./utils/constants";
import axios from "axios";
import { Alert } from "react-native";
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({});

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
