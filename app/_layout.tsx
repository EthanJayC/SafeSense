import { AuthProvider, useAuth } from "@/context/AuthContext";
import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const InitialLayout = () => {
  const { user, initialized } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  // This useEffect will redirect the user to the feed page if they are authenticated
  useEffect(() => {
    if (!initialized) return;

    const inAuthGroup = segments[0] === "(auth)";

    if (user && !inAuthGroup) {
      router.replace("/feed");
    } else if (!user) {
      router.replace("/login");
    }
  }, [user, initialized]);

  return (
    // empty fragment
    <>
      {initialized ? (
        <Slot />
      ) : (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
    </>
  );
};

const rootLayout = () => {
  return (
    <AuthProvider>
      <InitialLayout />
    </AuthProvider>
  );
};

export default rootLayout;
