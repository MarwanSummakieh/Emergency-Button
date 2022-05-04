import { Platform, Pressable, View, Text, Dimensions } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { mainGradient, styles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import MapView, { Circle } from "react-native-maps";
import * as geolib from "geolib";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { userID } from "../consts";
import * as SecureStore from "expo-secure-store";
export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;
//import PermissionsButton from "../BackGroundProcesses/LocationSending";




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function MapViewComponent() {
  const [token, setToken] = useState("");
  const [notification, setNotification] = useState(false);
  const [responder, setResponder] = useState("");
  const [dangerStatus, setDangerStatus] = useState("");
  const notificationListener = useRef();
  const responseListener = useRef();
  const [danger_zones, setDanger_zones] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.001,
    longitudeDelta: 0.001,
  };
  const uid = SecureStore.getItemAsync(userID);

  //for getting the coordination of the nearest user so we can use it instead of the dummy data
  const getTheNearestResponder = () => {
    fetch("http://localhost:7071/nearest_responders/", {
      method: "POST",
      body: JSON.stringify({
        "userID": uid,
        "location": {
          "type": "string",
          "coordinates": [
            longitude,
            latitude
          ]
        },
        "last_updated": Date.now(),
        "country": "string",
        "expo_token": registerForPushNotificationsAsync(),
      }),
    }).then((res) => {
      res.json().then((data) => {
        setResponder(data);
        console.log(responder);
      });
    });
  };

  //getting the dangerous areas from API
  const getDangerousAreas = async () => {
    await fetch("https://bpr-api.azurewebsites.net/danger_zones/", {
      method: "GET",
    }).then((res) =>
      res.json().then((data) => {
        setDanger_zones(data.danger_zones);
      })
    );
  };
  const checkIfInDanger = () => {
    if (danger_zones.length > 0) {
      for (let i = 0; i < danger_zones.length; i++) {
        if (
          geolib.isPointWithinRadius(
            { latitude: latitude, longitude: longitude },
            {
              latitude: danger_zones[i].location.coordinates[0],
              longitude: danger_zones[i].location.coordinates[1],
            },
            danger_zones[i].radius
          )
        ) {
          setDangerStatus("In Danger");
          if (notification === false) {
            dangerNotification();
            setNotification(true);
          }
          return;
        } else {
          setDangerStatus("Safe");
        }
      }
    }
  };
  const renderDangerousAreas = () => {
    if (danger_zones.length > 0) {
      return danger_zones.map((danger_zone) => {
        return (
          <Circle
            center={{
              latitude: danger_zone.location.coordinates[0],
              longitude: danger_zone.location.coordinates[1],
            }}
            radius={danger_zone.radius}
            fillColor="rgba(255,0,0,0.5)"
          />
        );
      });
    } else {
      return <></>;
    }
  };
  const changinhTheColorOfTheDangerousArea = () => {
    if (dangerStatus === "In Danger") {
      return "red";
    } else if (dangerStatus === "Safe") {
      return "skyblue";
    }
  };

  useEffect(() => {
    getDangerousAreas();
    getTheNearestResponder();
  }, []);

  useEffect(() => {
    checkIfInDanger();
    renderDangerousAreas();
    changinhTheColorOfTheDangerousArea();
  }, [danger_zones]);
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
      <View
        style={{
          borderRadius: 30,
          height: 0.87 * windowHeight,
          backgroundColor: changinhTheColorOfTheDangerousArea(),
          alignItems: "center",
          paddingBottom: 0.03 * windowHeight,
          marginTop: 0.03 * windowHeight,
        }}
      >
        <Text style={styles.dangerStatus}>{dangerStatus}</Text>
        <MapView
          style={styles.map}
          region={region}
          showsUserLocation={true}
          showsMyLocationButton={true}
        >
          {renderDangerousAreas()}
        </MapView>
        <Pressable
        onPress={() => {
          getDangerousAreas();
          getTheNearestResponder();
        }}
        style={styles.nearsetResponder}
      >
        <Text>The nearest Responder is: {responder}</Text>
        <Text
          style={{
            fontStyle: "italic",
          }}
        >
          press to refresh
        </Text>
      </Pressable>
      </View>
      
    </View>
  );
  async function dangerNotification() {
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
