import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, TextInput } from "react-native-gesture-handler";
import { baseURL, config } from "../../utils/constants";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const NewCategory = () => {
  const navigation = useNavigation();
  const [colorsLoading, setColorsLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [colors, setColors] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [title, setTitle] = useState("");

  const getColors = async () => {
    const url = `${baseURL}/category/colors`;
    setColorsLoading(true);
    try {
      const res = await axios.get(url, await config());
      setColors(res.data);
      setColorsLoading(false);
    } catch (error) {
      setColorsLoading(false);
      console.error(error);
    }
  };

  useEffect(() => {
    getColors();
  }, []);

  console.log(selectedIndex);

  const createCategory = async () => {
    const url = `${baseURL}/category`;
    if (title.length < 1) {
      Alert.alert("Title field is required");
    } else {
      setIsLoading(true);
      try {
        await axios.post(
          url,
          { title, color: colors[selectedIndex] },
          await config()
        );
        setIsLoading(false);
        Alert.alert(
          "Success!",
          "New Category created successfully",
          [
            {
              text: "Ok",
              onPress: () => {
                navigation.goBack();
              },
            },
          ],
          { cancelable: false }
        );
      } catch (error) {
        console.error(error);
        setIsLoading(false);
        Alert.alert("Ooops!", error.response.data.msg || "an error occurred");
      }
    }
  };

  return (
    <SafeAreaView className='p-4 flex-1'>
      <View className='flex-row items-center gap-3'>
        <TouchableOpacity
          onPress={() => navigation.pop()}
          className='bg-black rounded-full p-2 w-10 h-10 items-center justify-center'
        >
          <Ionicons name='arrow-back' size={20} color='white' />
        </TouchableOpacity>
        <Text className='text-2xl font-bold'>New Category</Text>
      </View>
      <TextInput
        className='bg-gray-200 p-4 rounded-md text-gray-900 my-10'
        placeholder='Input title here'
        value={title}
        onChangeText={(val) => setTitle(val)}
      />
      {colorsLoading ? (
        <View>
          <ActivityIndicator />
        </View>
      ) : (
        <FlatList
          data={colors}
          numColumns={6} // Adjust this number for the desired number of columns
          keyExtractor={(item) => item}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              className={`w-12 h-12 rounded-full ${
                selectedIndex === index && "border-4 border-gray-500"
              }`}
              onPress={() => setSelectedIndex(index)}
              style={{
                backgroundColor: item,
                margin: 8, // Adjust this margin for the desired spacing
              }}
            />
          )}
        />
      )}

      <TouchableOpacity
        className='bg-[#424874] p-4 rounded-md my-10 items-center flex-row justify-center'
        onPress={createCategory}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <Text className='text-white font-bold text-center'>Add Category</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default NewCategory;
