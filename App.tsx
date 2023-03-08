import { StyleSheet, Text, View, StatusBar } from "react-native";
import { Home } from "./src/screens/Home/index";

export default function App() {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        translucent
        backgroundColor="transparent"
      />
      <Home />
    </>
  );
}
