import React from "react";
import { Stack } from "expo-router";

//TODO: THIS HAS MY USER AUTH LOGIC, as its top level statement for useStates, I.e user logged in needs a saved useState
//i.e. my login.tsx logic needs to be moved into here :D
const publicLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "dodgerblue" },
        headerTintColor: "#fff",
      }}
    >
      <Stack.Screen name="login" options={{ headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: "Create Account" }}
      />
    </Stack>
  );
};
export default publicLayout;
