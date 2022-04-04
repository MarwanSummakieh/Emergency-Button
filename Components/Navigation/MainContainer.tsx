import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import NavBarEmergency from "../../assets/image_components/emergencyPage/NavBarEmergencyIcon";
import NavBarMapIcon from "../../assets/image_components/emergencyPage/NavBarEmergencyIcon";

// Importing Screens/Pages
import EmergencyButtonPage from "./Screens/EmergencyButtonScreen";
import MapScreen from "./Screens/MapScreen";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
	return (
		<NavigationContainer independent={true}>
			<Tab.Navigator
				initialRouteName="Emergency"
				screenOptions={{
					tabBarActiveTintColor: "#e91e63"
				}}
			>
				<Tab.Screen
					name="Emergency"
					component={EmergencyButtonPage}
					options={{
						tabBarLabel: "Emergency",
						tabBarIcon: () => <NavBarEmergency />
					}}
				/>
				<Tab.Screen
					name="Map"
					component={MapScreen}
					options={{
						tabBarLabel: "Map",
						tabBarIcon: () => <NavBarMapIcon />
					}}
				/>
			</Tab.Navigator>
		</NavigationContainer>
	);
}
