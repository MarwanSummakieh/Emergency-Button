// expo install expo-web-browser expo-auth-session expo-random
import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View, Text, Image, Button } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { authProvider, firebaseApp, firebaseAuth } from "../firebaseConfig";
import { GoogleAuthProvider, signInWithCredential } from "firebase/auth";

WebBrowser.maybeCompleteAuthSession();


// ONLY FOR TESTING
export default function GoogleLogin() {
	const [IDToken, setIDToken] = React.useState("");
	const [userInfo, setUserInfo] = React.useState();
	const [message, setMessage] = React.useState();

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
			// const { id_token } = response.params;

			const IDtoken = response.params.id_token;
			const auth = firebaseAuth;

			const credential = GoogleAuthProvider.credential(IDtoken);
			// console.log(response);
			signInWithCredential(auth, credential).then( (userCredential) => {
				console.log(userCredential)
			})
		}
		// setMessage(JSON.stringify(response));
		// if (response?.type === "success") {
		// 	setAccessToken(response.authentication.accessToken);
		// }
	}, [response]);

	async function getUserData() {
		let userInfoResponse = await fetch(
			"https://www.googleapis.com/userinfo/v2/me",
			{
				headers: { Authorization: `Bearer ${IDToken}` }
			}
		);

		userInfoResponse.json().then((data) => {
			setUserInfo(data);
		});
	}

	function showUserInfo() {
		if (userInfo) {
			return (
				<View style={styles.userInfo}>
					<Image
						source={{ uri: userInfo.picture }}
						style={styles.profilePic}
					/>
					<Text>Welcome {userInfo.name}</Text>
					<Text>{userInfo.email}</Text>
				</View>
			);
		}
	}

	return (
		<View style={styles.container}>
			{/* {showUserInfo()} */}
			<Button
				title={"Login"}
				onPress={() => {
					promptAsync({
						useProxy: true,
						showInRecents: true
					});
				}}
			/>
			<StatusBar style="auto" />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	userInfo: {
		alignItems: "center",
		justifyContent: "center"
	},
	profilePic: {
		width: 50,
		height: 50
	}
});
