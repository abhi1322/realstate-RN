import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  ImageSourcePropType,
  Alert,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { settings } from "@/constants/data";
import { useGlobalContext } from "@/lib/global-provider";
import { logout } from "@/lib/appwrite";

interface SettingItemsProps {
  icon: ImageSourcePropType;
  title: string;
  onPress?: () => void;
  textStyle?: any;
  showArrow?: boolean;
}

const SettingItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingItemsProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between "
  >
    <View className="flex gap-2 flex-row items-center justify-center">
      <Image source={icon} className="size-6" />
      <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>
        {title}
      </Text>
    </View>

    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

const Profile = () => {
  const { user, refetch } = useGlobalContext();

  const handleLogout = async () => {
    const result = await logout();

    if (result) {
      Alert.alert("Success", "You have successfully logged out");
    } else {
      Alert.alert("Error", "Failed to log out");
    }
  };

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
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 rounded-full"
            />
            <TouchableOpacity className="absolute p-2 bottom-8 -right-2">
              <Image source={icons.edit} className="size-7" />
            </TouchableOpacity>
            <Text className="text-xl  font-rubik-semibold mt-2">
              {user?.name}
            </Text>
          </View>
        </View>
        <View className="flex flex-col gap-4 mt-8">
          <SettingItem icon={icons.calendar} title="My Bookings" />
          <SettingItem icon={icons.wallet} title="Payments" />
        </View>

        <View className="flex flex-col gap-6 mt-4 border-t pt-5 border-primary-200">
          {settings.slice(2).map((item, index) => (
            <SettingItem key={index} icon={item.icon} title={item.title} />
          ))}
        </View>

        <View className=" flex flex-col gap-6 mt-8 border-t pt-5 border-primary-200">
          <SettingItem
            icon={icons.logout}
            title="Logout"
            onPress={handleLogout}
            textStyle="text-danger"
            showArrow={false}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
