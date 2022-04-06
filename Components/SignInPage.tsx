import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import { mainGradient, registerPageStyles } from "../css/styles";
import { LinearGradient } from "expo-linear-gradient";
import UserIcon from "../assets/image_components/registerPage/RegisterPageUserIcon";
import MailIcon from "../assets/image_components/registerPage/RegisterPageMailIcon";
import { KeyboardType } from "react-native";
import { styles } from "../css/styles";
import { firebaseAuth } from "../firebaseConfig";
import { signInWithEmailAndPassword } from "firebase/auth";
import { save } from "../authentication";
import { userID, userRefreshToken } from "../consts";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../App";

export default function SignInPage() {
	const [mail, onChangeMail] = React.useState("");
	const [password, onChangePassword] = React.useState("");

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

	return (
		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={mainGradient}
				style={styles.background}
			>
				<View style={styles.inputsContainer}>
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
								signInWithEmailAndPassword(
									firebaseAuth,
									mail,
									password
								)
									.then((credential) => {
										save(userID, credential.user.uid);
										save(
											userRefreshToken,
											credential.user.refreshToken
										);
										alert("Sign in Successful");
										console.log(credential);

										navigation.navigate("MainScreenPage", {
											screen: "Emergency"
										});
									})
									.catch((error) => {
										alert(error.message);
										//Whatever else when wrong credentials are used.
									});
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
