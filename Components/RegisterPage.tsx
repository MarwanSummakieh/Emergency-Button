import { StyleSheet, Text, View, TextInput, Pressable } from "react-native";
import React from "react";
import { mainGradient, windowHeight, windowWidth } from "./FrontPage";
import { LinearGradient } from "expo-linear-gradient";
import UserIcon from "../assets/svgs/registerPage/RegisterPageUserIcon";
import MailIcon from "../assets/svgs/registerPage/RegisterPageMailIcon";
import { KeyboardType } from "react-native";
import { styles } from "../css/styles";

export default function RegisterPage() {
	const [name, onChangeName] = React.useState("");
	const [username, onChangeUsername] = React.useState("");
	const [mail, onChangeMail] = React.useState("");

	

	function InputField(icon:JSX.Element,onChangeFunc:Function,value:any,placeholder:string,keyboardType:KeyboardType) {
		return <View style={styles.inputField}>
			{icon}
			<TextInput
				style={styles.inputFieldText}
				onChangeText={onChangeName}
				value={value}
				placeholder={placeholder}
				keyboardType={keyboardType} />
		</View>;
	}

	return (
		<View style={styles.container}>
			<LinearGradient
				// Background Linear Gradient
				colors={mainGradient}
				style={styles.background}
			>
				<View style={styles.inputsContainer}>
					{/* One of these fields could probably be removed */}
					{InputField(<UserIcon/>, onChangeName, name, "Your Name", "default")}
					{InputField(<UserIcon/>, onChangeUsername, username, "Your Username", "default")}

					{InputField(<MailIcon/>, onChangeMail, mail, "Your Email", "email-address")}
				</View>
				<Pressable
					onPress={() => {
						alert("REGISTERED")
					}}
					style={styles.registerButton}
				>
					<View style={styles.buttonContainer}>
						<Text style={styles.buttonText}>REGISTER</Text>
					</View>
				</Pressable>
			</LinearGradient>
		</View>
	);
}