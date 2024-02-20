import { View, Text, Button } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const profile = () => {
  const router = useRouter();
  return (
    <View>
      <Text>account stuff goes here</Text>
    </View>
  );
};

export default profile;
