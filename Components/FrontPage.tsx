import React from "react";
import { View, Text, Button, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";

import { LinearGradient } from "expo-linear-gradient";
import {} from "react-native";
import LoginScreenGlobe from "../assets/svgs/LoginScreenGlobe";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";
import GoogleLogo from "../assets/svgs/registerPage/GoogleLogo";

import { styles, registerPageStyles, mainGradient } from "../css/styles";

WebBrowser.maybeCompleteAuthSession();

export default function FrontPage() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	const [accessToken, setAccessToken] = React.useState();
	const [userInfo, setUserInfo] = React.useState();
	const [message, setMessage] = React.useState();

	const [request, response, promptAsync] = Google.useAuthRequest({
		androidClientId:
			"57749978870-aakpp4mgb52pb3fhv7v7v1l51on9j6ar.apps.googleusercontent.com",
		iosClientId:
			"57749978870-bqjp52uk892ah7rka3496nv6267l5vd2.apps.googleusercontent.com",
		expoClientId:
			"57749978870-p1galeu9ke5jkenm3l05i3gvsqukefe8.apps.googleusercontent.com",
		selectAccount: true
	});

	React.useEffect(() => {
		setMessage(JSON.stringify(response));
		if (response?.type === "success") {
			setAccessToken(response.authentication.accessToken);
		}
	}, [response]);

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

				{/*
					Better picture quality than png approach bellow. 
					Also should be easier to resize if needed
				*/}
				<LoginScreenGlobe style={registerPageStyles.globeImage} />

				{/* <Image
						source={require("../assets/images/LoginScreenGlobe.png")}
						style={styles.globeImage}
					/> 
				*/}

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
					disabled={!request}
					onPress={() => {
						promptAsync();
					}}
					style={registerPageStyles.loginButton}
				>
					<View style={styles.buttonContainer}>
						<View style={styles.inputField}>
							<GoogleLogo />
							<Text style={styles.buttonText}>
								Sign in with Google
							</Text>
						</View>
					</View>
				</Pressable>
			</View>
		</>
	);
}
