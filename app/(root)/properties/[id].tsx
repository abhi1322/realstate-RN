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
import MapView, { Marker } from "react-native-maps";
import { facilities } from "@/constants/data";

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
  facilities: Array<string>;
  description: string;
  geolocation: string;
  gallery: Array<{
    image: string;
  }>;
  agent: {
    name: string;
    avatar: string;
    email: string;
  };
  reviews: Array<{
    name: string;
    rating: number;
    review: string;
    avatar: string;
  }>;
  // add other properties you expect
}

const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#f5f5f5",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [
      {
        color: "#ffffff",
      },
    ],
  },
];

const facilityIcons = {
  Laundry: require("@/assets/icons/laundry.png"),
  "Car Parking": require("@/assets/icons/car-park.png"),
  "Sports Center": require("@/assets/icons/run.png"),
  Cutlery: require("@/assets/icons/cutlery.png"),
  Gym: require("@/assets/icons/dumbell.png"),
  "Swimming pool": require("@/assets/icons/swim.png"),
  Wifi: require("@/assets/icons/wifi.png"),
  "Pet Center": require("@/assets/icons/dog.png"),
};

const Property = () => {
  const { id } = useLocalSearchParams();

  const { data, loading } = useAppwrite<Property>({
    fn: getProperty,
    params: {
      id: id as string,
    },
  }) as { data: Property | null; loading: boolean };

  // console.log(data);
  console.log(data?.gallery);
  return (
    <SafeAreaView className="-mt-20 bg-white">
      {loading ? (
        <ActivityIndicator size="large" className="text-primary-300" />
      ) : (
        <ScrollView
          className="h-full bg-white "
          horizontal={false}
          showsVerticalScrollIndicator={false}
        >
          <View className="relative bg-white">
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
                    {`(${data?.reviews.length}) reviews`}
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
                    {data?.bathrooms} Bath
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
                    {data?.agent.name} Owner
                  </Text>
                </View>
                <View className="flex flex-row gap-4">
                  <Image source={icons.chat} className="size-9 " />
                  <Image source={icons.phone} className="size-9" />
                </View>
              </View>
            </View>
            {/* overview */}
            <View className="mt-8">
              <Text className="text-2xl font-rubik-semibold">Overview</Text>
              <Text className="mt-2 text-base text-black-200">
                {data?.description}
              </Text>
            </View>
            {/* FACILITIES  */}
            <View className="mt-6 flex-row flex-wrap gap-4">
              {data?.facilities &&
                data.facilities.map((facility) => (
                  <View
                    key={facility}
                    className="flex justify-center items-center size-20 bg-primary-100 rounded-lg border border-primary-100"
                  >
                    <Image
                      source={
                        facilityIcons[facility as keyof typeof facilityIcons]
                      }
                      className="w-6 h-6"
                    />
                    <Text className="text-xs mt-1">{facility}</Text>
                  </View>
                ))}
            </View>
            {/* Gallery */}
            <View className="mt-6">
              <Text className="text-2xl font-rubik-semibold">Gallery</Text>
              <View className="flex mt-4 flex-row gap-4">
                {data && data?.gallery.length > 0 ? (
                  data?.gallery.slice(0, 3).map((image, index) => (
                    <View key={index} className="relative">
                      <Image
                        source={{ uri: image.image }}
                        className="object-cover w-[110px] h-[110px] rounded-md border-primary-100 border"
                      />
                      {index === 2 && data.gallery.length > 3 && (
                        <View className="absolute inset-0 bg-white/20 rounded-md flex items-center justify-center">
                          <Text className="text-white font-rubik-medium text-5xl">
                            +{data.gallery.length - 3}
                          </Text>
                        </View>
                      )}
                    </View>
                  ))
                ) : (
                  <Text className="w-full text-xs mt-2 text-black-100">
                    No images uploaded by owner
                  </Text>
                )}
              </View>
            </View>
            {/* location */}
            <View className="mt-8 ">
              <Text className="text-2xl font-rubik-semibold">Location</Text>
              <View className="mt-4 flex flex-row items-center">
                <Image source={icons.location} className="size-6" />
                <Text className="ml-2 text-base font-rubik text-black-200">
                  {data?.address}
                </Text>
              </View>
              {data?.geolocation && data.geolocation.includes(",") ? (
                <View className="w-full h-80 mt-4">
                  <MapView
                    style={{ flex: 1 }}
                    mapType="mutedStandard"
                    customMapStyle={mapStyle}
                    initialRegion={{
                      latitude: parseFloat(data.geolocation.split(",")[0]) || 0,
                      longitude:
                        parseFloat(data.geolocation.split(",")[1]) || 0,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }}
                  >
                    <Marker
                      coordinate={{
                        latitude:
                          parseFloat(data.geolocation.split(",")[0]) || 0,
                        longitude:
                          parseFloat(data.geolocation.split(",")[1]) || 0,
                      }}
                    />
                  </MapView>
                </View>
              ) : (
                <Text className="mt-2 text-black-100">
                  Location not available
                </Text>
              )}
            </View>
            {/* Reviews */}
            {data?.reviews.length === 0 ? (
              <Text className="w-full text-center mt-8 text-black-100">
                No reviews{" "}
              </Text>
            ) : (
              <View>
                {data?.reviews.slice(0, 3).map((review) => (
                  <View className="mt-8">
                    <View className="flex flex-row items-center gap-4">
                      <Image
                        source={{ uri: review.avatar }}
                        className="size-10 rounded-full"
                      />
                      <View className="">
                        <Text className="text-base font-rubik-medium text-black-200">
                          {review.name}
                        </Text>
                        <View className="text-sm flex  flex-row items-center gap-1">
                          <Text className="text-s font-rubik text-black-100">
                            {review.rating}
                          </Text>
                          <Image source={icons.star} className="size-4" />x
                        </View>
                      </View>
                    </View>
                    <Text className="text-base font-rubik-light mt-1 text-black-200">
                      {review.review}
                    </Text>
                  </View>
                ))}
              </View>
            )}
            {/* last booking section */}
            <View className="mt-8 flex flex-row justify-between border-t border-primary-100 pt-8 ">
              <View>
                <Text className="font-rubik-semibold uppercase text-sm text-black-200">
                  Price
                </Text>
                <Text className="text-primary-300 font-rubik-semibold text-2xl">
                  ${data?.price}
                </Text>
              </View>
              <TouchableOpacity className="bg-primary-300 text-sm rounded-full flex justify-center items-center px-8 text-white">
                <Text className="text-white text-xl">Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default Property;
