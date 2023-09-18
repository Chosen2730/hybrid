import { View, Text, Image, Dimensions, StyleSheet } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";

const Onboarding = ({ navigation }) => {
  const [activeSlide, setActiveSlide] = useState(0);
  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;
  const slider = useRef(null);

  const splash = [
    {
      img: require("../../assets/images/splash1.png"),
      header: "Welcome to Hybrid",
      content:
        "An easy way to help complete your todo list, Keep track of your progress.",
    },
    {
      img: require("../../assets/images/splash2.png"),
      header: "Track your Progress",
      content: "Keep track of your progress as you complete a task",
    },
    {
      img: require("../../assets/images/splash3.png"),
      header: "Cloud Storage",
      content: "Access your lists anytime anywhere",
    },
  ];

  const nextSlide = () => {
    if (activeSlide === splash.length - 1) {
      navigation.navigate("Create Account");
    }
    setActiveSlide((crr) => {
      if (crr > splash.length - 1) {
        return 0;
      } else return activeSlide + 1;
    });
    slider.current.next({ animated: true });
  };

  return (
    <View style={{ flex: 1 }}>
      <Carousel
        ref={slider}
        loop={false}
        width={width}
        height={height}
        autoPlay={false}
        data={splash}
        pagingEnabled
        scrollAnimationDuration={1000}
        // onScrollEnd={() => }
        onSnapToItem={(index) => setActiveSlide(index)}
        renderItem={({ item }) => {
          return (
            <View className='p-3 flex-1'>
              <View className='items-center flex-1 justify-center w-full'>
                <Image style={styles.image} className={``} source={item.img} />
                <Text className='font-bold text-2xl text-center my-4'>
                  {item.header}
                </Text>
                <Text className='text-center text-lg'>{item.content}</Text>
                <View className='w-full my-5'>
                  <TouchableOpacity
                    className='bg-[#424874] p-4 px-20  rounded-md w-full'
                    onPress={nextSlide}
                  >
                    <Text className='text-white text-center font-bold'>
                      Next
                    </Text>
                  </TouchableOpacity>
                </View>

                <TouchableOpacity
                  className='flex-row items-center gap-1'
                  onPress={() => navigation.navigate("Create Account")}
                >
                  <Text className=''>Skip</Text>
                  <Ionicons name='ios-arrow-forward' size={18} color='black' />
                </TouchableOpacity>
              </View>
              <View className='py-10'>
                <View className='flex-1 justify-center flex-row gap-2'>
                  {splash.map((item, ind) => (
                    <View
                      key={ind}
                      className={`w-2 h-2 ${
                        activeSlide === ind ? "bg-[#424874]" : "bg-gray-200"
                      } rounded-full`}
                    />
                  ))}
                </View>
              </View>
            </View>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  image: {
    width: 0.8 * Dimensions.get("window").width,
    height: 0.8 * Dimensions.get("window").width,
    resizeMode: "contain",
  },
});
export default Onboarding;
