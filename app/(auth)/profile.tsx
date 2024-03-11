import { View, Text, StyleSheet, TextInput, Button, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";

const profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");

  useEffect(() => {
    loadUserInfo();
    if (username.length != 0) {
      setUsername("");
    }
  }, []);

  const loadUserInfo = async () => {
    if (user) {
      const userDocument = await getDoc(doc(FIRESTORE_DB, "users", user.uid));
      if (userDocument.exists()) {
        setUsername(userDocument.data().username);
      }
    }
  };

  const handleUpdateUsername = async () => {
    try {
      if (user) {
        await updateDoc(doc(FIRESTORE_DB, "users", user.uid), {
          username: username,
        });
        Alert.alert("Username updated successfully");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TextInput
          style={styles.inputField}
          placeholder="Enter your new username"
          value={username}
          onChangeText={setUsername}
        />
        <Button title="Update username" onPress={handleUpdateUsername} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputField: {
    marginVertical: 4,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    height: 50,
  },
  card: {
    marginBottom: 20,
    padding: 20,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});

export default profile;
