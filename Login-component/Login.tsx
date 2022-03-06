import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Dimensions } from "react-native";
import LoginScreenGlobe from "../assets/svgs/LoginScreenGlobe";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const mainGradient = ["rgba(52, 170, 252, 1)", "rgba(118, 10, 202, 1)"];
const buttonTextColor = "#FFFFFF";

export default function LoginScreen() {
	return (
		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={mainGradient}
				style={styles.background}
			/>

			<Text style={styles.introText}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
				porttitor molestie vulputate.
			</Text>

			{/*
            Better picture quality than png approach bellow. 
            Also should be easier to resize if needed
            */}
			<LoginScreenGlobe style={styles.globeImage} />

			{/* <Image
				source={require("../assets/images/LoginScreenGlobe.png")}
				style={styles.globeImage}
			/> */}

			<View style={styles.registerButton}>
				<Button
					title="REGISTER"
					color={buttonTextColor}
					onPress={() => Alert.alert("Register button pressed")}
				/>
			</View>
			<View style={styles.loginButton}>
				<Button
					title="LOG IN"
					color={buttonTextColor}
					onPress={() => Alert.alert("Log in button pressed")}
				/>
			</View>
		</View>
	);
}

// I'm crap at CSS so feel free to fix this up.
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
	},
	globeImage: {
		margin: 0,
		position: "absolute",
		top: "45%"
	},
	registerButton: {
		margin: 20,
		padding: 5,
		alignItems: "center",
		textAlign: "center",
		borderRadius: 70,
		backgroundColor: "#34BEF6",
		position: "absolute",
		width: 200,
		height: 54,
		bottom: 100
	},
	loginButton: {
		padding: 5,
		alignItems: "center",
		borderRadius: 70,
		borderColor: buttonTextColor,
		borderWidth: 1,
		backgroundColor: "transparent",
		position: "absolute",
		width: 200,
		height: 54,
		bottom: 50
	},
	introText: {
		// Needs to be imported for iOS
		// fontFamily: "Roboto",
		margin: 0,
		position: "absolute",
		top: "10%",
		color: buttonTextColor,
		textAlign: "left",
		paddingRight: 100,
		paddingLeft: 20,
		fontSize: 30
	}
});
