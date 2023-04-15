import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { ContextProvider } from "./src/lib/Context";
import RootNavigation from "./src/navigation/index";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";

export default function App() {
  const [fontsLoaded] = useFonts({
    "mblack": require("./assets/fonts/Montserrat-Black.ttf"),
    "mb": require("./assets/fonts/Montserrat-Bold.ttf"),
    "msb": require("./assets/fonts/Montserrat-SemiBold.ttf"),
    "m": require("./assets/fonts/Montserrat-Regular.ttf"),
    "mm": require("./assets/fonts/Montserrat-Medium.ttf"),
    "jsb": require("./assets/fonts/JosefinSans-SemiBold.ttf"),
    "jb": require("./assets/fonts/JosefinSans-Bold.ttf"),
    "j": require("./assets/fonts/JosefinSans-Regular.ttf"),
    "jm": require("./assets/fonts/JosefinSans-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <ContextProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <RootNavigation />
      </NavigationContainer>
    </ContextProvider>
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
