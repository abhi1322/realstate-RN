import { Link } from "expo-router";
import { Button, Text, View } from "react-native";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text className="text-2xl">Edit app/index.tsx to edit this screen.</Text>
      <Link href="/sign-in">Sign in</Link>
      <Link href="/explore">Explore</Link>
      <Link href="/explore">Profile</Link>
      <Link href="/properties/10" className="bg-red-200 p-2 rounded-full">
        Property
      </Link>
    </View>
  );
}
