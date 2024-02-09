import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./src/screens/login";
import Register from "./src/screens/register";
import Home from "./src/screens/home";
import BottomTabNavigator from "./src/navigation/bottom-navigation";
import { Provider } from "react-redux";
import store from "./src/store/store";
import OrderPlaced from "./src/screens/order-placed";

const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen
            name="Homes"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Success" component={OrderPlaced} />

          {/* <Stack.Screen name='Homes'>
      {() => (
            <BottomTabNavigator />
          )}
        </Stack.Screen> */}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
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
