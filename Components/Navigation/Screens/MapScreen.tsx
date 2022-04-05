import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapViewComponent from "../../MapViewComponent";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export default function EmergencyButtonPage() {
	return (
		<View style={styles.container}>
			{/* <LinearGradient colors={mainGradient} style={styles.background} /> */}

				{/* <Text
			onPress={() => alert("Emergency Screen")}
			style={{ fontSize: 26, fontWeight: "bold" }}
		>
			Map Screen Press in case of emergency
		</Text> */}
			<MapViewComponent/>

		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	background: {
		flex: 1,
		height: windowHeight,
		width: windowWidth
	}
});
