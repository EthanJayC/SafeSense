import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { signOut } from "firebase/auth";
import React from "react";
import { Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export const LogoutButton = () => {
  const doLogout = () => {
    signOut(FIREBASE_AUTH);
  };
  return (
    <Pressable style={{ paddingRight: 10 }} onPress={doLogout}>
      <Ionicons name="log-out-outline" size={24} />
    </Pressable>
  );
};
