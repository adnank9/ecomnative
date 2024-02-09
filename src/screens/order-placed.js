import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function OrderPlaced() {
  return (
    <View style={styles.container}>
      <Text>Order Placed Successfully</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
