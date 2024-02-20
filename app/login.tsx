import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  TextInput,
  ActivityIndicator,
  Button,
} from "react-native";
import React, { useState } from "react";
import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";

const login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;

  const handleSignIn = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      console.log("Success!");
    } catch (error) {
      console.log("error signing in: " + error);
      alert(
        "Error signing in, please check your email and password is correct."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (error) {
      console.log("error creating account: " + error);
      alert(
        "Error creating account, please check you've used a valid email address."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView behavior="padding">
        <Text style={styles.titleText}>SafeSense</Text>
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
        ></TextInput>
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={password}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={(text) => setPassword(text)}
        ></TextInput>
        {loading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <>
            {/* TODO: add styling to seperate the two buttons */}
            <Button title="Login" onPress={handleSignIn} />
            <Button title="Create Account" onPress={handleCreateUser} />
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    margin: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
  },
  titleText: {
    justifyContent: "center",
    alignItems: "center",
    fontSize: 36,
    paddingBottom: "10%",
  },
  button: {},
});
