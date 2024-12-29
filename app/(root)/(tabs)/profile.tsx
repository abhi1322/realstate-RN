import { View, Text, ScrollView, Image, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";

const Profile = () => {
  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-2xl font-rubik-bold">Profile </Text>
          <Image source={icons.bell} className="size-7" />
        </View>
        <View className="flex-row justify-center flex mt-5">
          <View className="flex-col flex items-center relative mt-5">
            <Image source={images.avatar} className="size-44" />
            <TouchableOpacity className="absolute bg-white rounded-xl p-2 bottom-10 -right-5">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>
            <Text className="text-xl  font-rubik-semibold mt-2">
              Abhishek kumar
            </Text>
          </View>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
