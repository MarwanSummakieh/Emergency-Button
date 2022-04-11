import { View } from "react-native";
import React, { useEffect } from "react";
import { mainGradient, styles} from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location';

export default function MapViewComponent() {

	const [latitude, setLatitude] = React.useState(0);
	const [longitude, setLongitude] = React.useState(0);
	const region = {
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	};

	useEffect(() => {
		(async () => {
		  let { status } = await Location.requestForegroundPermissionsAsync();
		  if (status !== 'granted') {
			alert('Permission to access location was denied');
			return;
		  }
	
		  let location = await Location.getCurrentPositionAsync({});
		  setLatitude(location.coords.latitude);
		  setLongitude(location.coords.longitude);
		  if (location  ) {
			console.log(location);
		  }

		})();
	  }, []);

	return (
		<View style={styles.container}>
			<LinearGradient
				colors={mainGradient}
				style={styles.background}
			>
				<View style={styles.container}>
                    <MapView
						style={styles.map}
						showsUserLocation={true}
						region={region}
					>
					</MapView>					
                </View>
			</LinearGradient>
		</View>
	);
}
