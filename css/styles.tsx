import { StyleSheet } from "react-native";
import { windowHeight, windowWidth } from "../Components/FrontPage";

const buttonTextColor = "#FFFFFF";

export const styles = StyleSheet.create({
	buttonText: {
		fontFamily: "roboto_400",
		color: buttonTextColor,
		fontSize: 20
	},
	buttonContainer: {
		justifyContent: "center", //Centered horizontally
		alignItems: "center", //Centered vertically
		flex: 1
	},
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
	inputsContainer: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	inputField: {
		borderColor: "transparent",
		width: 300,
		height: 50,
		margin: 12,
		borderWidth: 1,
		padding: 10,
		backgroundColor: "#FFFF",
		// opacity: 0.8,
		borderRadius: 20,
		alignItems: "center",
		flexDirection: "row"
	},
	inputFieldText: {
		paddingLeft: 14
	},
	icon: {
		color: "#34AAFC"
	},
	registerButton: {
		margin: 20,
		padding: 5,

		textAlign: "center",
		borderRadius: 70,
		backgroundColor: "#34BEF6",
		flex: 0,
		alignItems: "center",
		justifyContent: "center",
		width: 200,
		height: 54,
		bottom: 100
	}
});
