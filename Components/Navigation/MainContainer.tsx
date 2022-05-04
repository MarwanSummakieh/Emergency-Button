import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
// Importing Pages
import EmergencyButtonPage from "./Screens/EmergencyButtonScreen";
import MapScreen from "./Screens/MapScreen";
import {
	StyleSheet,
	Pressable,
	View,
	Text,
	SafeAreaView,
	Platform
} from "react-native";
import * as Location from "expo-location";
import { AuthContext } from "../../App";
import { windowHeight } from "../../css/styles";
import { useEffect, useState } from "react";
import { userID } from "../../consts";
import * as SecureStore from "expo-secure-store";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
	const { signOut } = React.useContext(AuthContext);
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const [country] = useState("Denmark");
	const [userID, setUserID] = useState("");

	const getUserID = async () => {
		await SecureStore.getItemAsync("userID").then((value) => {
			setUserID(value);
		});
	};
	const sendLocationPeriodically = () => {
		console.log("updating location");
		fetch("https://bpr-api.azurewebsites.net/update_location/", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify({
				location: {
					location_type: "Point",
					coordinates: [longitude, latitude],
					last_updated: Date.now(),
					country: country
				},
				userID: userID
			})
		}).then((res) => {
			console.log(res.status);
		});
	};
	useEffect(() => {
		let location = Location.getCurrentPositionAsync({});
		location
			.then((data) => {
				setLatitude(data.coords.latitude);
				console.log(latitude);
				setLongitude(data.coords.longitude);
				console.log(longitude);
				getUserID();
			})
			.then(() => {
				//setInterval(sendLocationPeriodically, 5000);
			});
	}, [userID]);

	return (
		<NavigationContainer independent={true}>
			<StatusBar style="auto" />
			<SafeAreaView style={styles.topContainer} />
			<SafeAreaView style={styles.mainContainer}>
				<Tab.Navigator
					initialRouteName="Emergency"
					screenOptions={{
						tabBarActiveTintColor: "#34AAFC"
					}}
				>
					<Tab.Screen
						name="Emergency"
						component={EmergencyButtonPage}
						options={{
							tabBarLabel: "Emergency",
							tabBarStyle: { position: "absolute" },
							tabBarIcon: ({ color, size }) => (
								<Ionicons
									name="shield"
									color={color}
									size={size}
								/>
							),
							headerTransparent: true,
							headerTitleAlign: "center",
							headerRight: () => (
								<Pressable
									onPress={() => signOut()}
									style={{ marginRight: 10 }}
								>
									<View>
										<Text>Sign Out</Text>
									</View>
								</Pressable>
							)
						}}
					/>
					<Tab.Screen
						name="Map"
						component={MapScreen}
						options={{
							tabBarLabel: "Map",
							tabBarIcon: ({ color, size }) => (
								<Ionicons
									name="location"
									color={color}
									size={size}
								/>
							),
							headerTransparent: true,
							headerTitleAlign: "center"
						}}
					/>
				</Tab.Navigator>
			</SafeAreaView>
		</NavigationContainer>
	);
}
const styles = StyleSheet.create({
	// Sets the color at the top of "SafeAreaView"
	topContainer: {
		flex: 0,
		backgroundColor: "transparent",
		paddingTop: Platform.OS === "android" ? 30 : 0
	},
	// Sets the color at the bottom of "SafeAreaView"
	mainContainer: {
		flex: 1,
		// backgroundColor: "#760ACA",
		backgroundColor: "red"
		// paddingTop: Platform.OS === 'android' ? 25 : 0
	}
});
