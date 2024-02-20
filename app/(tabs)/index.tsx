import { View, Text } from "react-native";
import React from "react";
import { Redirect } from "expo-router";

const index = () => {
  return <Redirect href={"*/(tabs)/feed"} />; //This tab is hidden, but required to make (tabs) function properly
};

export default index;
