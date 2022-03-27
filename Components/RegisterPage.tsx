import { Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import { mainGradient, registerPageStyles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import UserIcon from "../assets/image_components/registerPage/RegisterPageUserIcon";
import MailIcon from "../assets/image_components/registerPage/RegisterPageMailIcon";
import { KeyboardType } from "react-native";
import { styles } from "../css/styles";
import { firebaseAuth } from "../firebaseConfig";
import {
	createUserWithEmailAndPassword,
	GoogleAuthProvider,
	signInWithCredential
} from "firebase/auth";
import * as Google from "expo-auth-session/providers/google";
import GoogleLogo from "../assets/image_components/registerPage/GoogleLogo";
import { save } from "../authentication";

export default function RegisterPage() {
	const [mail, onChangeMail] = React.useState("");
	const [password, onChangePassword] = React.useState("");

	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		// androidClientId:
		// 	"57749978870-aakpp4mgb52pb3fhv7v7v1l51on9j6ar.apps.googleusercontent.com",
		// iosClientId:
		// 	"57749978870-bqjp52uk892ah7rka3496nv6267l5vd2.apps.googleusercontent.com",
		expoClientId:
			"57749978870-p1galeu9ke5jkenm3l05i3gvsqukefe8.apps.googleusercontent.com",
		selectAccount: true
	});

	React.useEffect(() => {
		if (response?.type === "success") {
			const IDtoken = response.params.id_token;
			const auth = firebaseAuth;

			const credential = GoogleAuthProvider.credential(IDtoken);
			signInWithCredential(auth, credential).then((userCredential) => {
				save("userUID", userCredential.user.uid);
			});
		}
	}, [response]);

	function InputField(
		icon: JSX.Element,
		onChangeFunc: React.Dispatch<React.SetStateAction<string>>,
		value: any,
		placeholder: string,
		keyboardType: KeyboardType,
		secureText: boolean = false
	) {
		return (
			<View style={styles.inputField}>
				{icon}
				<TextInput
					style={styles.inputFieldText}
					onChangeText={onChangeFunc}
					value={value}
					secureTextEntry={secureText}
					placeholder={placeholder}
					keyboardType={keyboardType}
				/>
			</View>
		);
	}

	function signUpWithEmail() {
		if (password != "" && mail != "") {
			createUserWithEmailAndPassword(firebaseAuth, mail, password).then(
				(response) => {
					console.log(response);
					response;
				}
			);
		}
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={mainGradient}
				style={styles.background}
			>
				<View style={styles.inputsContainer}>
					<Pressable
						onPress={() => {
							promptAsync();
						}}
						style={registerPageStyles.googleRegisterButton}
					>
						<View style={styles.buttonContainer}>
							<GoogleLogo />
							<Text
								style={{
									color: "black",
									fontSize: 20,
									fontFamily: "roboto_400"
								}}
							>
								Sign in with Google
							</Text>
						</View>
					</Pressable>
					<View
						style={{ flexDirection: "row", alignItems: "center" }}
					>
						<View
							style={{
								flex: 1,
								height: 1,
								backgroundColor: "lightgrey"
							}}
						/>
						<View>
							<Text
								style={{
									width: 50,
									textAlign: "center",
									color: "lightgrey"
								}}
							>
								OR
							</Text>
						</View>
						<View
							style={{
								flex: 1,
								height: 1,
								backgroundColor: "lightgrey"
							}}
						/>
					</View>

					{/* One of these fields could probably be removed */}
					{InputField(
						<MailIcon />,
						onChangeMail,
						mail,
						"Your Email",
						"email-address"
					)}

					{InputField(
						<UserIcon />,
						onChangePassword,
						password,
						"Your Password",
						"default",
						true
					)}
					{/* {InputField(
						<UserIcon />,
						onChangeName,
						name,
						"Your Name",
						"default"
					)}
					{InputField(
						<UserIcon />,
						onChangeUsername,
						username,
						"Your Username",
						"default"
					)} */}
					<Pressable
						onPress={() => {
							signUpWithEmail();
							alert("REGISTERED");
							// navigation.navigate("MainScreen")	//Or whatever we decide to call it
						}}
						style={registerPageStyles.registerButton}
					>
						<View style={styles.buttonContainer}>
							<Text style={styles.buttonText}>REGISTER</Text>
						</View>
					</Pressable>
				</View>
			</LinearGradient>
		</View>
	);
}
