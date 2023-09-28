import React, { useState, useEffect } from "react";
import {
  Button,
  Image,
  View,
  Platform,
  Text,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export const ImageSelector = ({ img, image, setImage }) => {
  // const [dispImage, setDispImage] = useState("");
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);
    }
  };

  return (
    <View>
      <View className='items-center'>
        {!image && (
          <Image
            className='w-52 h-52 rounded-full'
            resizeMode='cover'
            source={img ? { uri: img } : require("../assets/images/user1.png")}
            style={{ width: 200, height: 200 }}
          />
        )}
        {image && (
          <Image
            className='w-52 h-52 rounded-full'
            source={{ uri: image.uri }}
            style={{ width: 200, height: 200 }}
          />
        )}
      </View>
      <TouchableOpacity
        className='bg-[#424874] p-3 rounded-md w-40 mx-auto my-3'
        onPress={pickImage}
      >
        <Text className='text-white text-center'>Change Picture</Text>
      </TouchableOpacity>
    </View>
  );
};
