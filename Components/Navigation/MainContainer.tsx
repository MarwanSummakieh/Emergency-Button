import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import Ionicons from "react-native-vector-icons/Ionicons";

// Importing Pages
import EmergencyButtonPage from "./Screens/EmergencyButtonScreen";
import MapScreen from "./Screens/MapScreen";
import { LinearGradient } from "react-native-svg";
import { StatusBar } from "expo-status-bar";

const Tab = createBottomTabNavigator();

export default function MainContainer() {
  return (
    <NavigationContainer independent={true}>
      <StatusBar style="auto" />
      <Tab.Navigator
        initialRouteName="Emergency"
        screenOptions={{
          tabBarActiveTintColor: "#34AAFC",
        }}
      >
        <Tab.Screen
          name="Emergency"
          component={EmergencyButtonPage}
          options={{
            headerTitle: "",
            tabBarLabel: "Emergency",
            tabBarStyle: { position: "absolute" },
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="shield" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Map"
          component={MapScreen}
          options={{
            tabBarLabel: "Map",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="location" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
