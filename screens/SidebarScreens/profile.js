import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ImageSelector } from "../../utils/imagePicker";
import { useGlobalContext } from "../../context";
import { ScrollView } from "react-native-gesture-handler";

const Profile = () => {
  const { user, editProfileDetails, isLoading, keyboardVerticalOffset } =
    useGlobalContext();
  const [userInputs, setUserInputs] = useState({});
  const [image, setImage] = useState(null);

  useEffect(() => {
    setUserInputs({ ...userInputs, ...user });
  }, []);

  const profileData = { userInputs, image };

  if (isLoading) {
    return (
      <View className='items-center flex-1 justify-center'>
        <ActivityIndicator size={60} />
      </View>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior='position'
        keyboardVerticalOffset={keyboardVerticalOffset}
      >
        <View className='p-4'>
          <ImageSelector
            image={image}
            setImage={setImage}
            img={userInputs?.profileImage}
          />
          <Text className='text-lg font-bold'>Profile Details</Text>
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
            placeholder='Jones'
            value={userInputs?.fullName || ""}
            onChangeText={(val) =>
              setUserInputs({ ...userInputs, fullName: val })
            }
            keyboardType='name-phone-pad'
          />
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
            placeholder='Jones'
            keyboardType='email-address'
            value={userInputs?.email || ""}
            editable={false}
          />
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
            placeholder='Jones'
            keyboardType='phone-pad'
            value={userInputs?.tel || ""}
            onChangeText={(val) => setUserInputs({ ...userInputs, tel: val })}
          />
          <TextInput
            className='bg-gray-200 p-4 rounded-md text-gray-900 my-2'
            placeholder='Enter Backup Email'
            keyboardType='email-address'
            value={userInputs?.backupEmail || ""}
            onChangeText={(val) =>
              setUserInputs({ ...userInputs, backupEmail: val })
            }
          />
          <TouchableOpacity
            className='bg-[#424874] p-4 rounded-md my-5 items-center flex-row justify-center'
            onPress={async () => {
              await editProfileDetails(profileData);
              setImage(null);
            }}
          >
            {isLoading ? (
              <ActivityIndicator />
            ) : (
              <Text className='text-white font-bold text-center'>
                Save Changes
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
};

export default Profile;
