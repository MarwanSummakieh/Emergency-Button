import React from "react";
import { View, Text, Pressable } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";

import { LinearGradient } from "expo-linear-gradient";
import {} from "react-native";
import LoginScreenGlobe from "../assets/image_components/LoginScreenGlobe";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

import { styles, registerPageStyles, mainGradient } from "../css/styles";

WebBrowser.maybeCompleteAuthSession();

export default function FrontPage() {
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

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
						navigation.navigate("SignInPage");
					}}
					style={registerPageStyles.loginButton}
				>
					<View style={styles.buttonContainer}>
						<Text style={styles.buttonText}>SIGN IN</Text>
					</View>
				</Pressable>
				<Pressable
					onPress={() => {
						navigation.navigate("MainScreenPage", {
							screen: "Emergency"
						});
					}}
				>
					<Text>map</Text>
				</Pressable>
			</View>
		</>
	);
}
