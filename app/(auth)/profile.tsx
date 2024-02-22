import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { useRouter } from "expo-router";

const profile = () => {
  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text>account stuff goes here</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default profile;
