import React from "react";
import { StatusBar } from "react-native";
import { Routes } from "./src/routes";
import { NativeBaseProvider } from "native-base";
import { useFonts, Roboto_400Regular, Roboto_700Bold } from "@expo-google-fonts/roboto";
import { Loading } from "@components";
import { THEME } from "./src/theme/theme";

export default function App() {
  const [fontsLoaded] = useFonts({
    Roboto_400Regular,
    Roboto_700Bold
  });

  return (
    <NativeBaseProvider theme={THEME}>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent 
      />
      {fontsLoaded ? <Routes/> : <Loading />}
    </NativeBaseProvider>
  );
}
