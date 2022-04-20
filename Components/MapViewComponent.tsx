import { Platform, Pressable, View, Text } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import { mainGradient, styles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import MapView, { Polygon } from "react-native-maps";
import * as Location from "expo-location";
import d3, { geoContains } from "d3-geo";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";

Notifications.setNotificationHandler({
	handleNotification: async () => ({
		shouldShowAlert: true,
		shouldPlaySound: false,
		shouldSetBadge: false
	})
});

export default function MapViewComponent() {
	const [token, setToken] = useState("");
	const [notification, setNotification] = useState(false);
	const notificationListener = useRef();
	const responseListener = useRef();
	const [latitude, setLatitude] = useState(0);
	const [longitude, setLongitude] = useState(0);
	const region = {
		latitude: latitude,
		longitude: longitude,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	};
	//the geoLocation object obtained from geoJson
	const dangerousArea = [
		{ latitude: 12.538511753082275, longitude: 55.8107594520295 },
		{ latitude: 12.538619041442871, longitude: 55.8138340359014 },
		{ latitude: 12.533115148544312, longitude: 55.81333970742995 },
		{ latitude: 12.534842491149902, longitude: 55.810946345433216 },
		{ latitude: 12.538511753082275, longitude: 55.8107594520295 }
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
							[9.852354526519775, 55.8617359982937],
							[9.853706359863281, 55.86159751652741],
							[9.853438138961792, 55.86208521099058],
							[9.85249400138855, 55.86209725275172],
							[9.852354526519775, 55.8617359982937]
						]
					]
				}
			}
		]
	};
	const checkIfInDangerousArea = () => {
		if (d3.geoContains(polyObject, [longitude + 20, latitude + 10])) {
			schedulePushNotification();
		}
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
		//this doesn't make any sense to me :)
		registerForPushNotificationsAsync().then((token) => setToken(token));

		notificationListener.current =
			Notifications.addNotificationReceivedListener((notification) =>
				setNotification(notification)
			);

		responseListener.current =
			Notifications.addNotificationResponseReceivedListener(
				(response) => {
					console.log(response);
				}
			);

		return () => {
			Notifications.removeNotificationSubscription(
				notificationListener.current
			);
			Notifications.removeNotificationSubscription(
				responseListener.current
			);
		};
	}, []);

	return (
		<View style={styles.container}>
			<LinearGradient colors={mainGradient} style={styles.background}>
				<View style={styles.container}>
					<MapView
						style={styles.map}
						showsUserLocation={true}
						region={region}
					>
						<Polygon coordinates={dangerousArea} />
					</MapView>
					<Pressable onPress={checkIfInDangerousArea}>
						<Text>
							Press me to check if you are in a dangerous area
						</Text>
					</Pressable>
				</View>
			</LinearGradient>
		</View>
	);
	async function schedulePushNotification() {
		await Notifications.scheduleNotificationAsync({
			content: {
				title: "Dangerous Area",
				body: "You have entered a dangerous area!",
				data: { data: "goes here" }
			},
			trigger: null
		});
	}

	async function registerForPushNotificationsAsync() {
		let token;
		if (Constants.isDevice) {
			const { status: existingStatus } =
				await Notifications.getPermissionsAsync();
			let finalStatus = existingStatus;
			if (existingStatus !== "granted") {
				const { status } =
					await Notifications.requestPermissionsAsync();
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
				lightColor: "#FF231F7C"
			});
		}

		return token;
	}
}
