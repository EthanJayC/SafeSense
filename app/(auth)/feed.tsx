import {
  View,
  Text,
  StyleSheet,
  Button,
  Modal,
  Alert,
  TextInput,
  Pressable,
} from "react-native";
import React, { useEffect, useState } from "react";
import MapView, {
  Callout,
  LatLng,
  Marker,
  PROVIDER_GOOGLE,
} from "react-native-maps";
import * as Location from "expo-location";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CircleButton } from "@/components/CircleButton";
import {
  DocumentData,
  addDoc,
  collection,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { FIRESTORE_DB } from "@/config/firebaseConfig";

// Initial region for the map, set to Sheffield
const INITIAL_REGION = {
  latitude: 53.3811,
  longitude: -1.4701,
  latitudeDelta: 0.06,
  longitudeDelta: 0.04,
};

// Main function for the feed page, this is where the map and report event modal are rendered
const feed = () => {
  const [region, setRegion] = useState(INITIAL_REGION);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportTitle, setReportTitle] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng | null>(
    null
  );
  const [reportInputReset, setReportInputReset] = useState(false); //this will reset the input fields to empty after the report is sent
  const [reports, setReports] = useState<DocumentData[]>([]); //this is for grabbing saved report locations from the database to create markers with

  // Function to save event report to database for future use, this also changes the reports state to include
  // the new report so the marker can be rendered on the map instantly
  const handleSaveReport = async () => {
    setLoading(true);
    try {
      const docRef = await addDoc(collection(FIRESTORE_DB, "reports"), {
        Title: reportTitle,
        Description: reportDescription,
        Date: date,
        MarkerLocation: markerCoordinates,
      });

      const doc = await getDoc(docRef);
      const newReport = doc.data();
      if (newReport) {
        setReports((prevReports) => [...prevReports, newReport]);
      }
    } catch (error) {
      console.error("Error adding document: ", error);
    } finally {
      setLoading(false);
    }
  };

  // Function to handle the date picker including validation check for future dates
  const handleConfirm = (selectedDate: Date) => {
    const currentDate = new Date();
    if (selectedDate > currentDate) {
      Alert.alert("You can't select a future date");
      setDatePickerVisibility(false);
      return;
    }
    setDate(selectedDate);
    setDatePickerVisibility(false);
  };

  //this useEffect will reset the input fields to empty if
  //the form is closed without submitting, or if the form is submitted
  useEffect(() => {
    if (!modalVisible) {
      setDate(new Date());
      setDatePickerVisibility(false);
      setReportTitle("");
      setReportDescription("");
      setMarkerCoordinates(null);
      setReportInputReset(false);
    }
  }, [reportInputReset]);

  //ask for permission to access location via a pop-up
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // Update the region state with the user's location
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
        longitudeDelta: 0.02,
      });
    })(); //second brackets mean the function will be called immediately
  }, []); //empty array means the function will be called only once

  //gets marker locations from database and renders them on the map
  useEffect(() => {
    const fetchReports = async () => {
      const querySnapshot = await getDocs(collection(FIRESTORE_DB, "reports"));
      const reports = querySnapshot.docs.map((doc) => doc.data());
      setReports(reports);
    };
    console.log("useEffect for reports loaded");
    fetchReports();
  }, []); //useEffect will only run once

  return (
    <View style={styles.container}>
      {/* Modal for reporting an event */}
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
            <Text style={styles.modalTitle}>Reporting an event</Text>
            <Text style={styles.modalText}>Report title:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="What did you see?"
              value={reportTitle}
              onChangeText={setReportTitle}
            />
            <Text style={styles.modalText}>Report description:</Text>
            <TextInput
              style={styles.inputField}
              placeholder="Describe the event in further detail"
              value={reportDescription}
              onChangeText={setReportDescription}
            />
            <Text style={styles.modalText}>Location of event:</Text>
            <Pressable>
              <Text
                style={styles.modalPressable}
                onPress={() => {
                  if (reportTitle == "") {
                    Alert.alert(
                      "Enter a report title before adding a location"
                    );
                  } else {
                    setModalVisible(false);
                  }
                }}
              >
                Tap here then long tap on the map to set location
              </Text>
            </Pressable>
            <Text style={styles.falseTextInput}>
              {markerCoordinates
                ? `Latitude: ${markerCoordinates.latitude}, Longitude: ${markerCoordinates.longitude}`
                : "No location selected"}
            </Text>
            <Text style={styles.modalText}>Date of event:</Text>
            <Pressable>
              <Text
                style={styles.modalPressable}
                onPress={() => {
                  setDatePickerVisibility(true);
                }}
              >
                Change the date here
              </Text>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                display="inline"
                onConfirm={handleConfirm}
                onCancel={() => setDatePickerVisibility(false)}
              />
            </Pressable>
            <TextInput
              style={styles.falseTextInput}
              value={date.toLocaleString()}
              editable={false}
            />
            <View style={styles.modalFooter}>
              <View style={{ marginRight: 10 }}>
                {/* // Contains validation check to ensure the fields aren't empty on submission */}
                <Button
                  title="Post report"
                  onPress={() => {
                    if (
                      reportTitle == "" ||
                      reportDescription == "" ||
                      !date ||
                      !markerCoordinates
                    ) {
                      Alert.alert("Please fill in all the fields");
                    } else {
                      handleSaveReport();
                      setReportInputReset(true);
                      Alert.alert("Report submitted successfully");
                      setModalVisible(false);
                    }
                  }}
                />
              </View>
              <View style={{ marginLeft: 10 }}>
                <Button
                  title="Cancel"
                  onPress={() => {
                    setModalVisible(false);
                    setReportInputReset(true);
                  }}
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>
      {/* Modal for report event ends here */}

      {/* Code that renders the map and its markers */}
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsMyLocationButton={true}
        showsUserLocation={true}
        region={region}
        //this prevents the modal from appearing if the user long presses the map without opening a report first
        onLongPress={(e) => {
          setMarkerCoordinates(e.nativeEvent.coordinate);
          if (reportTitle != "") {
            setModalVisible(true);
          }
        }}
      >
        {/* //renders markers for each report */}
        {reports.map((report, index) => (
          <Marker
            key={index}
            coordinate={report.MarkerLocation}
            title={report.Title}
            description={report.Description}
          >
            {/* //custom callout for each marker so the dateTime is displayed too */}
            <Callout>
              <Text>Report title: {report.Title}</Text>
              <Text>Description: {report.Description}</Text>
              <Text>
                Date and time of event: {report.Date.toDate().toLocaleString()}
              </Text>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.reportButton}>
        <CircleButton
          onPress={() => {
            setModalVisible(true);
          }}
        />
        <Text>Report event</Text>
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
    width: "85%",
    height: "70%",
    padding: 20,
  },
  falseTextInput: {
    marginVertical: 4,
    backgroundColor: "#fff",
    textAlign: "center",
    color: "black",
    padding: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    height: 50,
  },
  reportButton: {
    alignItems: "center",
    padding: 20,
    textAlign: "center",
    fontSize: 20,
  },
  inputField: {
    marginVertical: 4,
    marginBottom: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    height: 50,
  },
  modalTitle: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
  },
  modalText: {
    textAlign: "left",
    fontSize: 16,
  },
  modalFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
    padding: 10,
  },
  modalPressable: {
    padding: 5,
    textAlign: "center",
    color: "dodgerblue",
  },
  modalView: {
    width: "80%",
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

export default feed;
