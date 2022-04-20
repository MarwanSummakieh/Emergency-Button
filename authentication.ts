import * as SecureStore from "expo-secure-store";


async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

function getValueFor(key: string): any {
	SecureStore.getItemAsync(key).then(
		(result) => {
			if (result) {
				console.log("🔐 Here's your value 🔐 \n" + result);
				// console.log(result)
				return result;
			} else {
				console.log("No values stored under that key.");
				return undefined
			}
		}
	).catch((error)=> {
		return undefined
	})
}
// request, response, promptAsync,
export { save, getValueFor}