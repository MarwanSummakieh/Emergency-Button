import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import EmergencyButtonPage from "./Screens/EmergencyButtonScreen";
import MapScreen from "./Screens/MapScreen";
import {
  StyleSheet,
  Pressable,
  View,
  Text,
  SafeAreaView,
  Platform,
} from "react-native";
import * as Location from "expo-location";
import { AuthContext, MainNavigationParams } from "../../App";
import { createContext, useEffect, useMemo, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import ResponderPopup from "./Screens/ResponderPopup";
import { getValueFor } from "../../authentication";
import * as Device from "expo-device";
const Tab = createBottomTabNavigator<MainNavigationParams>();

export const NotificationContext = createContext({
  notification: {},
  setNotification: (prop) => {},
});

async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}
export default function MainContainer() {
  const { signOut } = React.useContext(AuthContext);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [country] = useState("Denmark");
  const [userID, setUserID] = useState("");
  
  const [notification, setNotification] = useState({});
  const value = useMemo(
    () => ({ notification, setNotification }), 
    [notification]
  );

  const sendLocationPeriodically = async () => {
    const token = await registerForPushNotificationsAsync();
    const uid = await getValueFor("userID");
    console.log("updating location");
    fetch("https://bpr-api.azurewebsites.net/update_location/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        last_updated: Date.now(),
        country: country,
        userID: uid,
        expo_token: token,
      }),
    }).then((res) => {
      console.log(res.status);
    });
  };

  useEffect(() => {
    let location = Location.getCurrentPositionAsync({});
    location
      .then(async (data) => {
        const token = await registerForPushNotificationsAsync();
        const uid = await getValueFor("userID");
        console.log((await location).coords.latitude);
        console.log((await location).coords.longitude);
        console.log("updating location");
        fetch("https://bpr-api.azurewebsites.net/update_location/", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: {
              type: "Point",
              coordinates: [(await location).coords.longitude,(await location).coords.latitude],
            },
            last_updated: Date.now(),
            country: country,
            userID: uid,
            expo_token: token,
          }),
        }).then((res) => {
          console.log(res.status);
        });
      })
  }, [userID]);

  return (
    <NotificationContext.Provider value={value}>
      <NavigationContainer independent={true}>
        <StatusBar style="auto" />
        <SafeAreaView style={styles.topContainer} />
        <SafeAreaView style={styles.mainContainer}>
          <Tab.Navigator
            initialRouteName="Emergency"
            screenOptions={{
              tabBarActiveTintColor: "#34AAFC",
            }}
          >
            <Tab.Screen
              name="Respond"
              component={ResponderPopup}
              options={{
                tabBarLabel: "Respond",
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="megaphone" color={color} size={size} />
                ),
                headerTransparent: true,
                headerTitleAlign: "center",
              }}
            />
            <Tab.Screen
              name="Emergency"
              component={EmergencyButtonPage}
              options={{
                tabBarLabel: "Emergency",
                tabBarStyle: { position: "absolute" },
                tabBarIcon: ({ color, size }) => (
                  <Ionicons name="shield" color={color} size={size} />
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
                headerTransparent: true,
                headerTitleAlign: "center",
              }}
            />
          </Tab.Navigator>
        </SafeAreaView>
      </NavigationContainer>
    </NotificationContext.Provider>
  );
}
const styles = StyleSheet.create({
  // Sets the color at the top of "SafeAreaView"
  topContainer: {
    flex: 0,
    backgroundColor: "transparent",
    paddingTop: Platform.OS === "android" ? 30 : 0,
  },
  // Sets the color at the bottom of "SafeAreaView"
  mainContainer: {
    flex: 1,
    // backgroundColor: "#760ACA",
    backgroundColor: "red",
    // paddingTop: Platform.OS === 'android' ? 25 : 0
  },
});
