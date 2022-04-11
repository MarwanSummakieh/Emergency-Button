import * as SecureStore from "expo-secure-store";


async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

function getValueFor(key: string): any {
	SecureStore.getItemAsync(key).then(
		(result) => {
			if (result) {
				alert("🔐 Here's your value 🔐 \n" + result);
				return result;
			} else {
				alert("No values stored under that key.");
				return false
			}
		}
	).catch((error)=> {
		return false
	})
}
// request, response, promptAsync,
export { save, getValueFor}