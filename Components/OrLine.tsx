import { View, Text } from "react-native";

export default function OrLine() {
	return (
		<View style={{ flexDirection: "row", alignItems: "center" }}>
			<View
				style={{
					flex: 1,
					height: 1,
					backgroundColor: "lightgrey"
				}}
			/>
			<View>
				<Text
					style={{
						width: 50,
						textAlign: "center",
						color: "lightgrey"
					}}
				>
					OR
				</Text>
			</View>
			<View
				style={{
					flex: 1,
					height: 1,
					backgroundColor: "lightgrey"
				}}
			/>
		</View>
	);
}
