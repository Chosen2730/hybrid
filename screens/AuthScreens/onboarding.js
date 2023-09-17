import { View, Text, Image, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import Carousel from "react-native-reanimated-carousel";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const Onboarding = () => {
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
    setActiveSlide((crr) => {
      if (crr > splash.length - 1) {
        return 0;
      } else return activeSlide + 1;
    });
  };

  useEffect(() => {
    slider.current.next({ animated: true });
  }, [activeSlide]);

  return (
    <SafeAreaView>
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
          // onScrollEnd={() => console.log("ended")}
          // onSnapToItem={(index) => setActiveSlide(index)}
          renderItem={({ index, item }) => {
            return (
              <View className='p-3 flex-1'>
                <View className='items-center flex-1 justify-center'>
                  <Image source={item.img} />
                  <Text className='font-bold text-2xl text-center my-4'>
                    {item.header}
                  </Text>
                  <Text className='text-center text-lg'>{item.content}</Text>
                  <TouchableOpacity
                    className='bg-[#424874] p-3 px-20 rounded-md my-5'
                    onPress={nextSlide}
                  >
                    <Text className='text-white font-bold'>Next</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    className='flex-row items-center gap-1'
                    onPress={nextSlide}
                  >
                    <Text className=''>Skip</Text>
                    <Ionicons
                      name='ios-arrow-forward'
                      size={18}
                      color='black'
                    />
                  </TouchableOpacity>
                </View>
                <View className='flex-row justify-between items-center'>
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
    </SafeAreaView>
  );
};

export default Onboarding;
