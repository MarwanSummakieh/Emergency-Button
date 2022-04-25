import * as SecureStore from "expo-secure-store";

async function save(key: string, value: string) {
	await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string): Promise<any> {
	const item = await SecureStore.getItemAsync(key);

	if (typeof item === "string" && item.length > 1) {
		// console.log("🔐 Here's your value 🔐:" + result);
		// console.log(item)
		return item;
	} else {
		// console.log("No values stored under that key.");
		return "";
	}
}

async function deleteValue(key: string) {
	SecureStore.deleteItemAsync(key)
		.then((msg) => {
			// console.log(msg)
		})
		.catch((error) => {
			// console.error(error)
		});
}

// request, response, promptAsync,
export { save, getValueFor, deleteValue };
