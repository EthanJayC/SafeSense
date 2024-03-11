import { View, StyleSheet, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";

interface CircleButtonProps {
  title?: string;
  onPress: () => void;
}

export const CircleButton: React.FC<CircleButtonProps> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.circleButton} onPress={onPress}>
        <Ionicons name="add-outline" size={38} color="#fff" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 85,
    height: 85,
    borderRadius: 50,
    marginHorizontal: 20,
  },
  circleButton: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "dodgerblue",
  },
});
