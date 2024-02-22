import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";

const feed = () => {
  return (
    <View style={styles.container}>
      <Text>This is the homepage after logging in !!!</Text>
      <Text>Map goes here</Text>
      <Pressable
        onPress={() => {
          alert("Oooh you reported something!");
        }}
      >
        <Text>I'm a report button ooo look at me!</Text>
      </Pressable>
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

export default feed;
