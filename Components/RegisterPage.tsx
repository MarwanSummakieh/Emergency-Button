import { StyleSheet, Text, View, TextInput } from "react-native";
import React from "react";
import { mainGradient, windowHeight, windowWidth } from "./FrontPage";
import { LinearGradient } from "expo-linear-gradient";

export default function RegisterPage() {
	return (
		<View style={styles.container}>
			{/* <LinearGradient
				// Background Linear Gradient
				colors={mainGradient}
				style={styles.background}
			/> */}
			<View>
				{/* <TextInput
					style={styles.inputField}
					onChangeText={onChangeText}
					value={text}
				/>
				<TextInput
					style={styles.inputField}
					onChangeText={onChangeNumber}
					value={number}
					placeholder="useless placeholder"
					keyboardType="numeric"
				/> */}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	background: {
		flex: 1,
		height: windowHeight,
		width: windowWidth,
        
	},
    inputField: {
        borderColor: "#34AAFC",
    }
});
