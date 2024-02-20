import { View, Text, Pressable } from "react-native";
import React from "react";

const feed = () => {
  return (
    <View>
      <Text style={{ fontSize: 24 }}>
        {" "}
        This is the homepage after logging in !!!{" "}
      </Text>
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

export default feed;
