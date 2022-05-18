import React, { useContext, useEffect, useState } from "react";
import { Alert, Modal, StyleSheet, Text, Pressable, View } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { windowWidth, windowHeight } from "../../MapViewComponent";
import { NotificationContext } from "../MainContainer";
import * as SecureStore from "expo-secure-store";
import { userID } from "../../../consts";
import { async } from "@firebase/util";

const ResponderPopup = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { notification } = useContext(NotificationContext);
  const [respond, setRespond] = useState("No request yet");
  const context = useContext(NotificationContext);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  const confirmRespond = async () => {
    const responderID = await SecureStore.getItemAsync(userID);
    console.log(JSON.stringify({
      location: {
        type: "Point",
        coordinates: [0.0, 0.0],
      },
      last_updated: Date.now(),
      country: "string",
      userID: notification.userID,
      responderID: responderID,
      resolved: false,
      status: "accepted",
    }),);
  
    fetch(
      "https://bpr-api.azurewebsites.net/accept_alert/?_id=" + notification._id,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: {
            type: "Point",
            coordinates: [0.0, 0.0],
          },
          last_updated: Date.now(),
          country: "string",
          userID: notification.userID,
          responderID: responderID,
          resolved: false,
          status: "accepted",
        }),
      }
    ).then(
      (response) => {
        console.log(response.status);
      }
    ).catch((err) => {
      console.log(err);
    });
  };
  const pressingTheButton = async () => {
    if(respond === "Respond"){
     setRespond("Finished");
     confirmRespond();
    }else{
      setRespond("No request yet");
      setLatitude(0);
      setLongitude(0);
      context.setNotification({});
    }
  }
  useEffect(() => {
    if (notification.location !== undefined) {
      setRespond("Respond");
      setLatitude(notification.location.coordinates[1]);
      setLongitude(notification.location.coordinates[0]);
    }
  }, [notification]);
  useEffect(() => {console.log("trrriiiggeer")}, [latitude]);
  return (
    <View style={styles.centeredView}>
      <View style={styles.centeredView}>
        <MapView
          region={{
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0,
            longitudeDelta: 0,
          }}
          style={styles.map}
          showsCompass={true}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          <Marker
            coordinate={{
              latitude: latitude,
              longitude: longitude,
            }}
          />
        </MapView>
      </View>
      <Pressable
        disabled={respond === "No request yet"}
        style={[styles.button, styles.buttonOpen]}
        onPress={() => {
           pressingTheButton();
        }}
      >
        <Text style={styles.textStyle}>{respond}</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  map: {
    width: windowWidth * 0.97,
    height: 0.65 * windowHeight,
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
    height: windowHeight * 0.1,
    width: windowWidth * 0.8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  finishButton: {
    height: windowHeight * 0.05,
    width: windowWidth * 0.8,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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

export default ResponderPopup;
