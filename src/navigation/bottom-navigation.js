import React, { useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/home";
import Cart from "../screens/cart";
import Icon from "react-native-vector-icons/Ionicons";
import Whishlist from "../screens/whishlist";
import Orders from "../screens/orders";

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const [activeTab, setActiveTab] = useState("Home");
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Icon
              name={activeTab === "Home" ? "home" : "home-outline"}
              size={30}
            />
          ),
          tabBarLabel: "",
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setActiveTab("Home");
            navigation.navigate("Home");
          },
        })}
      />

      <Tab.Screen
        name="Whishlist"
        component={Whishlist}
        options={{
          tabBarIcon: () => (
            <Icon
              name={activeTab === "Whishlist" ? "heart" : "heart-outline"}
              size={30}
            />
          ),
          tabBarLabel: "",
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setActiveTab("Whishlist");
            navigation.navigate("Whishlist");
          },
        })}
      />
      <Tab.Screen
        name="Orders"
        component={Orders}
        options={{
          tabBarIcon: () => (
            <Icon
              name={activeTab === "Orders" ? "cube" : "cube-outline"}
              size={30}
            />
          ),
          tabBarLabel: "",
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setActiveTab("Orders");
            navigation.navigate("Orders");
          },
        })}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: () => (
            <Icon
              name={activeTab === "Cart" ? "cart" : "cart-outline"}
              size={30}
            />
          ),
          tabBarLabel: "",
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            setActiveTab("Cart");
            navigation.navigate("Cart");
          },
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
