import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import KycScreen1 from "../screens/Kyc/KycScreen1";
import Navbar from "../components/Navbar";
import { SafeAreaView } from "react-native-safe-area-context";
import KycScreen2 from "../screens/Kyc/KycScreen2";
import KycScreen3 from "../screens/Kyc/KycScreen3";
import KycScreen4 from "../screens/Kyc/KycScreen4";
import KycScreen5 from "../screens/Kyc/KycScreen5";
import KycScreen6 from "../screens/Kyc/KycScreen6";
import KycScreen7 from "../screens/Kyc/KycScreen7";
import KysScreen8 from "../screens/Kyc/KycScreen8";
import KycScreen8 from "../screens/Kyc/KycScreen8";

const KycStack = () => {
  const Stack = createNativeStackNavigator();
  return (
    <SafeAreaView style={styles.background_main}>
      <>
        <Navbar title="KYC Process" />
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="KycScreen1" component={KycScreen1}></Stack.Screen>
          <Stack.Screen name="KycScreen2" component={KycScreen2}></Stack.Screen>
          <Stack.Screen name="KycScreen3" component={KycScreen3}></Stack.Screen>
          <Stack.Screen name="KycScreen4" component={KycScreen4}></Stack.Screen>
          <Stack.Screen name="KycScreen5" component={KycScreen5}></Stack.Screen>
          <Stack.Screen name="KycScreen6" component={KycScreen6}></Stack.Screen>
          <Stack.Screen name="KycScreen7" component={KycScreen7}></Stack.Screen>
          <Stack.Screen name="KycScreen8" component={KycScreen8}></Stack.Screen>

        </Stack.Navigator>
      </>
    </SafeAreaView>
  );
};

export default KycStack;

const styles = StyleSheet.create({
  background_main: {
    flex: 1,
    backgroundColor: "#121213",
    paddingHorizontal: 10,
  },
});
