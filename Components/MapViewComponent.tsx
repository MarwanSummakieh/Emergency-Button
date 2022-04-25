import { Platform, Pressable, View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { mainGradient, styles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Circle } from "react-native-maps";
import * as Location from "expo-location";
import * as geolib from "geolib";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import PermissionsButton from "../BackGroundProcesses/LocationSending";


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
  //the geoLocation object obtained from geoJson
  const dangerousArea = {
    geometries: [],
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [9.837677478790283, 55.863749949055865],
    },
    properties: {
      subType: "Circle",
      radius: 100000,
    },
  };

  const checkIfInDangerousArea = () => {
    if (
      geolib.isPointWithinRadius(
        {
          latitude: latitude,
          longitude: longitude,
        },
        {
          //latitude: 55.863884,
          //longitude: 9.840262,
          latitude: latitude,
          longitude: longitude,
        },
        10
      )
    ) {
      schedulePushNotification();
      setDangerStatus("in danger");
      //don't know if this would work yet
      //styles.dangerStatus.backgroundColor = "red";
    }
  };
  1;
  const nearestResponder = () => {
    const distance = geolib.getDistance(
      {
        latitude: latitude,
        longitude: longitude,
      },
      {
        latitude: 55.863884,
        longitude: 9.840262,
      }
    );
    setResponder(distance);
    setTimeout(() => {
      styles.dangerStatus.backgroundColor = "red";
    }, 1000);
  };
  useEffect(() => {
    // (async () => {
    // let { status } = await Location.requestForegroundPermissionsAsync();
    //if (status !== "granted") {
    // alert("Permission to access location was denied");
    // return;
    //}

    //let location = await Location.getCurrentPositionAsync({});
    // setLatitude(location.coords.latitude);
    //setLongitude(location.coords.longitude);

    //}
    //)();
    PermissionsButton();
    checkIfInDangerousArea();
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
      <View style={styles.container}>
        <View style={styles.dangerStatus}>
          <Text style={styles.dangerStatus}>{dangerStatus}</Text>
          <MapView
            style={styles.map}
            showsUserLocation={true}
            region={region}
          ></MapView>
          <Pressable
            onPress={() => {
              nearestResponder();
            }}
            style={styles.nearsetResponder}
          >
            <Text>The nearest Responder is: {responder}</Text>
          </Pressable>
        </View>
      </View>
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
