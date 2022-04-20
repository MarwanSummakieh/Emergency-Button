import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions, Pressable, Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import EmergencyButtonUnpressed from "../../../assets/svgs/emergencyPage/EmergencyButtonUnpressed";

import EmergencyButton from "../../EmergencyButton";

import { windowHeight, windowWidth, mainGradient } from "../../../css/styles";

export default function EmergencyButtonPage() {
	return (
		<View style={styles.container}>
			<EmergencyButton />
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
		justifyContent: "center"
	},
	background: {
		height: windowHeight,
		width: windowWidth
	},
	text: {
		color: "#000000",
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	emergencyButton: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column"
	},
	emergencyButtonView: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		flexDirection: "column",
		elevation: 2
	},
	centeredView: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 22
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
			height: 2
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5
	},
	button: {
		borderRadius: 20,
		padding: 10,
		elevation: 2
	},
	buttonOpen: {
		backgroundColor: "#F194FF"
	},
	buttonClose: {
		backgroundColor: "#2196F3"
	},
	textStyle: {
		color: "white",
		fontWeight: "bold",
		textAlign: "center"
	},
	modalText: {
		marginBottom: 15,
		textAlign: "center"
	}
});
