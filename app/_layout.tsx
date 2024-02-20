import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

//TODO: THIS HAS MY USER AUTH LOGIC, as its top level statement for useStates, I.e user logged in needs a saved useState
//i.e. my login.tsx logic needs to be moved into here :D
const StackLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="index" options={{ headerTitle: "SafeSense" }} />
      <Stack.Screen name="(tabs)" options={{ headerTitle: "SafeSense" }} />
    </Stack>
  );
};
export default StackLayout;
