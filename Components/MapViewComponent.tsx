import { Platform, Pressable, View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { mainGradient, styles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import Map from 'google-maps-react';
import * as Location from "expo-location";
import * as geolib from "geolib";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
//import PermissionsButton from "../BackGroundProcesses/LocationSending";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function MapViewComponent() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [responder, setResponder] = useState(0);
  const [dangerStatus, setDangerStatus] = useState("Safe");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [danger_zones, setDanger_zones] = useState<any>([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };
  //for getting the coordination of the nearest user so we can use it instead of the dummy data
  const getTheNearestResponder = () => {
    fetch("put the endpoint for the nearest responder", {
      method: "GET",
    });
  };
  //getting the dangerous areas from API
  const getDangerousAreas = async () => {
    await fetch("https://bpr-api.azurewebsites.net/danger_zones/", {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        setDanger_zones(data);
        console.log(data);
      })
    );
  };
  const checkIfInDangerousArea = () => {
    for (let i = 0; i < danger_zones.length; i++) {
      if (
        (geolib.isPointInside(
          { latitude, longitude },
          danger_zones[i].location.coordinates
        ),
        danger_zones[i].radius)
      ) {
        setDangerStatus("IN DANGER");
        setNotification(true);
        console.log("in danger");
        return;
      } else {
        setDangerStatus("Safe");
        setNotification(false);
        console.log("safe");
      }
    }
  };

  const nearestResponder = () => {
    const distance = geolib.getDistance(
      {
        latitude: latitude,
        longitude: longitude,
      },
      {
        longitude: 9.840262,
        latitude: 55.863884,
      }
    );
    setResponder(distance);
  };
  const renderCirclesOfDangerousAreas = () => {
    return (
      <Circle
        center={{
          latitude: latitude,
          longitude: longitude,
        }}
        radius={500}
        strokeColor="rgba(255,0,0,0.5)"
      />
    );
  };
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        alert("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLatitude(location.coords.latitude);
      setLongitude(location.coords.longitude);
    })();
    //PermissionsButton();
    checkIfInDangerousArea();
    getDangerousAreas();
    //this doesn't make any sense to me :)
    registerForPushNotificationsAsync().then((token) => setToken(token));

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) =>
        setNotification(notification)
      );

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dangerStatus}>
        <Text style={styles.dangerStatus}>{dangerStatus}</Text>
        
      </View>
      <Pressable
        onPress={() => {
          nearestResponder();
          getDangerousAreas();
          console.log(danger_zones);
        }}
        style={styles.nearsetResponder}
      >
        <Text>The nearest Responder is: {responder}</Text>
      </Pressable>
    </View>
  );
  async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Dangerous Area",
        body: "You have entered a dangerous area!",
        data: { data: "goes here" },
      },
      trigger: null,
    });
  }

  async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
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
}
