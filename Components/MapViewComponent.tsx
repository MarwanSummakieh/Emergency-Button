import { View } from "react-native";
import React, { useEffect} from "react";
import { mainGradient, styles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import MapView, {Polygon } from "react-native-maps";
import * as Location from "expo-location";
import { geoContains } from "d3-geo";
import Notification from 'react-native-system-notification';
export default function MapViewComponent() {
  const [latitude, setLatitude] = React.useState(0);
  const [longitude, setLongitude] = React.useState(0);
  const region = {
    latitude: latitude,
    longitude: longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  //the geoLocation object obtained from geoJson
  const dangerousArea = [
    { latitude: 12.538511753082275, longitude: 55.8107594520295 },
    { latitude: 12.538619041442871, longitude: 55.8138340359014 },
    { latitude: 12.533115148544312, longitude: 55.81333970742995 },
    { latitude: 12.534842491149902, longitude: 55.810946345433216 },
    { latitude: 12.538511753082275, longitude: 55.8107594520295 },
  ];
  const polyObject = {
    geometries: [],
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        properties: {},
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [12.538511753082275, 55.8107594520295],
              [12.538619041442871, 55.8138340359014],
              [12.533115148544312, 55.81333970742995],
              [12.534842491149902, 55.810946345433216],
              [12.538511753082275, 55.8107594520295],
            ],
          ],
        },
      },
    ],
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
      //need to check if the location is within the geoJson polygon
      if (geoContains(polyObject, [longitude, latitude])) {
        console.log("inside");
        Notification.create({subject: "Dangerous Area", body: "You are in a dangerous area"});
      } else {
        console.log("outside");
      }
    })();
  },[]);

  return (
    <View style={styles.container}>
      <LinearGradient colors={mainGradient} style={styles.background}>
        <View style={styles.container}>
          <MapView style={styles.map} showsUserLocation={true} region={region}>
            <Polygon coordinates={dangerousArea} />
          </MapView>
        </View>
      </LinearGradient>
    </View>
  );
}
