import AsyncStorage from "@react-native-async-storage/async-storage";

export const baseURL = "https://hybrid-backend.vercel.app/api/v1";
// export const baseURL = "http://localhost:3000/api/v1";

const getToken = async () => {
  try {
    const value = await AsyncStorage.getItem("token");
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

export const config = async () => {
  const token = await getToken();
  return {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  };
};
