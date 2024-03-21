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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
            <Text style={styles.modalText}>Enter your email address:</Text>
            <TextInput
              style={styles.inputField}
              autoCapitalize="none"
              placeholder="Email"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />
            <Button title="Reset Password" onPress={handleForgotPassword} />
            <Pressable onPress={() => setModalVisible(false)}>
              <Text
                style={{
                  color: "black",
                  fontSize: 16,
                  marginTop: 20,
                  textAlign: "center",
                }}
              >
                CANCEL
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <Spinner visible={loading} />
      {/* add image here  */}
      <Text style={styles.titleText}>SafeSense</Text>
      <TextInput
        placeholder="Enter your email address"
        keyboardType="email-address"
        autoCapitalize="none"
        style={styles.inputField}
        value={email}
        onChangeText={setEmail}
      ></TextInput>
      <TextInput
        secureTextEntry
        autoCapitalize="none"
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
    marginBottom: 20,
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
    textAlign: "left",
    fontSize: 16,
    marginBottom: 15,
    padding: 10,
  },
  titleText: {
    textAlign: "center",
    fontSize: 48,
    marginBottom: 50,
  },
});
