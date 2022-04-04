import React from "react";
import { View, Text, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";

import { LinearGradient } from "expo-linear-gradient";
import {} from "react-native";
import LoginScreenGlobe from "../assets/image_components/LoginScreenGlobe";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import GoogleLogo from "../assets/image_components/registerPage/GoogleLogo";

import { styles, registerPageStyles, mainGradient } from "../css/styles";

WebBrowser.maybeCompleteAuthSession();

export default function FrontPage() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const [accessToken, setAccessToken] = React.useState();
	const [userInfo, setUserInfo] = React.useState();
	const [message, setMessage] = React.useState();

	// const [request, response, promptAsync] = Google.useAuthRequest({
	// 	androidClientId:
	// 		"57749978870-aakpp4mgb52pb3fhv7v7v1l51on9j6ar.apps.googleusercontent.com",
	// 	iosClientId:
	// 		"57749978870-bqjp52uk892ah7rka3496nv6267l5vd2.apps.googleusercontent.com",
	// 	expoClientId:
	// 		"57749978870-p1galeu9ke5jkenm3l05i3gvsqukefe8.apps.googleusercontent.com",
	// 	selectAccount: true
	// });

	// React.useEffect(() => {
	// 	setMessage(JSON.stringify(response));
	// 	if (response?.type === "success") {
	// 		setAccessToken(response.authentication.accessToken);
	// 	}
	// }, [response]);

	return (
		<>
			<View style={styles.container}>
				<LinearGradient
					// Background Linear Gradient
					colors={mainGradient}
					style={styles.background}
				/>

				<Text style={registerPageStyles.introText}>
					Salvatio Push is a social rescue system enabling fast
					response to danger
				</Text>

				<LoginScreenGlobe style={registerPageStyles.globeImage} />

				<Pressable
					onPress={() => {
						navigation.navigate("RegisterPage");
					}}
					style={registerPageStyles.registerButton}
				>
					<View style={styles.buttonContainer}>
						
						<Text style={styles.buttonText}>REGISTER</Text>
					</View>
				</Pressable>

				<Pressable
					onPress={() => {
						navigation.navigate("LoginPage");
					}}
					style={registerPageStyles.loginButton}
				>
					<View style={styles.buttonContainer}>
						<Text style={styles.buttonText}>
							SIGN IN 
						</Text>
					</View>
				</Pressable>
				<Pressable
					onPress = {() => {
						navigation.navigate("MapViewComponent");
					}}>
					<Text>map</Text>
				</Pressable>
			</View>
		</>
	);
}
