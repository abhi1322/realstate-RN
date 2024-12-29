import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import images from "@/constants/images";
import icons from "@/constants/icons";

const SignIn = () => {
  const handleLogin = () => {};

  return (
    <SafeAreaView className="bg-white">
      <ScrollView contentContainerClassName="h-full">
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        <View className="px-10 -mt-5">
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to ReState
          </Text>
          <Text className="text-3xl text-center font-rubik-bold text-black-300 mt-2">
            Let's Get You closer to {"\n"}
            <Text className="text-primary-300">Your Ideal Home</Text>
          </Text>
          <Text className="text-lg font-rubik text-black-200 text-center mt-8 ">
            Login to ReState with Google
          </Text>
          <TouchableOpacity
            onPress={handleLogin}
            className="flwx flex-row items-center justify-center gap-5 bg-white  border border-black-100/20 rounded-full w-full py-4 mt-5 active:bg-neutral-200"
          >
            <Image
              source={icons.google}
              className="w-5 h-5"
              resizeMode="contain"
            />
            <Text className="text-black-200 font-rubik-medium">
              Continue with Google
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
