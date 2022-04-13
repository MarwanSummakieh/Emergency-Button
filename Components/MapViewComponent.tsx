import { View } from "react-native";
import React, { useEffect } from "react";
import { mainGradient, styles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Circle, Marker } from "react-native-maps";
import * as Location from "expo-location";
import d3, { geoContains } from "d3-geo";
import { Polygon } from "react-native-svg";
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
  const dangerousArea = 
    {
      "type": "FeatureCollection",
      "features": [
        {
          "type": "Feature",
          "properties": {},
          "geometry": {
            "type": "Polygon",
            "coordinates": [
              [
                [
                  12.538511753082275,
                  55.8107594520295
                ],
                [
                  12.538619041442871,
                  55.8138340359014
                ],
                [
                  12.533115148544312,
                  55.81333970742995
                ],
                [
                  12.534842491149902,
                  55.810946345433216
                ],
                [
                  12.538511753082275,
                  55.8107594520295
                ]
              ]
            ]
          }
        }
      ]
    };
  const dangerousCircle = {
    latitude: 55.86,
    longitude: 9.84,
    radius: 100,
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
      if(d3.geoContains(dangerousCircle, [longitude, latitude])){
        console.log("inside");
      }
     
    })();
  }, []);

  return (
    <View style={styles.container}>
      <LinearGradient colors={mainGradient} style={styles.background}>
        <View style={styles.container}>
          <MapView style={styles.map} showsUserLocation={true} region={region}>
            <Polygon
              points={[
                [12.538511753082275, 55.8107594520295],
                [12.538619041442871, 55.8138340359014],
                [12.533115148544312, 55.81333970742995],
                [12.534842491149902, 55.810946345433216],
                [12.538511753082275, 55.8107594520295],
              ]}
            ></Polygon>
          </MapView>
        </View>
      </LinearGradient>
    </View>
  );
}
