import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import FrontPage from "./Components/FrontPage";
import RegisterPage from "./Components/RegisterPage";
import GoogleLogin from "./Components/GoogleLogin";

export type RootStackParamList = {
	FrontPage: undefined;
	RegisterPage: undefined;
	LoginPage: undefined;
};

interface GlobalContext {}

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
	let [fontsLoaded] = useFonts({
		roboto_400: Roboto_400Regular
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	} else {
		return (
			<>

				{/* <GoogleLogin/> */}


				<NavigationContainer>
					<StatusBar style="auto" />
					<SafeAreaView style={styles.topContainer} />

					<SafeAreaView style={styles.mainContainer}>
						<Stack.Navigator>
							<Stack.Screen
								name="FrontPage"
								component={FrontPage}
								options={{ headerTransparent: true, headerTitle: "" }}
							/>
							<Stack.Screen
								name="RegisterPage"
								component={RegisterPage}
								options={{
									headerTransparent: true,
									headerTitle: "Register",
									headerTintColor: "#FFF"
								}}
							/>
						</Stack.Navigator>
					</SafeAreaView>
				</NavigationContainer>
			</>
		);
	}
}

const styles = StyleSheet.create({
	// Sets the color at the top of "SafeAreaView"
	topContainer: {
		flex: 0,
		backgroundColor: "#34AAFC"
	},
	// Sets the color at the bottom of "SafeAreaView"
	mainContainer: {
		flex: 1,
		backgroundColor: "#760ACA"
	}
});
