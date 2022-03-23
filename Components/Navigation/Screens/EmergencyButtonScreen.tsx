import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const mainGradient = ["rgba(52, 170, 252, 1)", "rgba(118, 10, 202, 1)"];

export default function EmergencyButtonPage() {
  return (
    <View style={styles.container}>
      <LinearGradient colors={mainGradient} style={styles.background} />

      <Text
        onPress={() => alert("Emergency Screen")}
        style={{ fontSize: 26, fontWeight: "bold" }}
      >
        Emergency Screen Press in case of emergency
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
});
