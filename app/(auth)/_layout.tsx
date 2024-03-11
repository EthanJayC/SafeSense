import { Tabs } from "expo-router";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { useAuth } from "@/context/AuthContext";
import { LogoutButton } from "@/components/LogoutBtn";

const tabsLayout = () => {
  const { user } = useAuth();
  return (
    <Tabs>
      <Tabs.Screen
        name="feed"
        options={{
          tabBarLabel: "Main Feed",
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="map-outline" color={color} size={size} />
          ),
        }}
        redirect={!user}
      ></Tabs.Screen>
      <Tabs.Screen
        name="profile"
        options={{
          tabBarLabel: "My Profile",
          headerRight: () => <LogoutButton />,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-circle-outline" color={color} size={size} />
          ),
        }}
        redirect={!user}
      ></Tabs.Screen>
    </Tabs>
  );
};

export default tabsLayout;
