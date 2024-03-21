import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  Alert,
  Modal,
  Pressable,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { FIRESTORE_DB } from "@/config/firebaseConfig";
import { deleteDoc, doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "@/context/AuthContext";
import { deleteUser } from "firebase/auth";
import PrivacyPolicyText from "@/components/privacyPolicyText";

const profile = () => {
  const { user } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState<string>("");
  const [modalVisible, setModalVisible] = useState(false);
  const [privacyPolicyVisible, setPrivacyPolicyVisible] = useState(false);

  useEffect(() => {
    loadUserInfo();
    if (username.length != 0) {
      setUsername("");
    }
  }, []);

  const handleDeleteAccount = async () => {
    try {
      if (user) {
        // Delete user from firestore
        await deleteDoc(doc(FIRESTORE_DB, "users", user.uid));
        // Delete user from authentication
        await deleteUser(user);
        Alert.alert("Account deleted successfully");
        router.navigate("login");
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        <View style={styles.buttonOutline}>
          <TouchableOpacity onPress={() => setPrivacyPolicyVisible(true)}>
            <Text style={styles.buttonText}>View privacy policy</Text>
          </TouchableOpacity>
        </View>

        <Pressable onPress={() => setModalVisible(true)}>
          <Text style={{ color: "red", marginTop: 20, textAlign: "center" }}>
            DELETE ACCOUNT
          </Text>
        </Pressable>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.container}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Are you sure you want to delete your account? This action is
                permanent.
              </Text>
              <Button
                title="Yes, delete my account"
                onPress={() => {
                  handleDeleteAccount();
                  setModalVisible(false);
                }}
              />
              <Pressable onPress={() => setModalVisible(false)}>
                <Text
                  style={{
                    color: "red",
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
        {/* // This is the privacy policy modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={privacyPolicyVisible}
          onRequestClose={() => {
            setPrivacyPolicyVisible(!privacyPolicyVisible);
          }}
        >
          <View style={styles.container}>
            <View style={styles.modalView}>
              <ScrollView>
                <PrivacyPolicyText />
              </ScrollView>
              <Pressable onPress={() => setPrivacyPolicyVisible(false)}>
                <Text
                  style={{
                    color: "red",
                    fontSize: 16,
                    marginTop: 20,
                    textAlign: "center",
                  }}
                >
                  CLOSE
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>
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
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonOutline: {
    backgroundColor: "#fff",
    margin: 20,
  },
  buttonText: {
    color: "dodgerblue",
    fontSize: 16,
    textAlign: "center",
  },
  card: {
    marginBottom: 20,
    padding: 20,
    width: "80%",
    backgroundColor: "#fff",
    borderRadius: 4,
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
});

export default profile;
