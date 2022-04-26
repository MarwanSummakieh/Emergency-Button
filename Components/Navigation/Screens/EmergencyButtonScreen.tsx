
import React, { useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Pressable,
  Text,
  Alert,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EmergencyButtonUnpressed from "../../../assets/svgs/emergencyPage/EmergencyButtonUnpressed";
import * as Location from "expo-location";

import EmergencyButton from "../../EmergencyButton";
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
import * as Notifications from "expo-notifications";

export const mainGradient = ["rgba(52, 170, 252, 1)", "rgba(118, 10, 202, 1)"];

async function messagesentNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "your message has been sent",
      body: "we'll notify you when someone responds",
      data: { data: 'goes here' },
    },
    trigger: null
  });
}

export default function EmergencyButtonPage() {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const sendinglocation = () => {
    fetch("/post/data/here", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        UID: "123",
        latitude: latitude,
        longitude: longitude,
      }),
    }).then((res) => {
      console.log("Request complete! response:", res);
    });
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <EmergencyButton />
      <LinearGradient colors={mainGradient} style={styles.background}>
        <Pressable style={styles.emergencyButton} onPress={sendinglocation}>
          <EmergencyButtonUnpressed />
        </Pressable>
      </LinearGradient>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    height: windowHeight,
    width: windowWidth,
  },
  text: {
    color: "#000000",
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  emergencyButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
  emergencyButtonView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  
});
