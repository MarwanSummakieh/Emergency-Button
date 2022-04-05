import * as Google from "expo-auth-session/providers/google";
import * as SecureStore from "expo-secure-store";


async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
	let result = await SecureStore.getItemAsync(key);
	if (result) {
		alert("🔐 Here's your value 🔐 \n" + result);
		return result;
	} else {
		alert("No values stored under that key.");
	}
}
// request, response, promptAsync,
export { save, getValueFor}