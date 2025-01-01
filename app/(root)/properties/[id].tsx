import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { router, useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppwrite } from "@/lib/useAppwrite";
import { getProperty } from "@/lib/appwrite";
import images from "@/constants/images";
import icons from "@/constants/icons";

interface Property extends Document {
  name: string;
  address: string;
  image: string;
  type: string;
  price: number;
  area: number;
  bathrooms: number;
  bedrooms: number;
  rating: number;
  facities: Array<string>;
  discription: string;
  geolocation: string;
  gallery: Array<string>;
  agent: {
    name: string;
    avatar: string;
    email: string;
  };
  reviews: Array<string>;
  // add other properties you expect
}

const Property = () => {
  const { id } = useLocalSearchParams();

  const { data, loading } = useAppwrite<Property>({
    fn: getProperty,
    params: {
      id: id as string,
    },
  }) as { data: Property | null; loading: boolean };

  console.log(data);
  return (
    <SafeAreaView className="-mt-20 bg-white">
      {loading ? (
        <ActivityIndicator size="large" className="text-primary-300" />
      ) : (
        <ScrollView
          className="h-full "
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="relative">
            <Image
              source={{ uri: data?.image }}
              className="object-cover w-full h-[400px]"
            />
            <TouchableOpacity
              className=" p-1 rounded-full flex flex-row justify-between absolute  top-20 left-4"
              onPress={() => router.back()}
            >
              <Image
                source={icons.backArrow}
                tintColor={"#000"}
                className="size-9"
              />
            </TouchableOpacity>
            <View className="absolute top-20 right-4 flex flex-row gap-4 items-center">
              <Image
                source={icons.heart}
                tintColor={"#000"}
                className="size-7"
              />
              <Image
                source={icons.send}
                tintColor={"#000"}
                className="size-7"
              />
            </View>
          </View>
          <View className="px-4 mt-4">
            {/* Title, type, rating, reviews, beds, bath, sqft */}\
            <View className="w-fullmt-4">
              <Text className="text-2xl font-rubik-bold">{data?.name}</Text>

              <View className="flex flex-row items-center gap-2 mt-2">
                <Text className="text-primary-300 font-rubik-medium uppercase text-xs rounded-full border border-primary-100  bg-primary-200 px-4  py-2">
                  {data?.type}
                </Text>
                <View className="flex flex-row items-center ">
                  <Image source={icons.star} className="object-cover ml-2" />
                  <Text className="ml-2 text-black-200">{data?.rating}</Text>
                  <Text className="ml-1 text-s font-rubik text-black-100">
                    ({data?.reviews.length} reviews)
                  </Text>
                </View>
              </View>
              <View className="mt-8 flex flex-row gap-8">
                <View className="flex flex-row items-center gap-1">
                  <Image
                    source={icons.bed}
                    className="object-cover ml-2 size-6 "
                  />
                  <Text className="ml-2 font-rubik-medium text-black-200">
                    {data?.bedrooms} Beds
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Image
                    source={icons.bath}
                    className="object-cover ml-2 size-6 "
                  />
                  <Text className="ml-2 font-rubik-medium text-black-200">
                    {data?.bedrooms} Bath
                  </Text>
                </View>
                <View className="flex flex-row items-center gap-1">
                  <Image
                    source={icons.area}
                    className="object-cover ml-2 size-6 "
                  />
                  <Text className="ml-2 font-rubik-medium text-black-200">
                    {data?.area} sqft
                  </Text>
                </View>
              </View>
            </View>
            {/* Agent section */}
            <View className="mt-12">
              <Text className="text-2xl font-rubik-bold">Agent</Text>
              <View className="mt-4 flex flex-row justify-between items-center">
                <Image
                  source={{ uri: data?.agent.avatar }}
                  className="size-20 rounded-full"
                />
                <View className="flex-1 ml-4">
                  <Text className="text-xl font-rubik-medium text-black-200">
                    {data?.agent.name}
                  </Text>
                  <Text className="text-s font-rubik text-black-100">
                    Ownner
                  </Text>
                </View>
                <View className="flex flex-row gap-4">
                  <Image source={icons.chat} className="size-9 " />
                  <Image source={icons.phone} className="size-9" />
                </View>
              </View>
            </View>
            {/* overview */}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Property;
