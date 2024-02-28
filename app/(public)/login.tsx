import { FIREBASE_AUTH } from "@/config/firebaseConfig";
import { Link } from "expo-router";
import {
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
} from "firebase/auth";
import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Button,
  TextInput,
  Modal,
  Alert,
} from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

const login = () => {
  const [email, setEmail] = useState("ethan@test.com");
  const [password, setPassword] = useState("password");
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        email,
        password
      );
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      await sendPasswordResetEmail(FIREBASE_AUTH, email);
      alert("Password email link sent, check your emails!");
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Password reset modal closed");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.container}>
          <View style={styles.modalView}>
            <Text>Enter your email address:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <Button title="Reset Password" onPress={handleForgotPassword} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

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
      <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.modalText}>Forgot Password</Text>
      </Pressable>
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
  modalView: {
    margin: 20,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    borderWidth: 0.5,
    borderColor: "gray",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
  modalText: {
    textAlign: "center",
    marginBottom: 15,
  },
});
