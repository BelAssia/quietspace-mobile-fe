// ==================== App.js ====================
import { NavigationContainer } from "@react-navigation/native";
import { useState } from "react";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AlertProvider } from "../context/AlertContext";
import { useSelector } from "react-redux";

export default function Root() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <AlertProvider>
      <NavigationContainer>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AlertProvider>
  );
}
