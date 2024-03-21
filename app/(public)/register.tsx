import { View, StyleSheet, TextInput, Button } from "react-native";
import React, { useState } from "react";
import Spinner from "react-native-loading-spinner-overlay";
import { UserCredential, createUserWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH, FIRESTORE_DB } from "@/config/firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

const register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRegistration = async () => {
    try {
      setLoading(true);
      const user = await createUserWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("User created: ", user.user.uid);
      await createUserInformation(user);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const createUserInformation = async (user: UserCredential) => {
    try {
      const docRef = doc(FIRESTORE_DB, `users/${user.user.uid}`);
      await setDoc(docRef, {
        username,
        email,
      });
    } catch (error) {
      console.log("Error writing to DB: ", error);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      <TextInput
        placeholder="Enter username"
        autoCapitalize="none"
        style={styles.inputField}
        value={username}
        onChangeText={setUsername}
      ></TextInput>
      <TextInput
        placeholder="Enter email address"
        autoCapitalize="none"
        keyboardType="email-address"
        style={styles.inputField}
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        secureTextEntry
        placeholder="Create password"
        style={styles.inputField}
        value={password}
        onChangeText={setPassword}
      ></TextInput>

      <Button title="Create account" onPress={handleRegistration} />
    </View>
  );
};

export default register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
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
});
