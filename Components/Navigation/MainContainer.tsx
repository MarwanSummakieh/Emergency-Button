import { StatusBar } from "expo-status-bar";
import * as React from "react";
import {
  BottomTabNavigationProp,
  BottomTabView,
  createBottomTabNavigator,
} from "@react-navigation/bottom-tabs";
import {
  createNavigationContainerRef,
  NavigationContainer,
  NavigatorScreenParams,
  useNavigation,
} from "@react-navigation/native";
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
  Linking,
} from "react-native";
import * as Location from "expo-location";
import {
  AuthContext,
  MainNavigationParams,
  RootStackParamList,
} from "../../App";
import { useEffect, useRef, useState } from "react";
import * as SecureStore from "expo-secure-store";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import ResponderPopup from "./Screens/ResponderPopup";
import { StackNavigationProp } from "@react-navigation/stack";

const Tab = createBottomTabNavigator();

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
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
  //const navigationRef = createNavigationContainerRef();
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  //const navigation = useNavigation<BottomTabNavigationProp<MainNavigationParams>>();

  const getUserID = async () => {
    await SecureStore.getItemAsync("userID").then((value) => {
      ResponderPopup;
      setUserID(value);
    });
  };
  const sendLocationPeriodically = () => {
    console.log("updating location");
    fetch("https://bpr-api.azurewebsites.net/update_location/", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        location: {
          location_type: "Point",
          coordinates: [longitude, latitude],
        },
        last_updated: Date.now(),
        country: country,
        userID: userID,
      }),
    }).then((res) => {
      console.log(res.status);
    });
  };

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {});

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log("something please");
        Linking.openURL("./Screens/ResponderPopup");
      });
  }, []);
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
