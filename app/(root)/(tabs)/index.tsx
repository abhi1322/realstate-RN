import FeatureCard, { Card } from "@/components/Cards";
import Filters from "@/components/Filters";
import Search from "@/components/Search";
import icons from "@/constants/icons";
import images from "@/constants/images";
import { useGlobalContext } from "@/lib/global-provider";
import seed from "@/lib/seed";
import { Link } from "expo-router";
import {
  Button,
  FlatList,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const { user } = useGlobalContext();

  return (
    <SafeAreaView className="bg-white h-full">
      <Button title="data seed " onPress={seed} />
      <FlatList
        data={[1, 2, 3, 4]}
        renderItem={(item) => <Card />}
        keyExtractor={(item) => item.toString()}
        numColumns={2}
        columnWrapperClassName="flex gap-5 px-5"
        showsVerticalScrollIndicator={false}
        ListFooterComponent={<View className="mt-16"></View>}
        ListHeaderComponent={
          <View className="px-5">
            <View className="flex flex-row items-center justify-between mt-5">
              <View className="flex flex-row items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="size-12 rounded-full"
                />
                <View className="flex flex-col items-start ml-2 justify-center">
                  <Text className="text-xs font-rubik text-black-100">
                    Good Morning
                  </Text>
                  <Text className="text-base font-rubik-medium text-black-300">
                    {user?.name}
                  </Text>
                </View>
              </View>
              <Image source={icons.bell} className="size-6" />
            </View>
            <View className="">
              <Search />
              <View className="my-5">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-rubik-semibold text-black-300">
                    Features
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-sm font-rubik text-primary-300">
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>

                <FlatList
                  data={[15, 28, 30]}
                  renderItem={(item) => <FeatureCard />}
                  keyExtractor={(item) => item.toString()}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  bounces={false}
                  contentContainerClassName="flex gap-5 mt-5"
                />
              </View>
              <View className="my-5">
                <View className="flex flex-row items-center justify-between">
                  <Text className="text-xl font-rubik-semibold text-black-300">
                    Our reconmendation
                  </Text>
                  <TouchableOpacity>
                    <Text className="text-sm font-rubik text-primary-300">
                      See All
                    </Text>
                  </TouchableOpacity>
                </View>

                <Filters />
              </View>
            </View>
          </View>
        }
      />
    </SafeAreaView>
  );
}
