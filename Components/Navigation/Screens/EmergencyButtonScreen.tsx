import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EmergencyButtonUnpressed from "../../../assets/svgs/emergencyPage/EmergencyButtonUnpressed";
import * as Location from "expo-location";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const mainGradient = ["rgba(52, 170, 252, 1)", "rgba(118, 10, 202, 1)"];

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
        <LinearGradient colors={mainGradient} style={styles.background}>
          <Pressable style={styles.emergencyButton} onPress={sendinglocation}>
            <EmergencyButtonUnpressed />
          </Pressable>
        </LinearGradient>
      </View>
    );
  };

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
  });
}
