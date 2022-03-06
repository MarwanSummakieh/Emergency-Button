import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View } from "react-native";
import LoginScreen from "./Login-component/Login";

export default function App() {
	return (
		<>
			<StatusBar style="auto" />
			<SafeAreaView style={styles.topContainer} />
			<SafeAreaView style={styles.mainContainer}>
				<LoginScreen />
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	// Keeps the color at the top of "SafeAreaView"
	topContainer: {
		flex: 0,
		backgroundColor: "#34AAFC"
	},

	// Keeps the color at the bottom of "SafeAreaView"
	mainContainer: {
		flex: 1,
		backgroundColor: "#760ACA"
	}
});
