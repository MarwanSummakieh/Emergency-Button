import React from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EmergencyButtonUnpressed from "../../../assets/svgs/emergencyPage/EmergencyButtonUnpressed";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const mainGradient = ["rgba(52, 170, 252, 1)", "rgba(118, 10, 202, 1)"];

export default function EmergencyButtonPage() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={mainGradient} style={styles.background}>
        <Pressable style={styles.emergencyButton}>
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
});
