import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../../screens/Home";
import Profile from "../../screens/Profile";
import Search from "../../screens/Search";
import Wishlist from "../../screens/Wishlist";
import Notification from "../../screens/Notification";

const HomeStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName="Home" >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Wishlist" component={Wishlist} />
      <Stack.Screen name="Notification" component={Notification} />

    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
