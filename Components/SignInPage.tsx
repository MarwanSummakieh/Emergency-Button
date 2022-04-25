import { Text, View, TextInput, Pressable } from "react-native";
import React, { useContext } from "react";
import { mainGradient, registerPageStyles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import UserIcon from "../assets/image_components/registerPage/RegisterPageUserIcon";
import MailIcon from "../assets/image_components/registerPage/RegisterPageMailIcon";
import { KeyboardType } from "react-native";
import { styles } from "../css/styles";
import { firebaseAuth } from "../firebaseConfig";
import {
	GoogleAuthProvider,
	signInWithCredential,
	signInWithEmailAndPassword
} from "firebase/auth";
import { save } from "../authentication";
import { userID, userRefreshToken } from "../consts";

import * as Google from "expo-auth-session/providers/google";
import GoogleLogo from "../assets/image_components/registerPage/GoogleLogo";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, AuthContext } from "../App";
import OrLine from "./OrLine";

export default function SignInPage() {
	const { signInWithEmail, signInWithGoogle } = useContext(AuthContext);

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
	const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

	function InputField(
		icon: JSX.Element,
		onChangeFunc: React.Dispatch<React.SetStateAction<string>>,
		value: any,
		placeholder: string,
		keyboardType: KeyboardType
	) {
		return (
			<View style={styles.inputField}>
				{icon}
				<TextInput
					style={styles.inputFieldText}
					onChangeText={onChangeFunc}
					value={value}
					placeholder={placeholder}
					keyboardType={keyboardType}
				/>
			</View>
		);
	}

	React.useEffect(() => {
		if (response?.type === "success") {
			const IDtoken = response.params.id_token;
			const auth = firebaseAuth;

			const credential = GoogleAuthProvider.credential(IDtoken);
			signInWithCredential(auth, credential).then((userCredential) => {
				save(userID, userCredential.user.uid);
				save(userRefreshToken, userCredential.user.refreshToken);
				signInWithGoogle(userCredential.user.uid);
			});
		}
	}, [response]);

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

					<OrLine />

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
						"default"
					)}
					<Pressable
						onPress={() => {
							if (mail !== "" || password !== "") {
								signInWithEmail({"mail":mail,"password":password})
							}
						}}
						style={registerPageStyles.registerButton}
					>
						<View style={styles.buttonContainer}>
							<Text style={styles.buttonText}>Sign in</Text>
						</View>
					</Pressable>
				</View>
			</LinearGradient>
		</View>
	);
}
