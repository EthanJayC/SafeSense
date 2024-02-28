import { View, Text, Pressable, StyleSheet, Button } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";

const INITIAL_REGION = {
  latitude: 53.3811,
  longitude: -1.4701,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

const feed = () => {
  const [region, setRegion] = useState(INITIAL_REGION);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log(location);
      // Update the region state with the user's location
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.02,
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        region={region}
      />

      <View style={styles.reportButton}>
        <Button
          title="Report CRIME"
          onPress={() => {
            alert("Crime added, you saved the day!");
          }}
        />
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
  map: {
    width: "80%",
    height: "50%",
    padding: 20,
  },
  reportButton: {
    alignItems: "center",
    padding: 20,
  },
});

export default feed;
