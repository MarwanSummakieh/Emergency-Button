import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  Alert,
  Pressable,
  Dimensions,
} from "react-native";
import {
  createStackNavigator,
  StackNavigationProp,
} from "@react-navigation/stack";
import * as WebBrowser from "expo-web-browser";
import { ResponseType } from "expo-auth-session";
import * as Google from "expo-auth-session/providers/google";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { LinearGradient } from "expo-linear-gradient";
import {} from "react-native";
import LoginScreenGlobe from "../assets/svgs/LoginScreenGlobe";
import { RootStackParamList } from "../App";
import { useNavigation } from "@react-navigation/native";

export const windowWidth = Dimensions.get("window").width;
export const windowHeight = Dimensions.get("window").height;

export const mainGradient = ["rgba(52, 170, 252, 1)", "rgba(118, 10, 202, 1)"];
const buttonTextColor = "#FFFFFF";
initializeApp({
  /* Config */
});
WebBrowser.maybeCompleteAuthSession();
export default function FrontPage() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "1022788426440-l8m9nh59vfgod48vhfkidai0n8lffn6q.apps.googleusercontent.com",
  });

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;

      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const credential = provider.credential(id_token);
      signInWithCredential(auth, credential);
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

        <Text style={styles.introText}>
          Salvatio Push is a social rescue system enabling fast response to
          danger
        </Text>

        {/*
					Better picture quality than png approach bellow. 
					Also should be easier to resize if needed
					*/}
        <LoginScreenGlobe style={styles.globeImage} />

        {/* <Image
						source={require("../assets/images/LoginScreenGlobe.png")}
						style={styles.globeImage}
					/> */}

        <Pressable
          onPress={() => {
            navigation.navigate("RegisterPage");
          }}
          style={styles.registerButton}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>REGISTER</Text>
          </View>
        </Pressable>

        <Pressable
          onPress={() => {
            navigation.navigate("LoginPage");
          }}
          style={styles.loginButton}
        >
          <View style={styles.buttonContainer}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </View>
        </Pressable>
        <Button
          disabled={!request}
          title="Login"
          onPress={() => {
            promptAsync();
          }}
        />
      </View>
    </>
  );
}

// I'm crap at CSS so feel free to fix this up.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  background: {
    flex: 1,
    height: windowHeight,
    width: windowWidth,
  },
  globeImage: {
    margin: 0,
    position: "absolute",
    top: "45%",
  },
  registerButton: {
    margin: 20,
    padding: 5,
    alignItems: "center",
    textAlign: "center",
    borderRadius: 70,
    backgroundColor: "#34BEF6",
    position: "absolute",
    width: 200,
    height: 54,
    bottom: 100,
  },
  loginButton: {
    fontFamily: "roboto_400",
    color: "black",
    padding: 5,
    alignItems: "center",
    borderRadius: 70,
    borderColor: buttonTextColor,
    borderWidth: 1,
    backgroundColor: "transparent",
    position: "absolute",
    width: 200,
    height: 54,
    bottom: 50,
  },
  introText: {
    fontFamily: "roboto_400",
    margin: 0,
    position: "absolute",
    top: "10%",
    color: buttonTextColor,
    textAlign: "left",
    paddingRight: 100,
    paddingLeft: 20,
    fontSize: 30,
  },
  buttonText: {
    fontFamily: "roboto_400",
    color: buttonTextColor,
    fontSize: 20,
  },
  buttonContainer: {
    justifyContent: "center", //Centered horizontally
    alignItems: "center", //Centered vertically
    flex: 1,
  },
});
