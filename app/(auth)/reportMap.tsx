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
import { Callout, LatLng, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { CircleButton } from "@/components/CircleButton";
import {
  DocumentData,
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { FIRESTORE_DB } from "@/config/firebaseConfig";
import Spinner from "react-native-loading-spinner-overlay";
import { getAuth } from "firebase/auth";
import MapView from "react-native-map-clustering";
import DropDownPicker from "react-native-dropdown-picker";

// Initial region for the map, set to Sheffield
const INITIAL_REGION = {
  latitude: 53.3811,
  longitude: -1.4701,
  latitudeDelta: 0.06,
  longitudeDelta: 0.04,
};

// Main function for the feed page, this is where the map and report event modal are rendered
const reportMap = () => {
  const [region, setRegion] = useState(INITIAL_REGION);
  const [modalVisible, setModalVisible] = useState(false);
  const [reportDescription, setReportDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [loading, setLoading] = useState(false);
  const [markerCoordinates, setMarkerCoordinates] = useState<LatLng | null>(
    null
  );
  const [reportInputReset, setReportInputReset] = useState(false); //this will reset the input fields to empty after the report is sent
  const [reports, setReports] = useState<DocumentData[]>([]); //this is for grabbing saved report locations from the database to create markers with
  const [currentUser, setCurrentUser] = useState<string | null>(null); //this is for checking if the user is the one who reported the event
  //useStates for drop down picker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Driving offence", value: "Driving offence" },
    { label: "Drug offence", value: "Drug offence" },
    { label: "Hate crime", value: "Hate crime" },
    { label: "Sexual offence", value: "Sexual offence" },
    { label: "Terrorism", value: "Terrorism" },
    {
      label: "Verbal abuse and public harrassment",
      value: "Verbal abuse and public harrassment",
    },
    { label: "Violent crime", value: "Violent crime" },
    {
      label: "Wildlife, rural and heritage crime",
      value: "Wildlife, rural and heritage crime",
    },
    { label: "Youth crime", value: "Youth crime" },
  ]);

  //profanity checker for the report title and description
  var Filter = require("bad-words"),
    filter = new Filter();
  filter.removeWords("hell", "damn"); //removes these words from the profanity filter

  //Calls profanity filter to check if the report title or description contains any profanity
  if (filter.isProfane(reportDescription)) {
    Alert.alert("No profanity allowed, please re-enter your description");
    setReportDescription("");
  }

  // Function to save event report to database for future use, this also changes the reports state to include
  // the new report so the marker can be rendered on the map instantly
  // created a way for get the username from the User collection to display on the marker
  const handleSaveReport = async () => {
    setLoading(true);
    try {
      const user = getAuth().currentUser;
      let username = null;
      if (user) {
        const userDoc = await getDoc(doc(FIRESTORE_DB, "users", user.uid));
        if (userDoc.exists()) {
          username = userDoc.data().username;
        }
      }
      const docRef = await addDoc(collection(FIRESTORE_DB, "reports"), {
        Title: value,
        Description: reportDescription,
        Date: date,
        MarkerLocation: markerCoordinates,
        UserId: user ? user.uid : null,
        Username: username,
      });
      const reportDoc = await getDoc(docRef);
      const newReport = reportDoc.data();
      if (newReport) {
        setReports((prevReports) => [...prevReports, newReport]);
      }
      Alert.alert("Report submitted successfully");
    } catch (error) {
      console.error("Error adding document: ", error);
      Alert.alert("Report failed to submit, please try again later");
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
      setValue(null);
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
    const user = getAuth().currentUser;
    if (user) {
      setCurrentUser(user.uid);
    }
    fetchReports();
  }, []); //useEffect will run once when the component is mounted

  return (
    <View style={styles.container}>
      <Spinner visible={loading} />
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
            <Text style={styles.modalTitle}>EVENT REPORT</Text>
            <Text style={styles.modalText}>Report title:</Text>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
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
                  if (value == "") {
                    Alert.alert(
                      "Enter a report title before adding a location"
                    );
                  } else {
                    setModalVisible(false);
                  }
                }}
              >
                Tap here to select location
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
                      value == null ||
                      reportDescription == "" ||
                      !date ||
                      !markerCoordinates
                    ) {
                      Alert.alert("Please fill in all the fields");
                    } else {
                      handleSaveReport();
                      setReportInputReset(true);
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
        clusterColor="orange"
        //this prevents the modal from appearing if the user presses the map without opening a report first
        onPress={(e) => {
          setMarkerCoordinates(e.nativeEvent.coordinate);
          if (value != null) {
            setModalVisible(true);
          }
          if (reportDescription != "") {
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
            pinColor={currentUser === report.UserId ? "dodgerblue" : "red"}
          >
            {/* custom callout for each marker so the dateTime is displayed too */}
            <Callout style={styles.callout}>
              <Text style={styles.calloutText}>
                Report type: {report.Title}
              </Text>
              <Text style={styles.calloutText}>
                Description: {report.Description}
              </Text>
              <Text style={styles.calloutText}>
                Date and time of event: {report.Date.toDate().toLocaleString()}
              </Text>
              <Text style={styles.calloutText}>
                Reported by: {report.Username}
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
        <Text style={styles.reportButtonText}>Report event</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "offwhite",
  },
  callout: {
    width: 200,
    padding: 10,
    backgroundColor: "#FF7272",
  },
  calloutText: {
    color: "#fff",
    fontWeight: "bold",
    padding: 5,
  },
  map: {
    width: "95%",
    height: "75%",
    padding: 20,
  },
  falseTextInput: {
    backgroundColor: "#fff",
    textAlign: "center",
    color: "gray",
    padding: 10,
    borderRadius: 4,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 20,
  },
  reportButton: {
    alignItems: "center",
    padding: 20,
    textAlign: "center",
    fontSize: 20,
  },
  reportButtonText: {
    fontSize: 20,
    padding: 10,
    color: "black",
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
    fontSize: 20,
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
    fontSize: 16,
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

export default reportMap;
