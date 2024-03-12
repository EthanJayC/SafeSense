import { View, Text, StyleSheet } from "react-native";
import React from "react";

const info = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        1. the map of your current location displays any events posted by other
        students in the area they believe is of a criminal or anti- social
        nature.
      </Text>
      <Text style={styles.text}>
        2. tap on a marker to view the details of the report posted.
      </Text>
      <Text style={styles.text}>
        3. To report your own event, press on the circular button below the map,
        and enter the details of what you saw.
      </Text>
      <Text style={styles.text}>
        4. When selecting the area of the event, press and hold on the map to
        log the location of the event.
      </Text>
      <Text style={styles.text}>
        5. Once the report successfully submits, your own marker of the event
        will appear on the map.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
    color: "#333",
    textAlign: "center",
  },
});

export default info;
