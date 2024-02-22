import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { Link } from "expo-router";
import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  Image,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const login = () => {
  const [email, setEmail] = useState("ethan@test.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
      console.log("Sign in successful with: ", user);
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
      {/* add image here  */}
      <TextInput
        placeholder="ethan@test.com"
        style={styles.inputField}
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        secureTextEntry
        style={styles.inputField}
        value={password}
        onChangeText={setPassword}
      ></TextInput>
      <Button title="Login" onPress={handleLogin} />
      <Link href="/register" asChild>
        <Pressable style={styles.button}>
          <Text>Don't have an account? Register here!</Text>
        </Pressable>
      </Link>
    </View>
  );
};

export default login;
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
  button: {
    margin: 10,
    alignItems: "center",
  },
  logo: {
    height: 100,
    width: 100,
    marginBottom: 20,
    justifyContent: "center",
  },
});
