import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";

const info = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <ScrollView>
          <Text style={styles.text}>
            1. The map of your current location displays any events posted by
            other students in the area they believe is of a criminal or
            anti-social nature.
          </Text>
          <Text style={styles.text}>
            2. Tap on a marker to view the details of the report posted. Other
            users markers appear as red on the map, and your own appear as blue.
          </Text>
          <Text style={styles.text}>
            3. To report your own event, press on the circular button below the
            map, and follow the instructions.
          </Text>
          <Text style={styles.text}>
            4. Once the report is submitted, your own marker of the event will
            appear on the map.
          </Text>
          <Text style={[{ fontWeight: "bold" }, styles.text]}>
            Note: As reports are user generated, the accuracy of the information
            cannot be guaranteed. Use this app responsibly and always contact
            the emergency services if you are in immediate danger.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
  card: {
    justifyContent: "center",
    marginBottom: 20,
    padding: 20,
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 4,
  },
});

export default info;
