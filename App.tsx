import { StatusBar } from "expo-status-bar";
import { StyleSheet, SafeAreaView, LogBox, Platform } from "react-native";
import {
	NavigationContainer,
	NavigatorScreenParams
} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AppLoading from "expo-app-loading";
import { useFonts, Roboto_400Regular } from "@expo-google-fonts/roboto";
import FrontPage from "./Components/FrontPage";
import RegisterPage from "./Components/RegisterPage";
import MainContainer from "./Components/Navigation/MainContainer";
import SignInPage from "./Components/SignInPage";
import { deleteValue, getValueFor, save } from "./authentication";
// import { userID } from "./consts";
// This import is only for testing the login/register flow
import * as SecureStore from "expo-secure-store";
import {
	createContext,
	useContext,
	useEffect,
	useLayoutEffect,
	useMemo,
	useReducer,
	useState
} from "react";
import { userID, userRefreshToken } from "./consts";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword
} from "firebase/auth";
import { firebaseAuth } from "./firebaseConfig";

// These are for type checking the navigation.
// See https://reactnavigation.org/docs/typescript/
export type RootStackParamList = {
	FrontPage: undefined;
	RegisterPage: undefined;
	SignInPage: undefined;
	MainContainer: NavigatorScreenParams<MainNavigationParams>; // https://reactnavigation.org/docs/typescript/#nesting-navigators
};

export type MainNavigationParams = {
	Emergency: undefined;
	Map: undefined;
};

// Navigation could be refactored using this approach
// https://reactnavigation.org/docs/connecting-navigation-prop/

const Stack = createStackNavigator<RootStackParamList>();

interface AuthContextInterface {
	signInWithEmail: (data: any) => Promise<void>;
	signOut: Function;
	signUpWithEmail: (data: any) => Promise<void>;
	signInWithGoogle: Function;
}

export const AuthContext = createContext<AuthContextInterface | null>(null);

export default function App() {
	LogBox.ignoreLogs(["AsyncStorage"]);
	// const [UID, setUID] = useState("MaX3ZFfqsUPK5UggC6Ybazz5YjV2");
	// Uncomment this if you want to delete the stored user token (want to login/register)
	// deleteValue(userID);

	const [state, dispatch] = useReducer(
		(prevState:any, action:any) => {
			switch (action.type) {
				case "RESTORE_TOKEN":
					return {
						...prevState,
						userToken: action.token,
						isLoading: false
					};
				case "SIGN_IN":
					return {
						...prevState,
						isSignout: false,
						userToken: action.token
					};
				case "SIGN_OUT":
					deleteValue("userID");
					return {
						...prevState,
						isSignout: true,
						userToken: null
					};
			}
		},
		{
			isLoading: true,
			isSignout: false,
			userToken: null
		}
	);

	useEffect(() => {
		// Fetch the token from storage then navigate to our appropriate place
		const bootstrapAsync = async () => {
			let userToken;

			try {
				// Restore token stored in `SecureStore` or any other encrypted storage
				userToken = await SecureStore.getItemAsync("userID");
			} catch (e) {
				throw new Error("Getting user token failed");
			}

			// After restoring token, we may need to validate it in production apps

			// This will switch to the App screen or Auth screen and this loading
			// screen will be unmounted and thrown away.
			dispatch({ type: "RESTORE_TOKEN", token: userToken });
		};

		bootstrapAsync();
	}, []);

	const authContext = useMemo(
		() => ({
			signInWithEmail: async (data: any) => {
				signInWithEmailAndPassword(
					firebaseAuth,
					data.mail,
					data.password
				)
					.then((response) => {
						save(userID, response.user.uid);
						save(userRefreshToken, response.user.refreshToken);
						alert("Sign in Successful");
						// console.log(response);
						dispatch({
							type: "SIGN_IN",
							token: response.user.uid
						});
					})
					.catch((error) => {
						alert(error.message);
						//Whatever else when wrong credentials are used.
					});
			},

			signOut: () => dispatch({ type: "SIGN_OUT" }),

			signUpWithEmail: async (data: any) => {
				createUserWithEmailAndPassword(
					firebaseAuth,
					data.mail,
					data.password
				)
					.then((response) => {
						// console.log(response);
						save(userRefreshToken, response.user.refreshToken);
						save(userID, response.user.uid);
						dispatch({ type: "SIGN_IN", token: response.user.uid });
					})
					.catch((error) => {
						alert(error.message);
					});
			},

			signInWithGoogle: async (uid:any) => {
				dispatch({
					type: "SIGN_IN",
					token: uid
				});
			}
		}),
		[]
	);

	let [fontsLoaded] = useFonts({
		roboto_400: Roboto_400Regular
	});

	if (!fontsLoaded) {
		return <AppLoading />;
	}

	return (
		<AuthContext.Provider value={authContext}>
			<NavigationContainer>
				<StatusBar style="auto" />
				<SafeAreaView style={styles.topContainer} />

				<SafeAreaView style={styles.mainContainer}>
					<Stack.Navigator>
						{state.userToken == null ? (
							// No token found, user isn't signed in
							<>
								{/* {console.log(getValueFor(userID))} */}
								<Stack.Screen
									name="FrontPage"
									component={FrontPage}
									options={{
										headerTransparent: true,
										headerTitle: ""
									}}
								/>
								<Stack.Screen
									name="RegisterPage"
									component={RegisterPage}
									options={{
										headerTransparent: true,
										headerTitle: "Register",
										headerTintColor: "#FFF"
									}}
								/>
								<Stack.Screen
									name="SignInPage"
									component={SignInPage}
									options={{
										headerTransparent: true,
										headerTitle: "Sign In",
										headerTintColor: "#FFF"
									}}
								/>
							</>
						) : (
							(
								// User is signed in
								<>
									<Stack.Screen
										name="MainContainer"
										component={MainContainer}
										options={{
											headerTransparent: true,
											headerTitle: ""
										}}
									/>
								</>
							))
						}
					</Stack.Navigator>
				</SafeAreaView>
			</NavigationContainer>
		</AuthContext.Provider>
	);
}

const styles = StyleSheet.create({
	// Sets the color at the top of "SafeAreaView"
	topContainer: {
		flex: 0,
		backgroundColor: "#34AAFC"
	},
	// Sets the color at the bottom of "SafeAreaView"
	mainContainer: {
		flex: 1,
		backgroundColor: "#760ACA",
		// paddingTop: Platform.OS === 'android' ? 25 : 0
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
	}
});
