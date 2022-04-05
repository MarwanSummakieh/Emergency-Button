import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView } from "react-native";
import { NavigationContainer, NavigatorScreenParams } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import FrontPage from "./Components/FrontPage";
import RegisterPage from "./Components/RegisterPage";
import MainContainer from "./Components/Navigation/MainContainer";
import SignInPage from "./Components/SignInPage";


// These are for type checking the navigation.
// See https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
	FrontPage: undefined;
	RegisterPage: undefined;
	SignInPage: undefined;
	MainScreenPage: NavigatorScreenParams<MainNavigationParams> // https://reactnavigation.org/docs/typescript/#nesting-navigators
};

export type MainNavigationParams = {
	Emergency: undefined;
	Map: undefined
}

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
				<NavigationContainer>
					<StatusBar style="auto" />
					<SafeAreaView style={styles.topContainer} />

					<SafeAreaView style={styles.mainContainer}>
						<Stack.Navigator>
							<Stack.Screen
								name="FrontPage"
								component={FrontPage}
								options={{
									headerTransparent: true,
									headerTitle: ""
								}}
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
							<Stack.Screen
								name="SignInPage"
								component={SignInPage}
								options={{
									headerTransparent: true,
									headerTitle: "Sign In",
									headerTintColor: "#FFF"
								}}
							/>
							<Stack.Screen
								name="MainScreenPage"
								component={MainContainer}
								options={{
									headerTransparent: true,
									headerTitle: "",
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
