import { NavigationContainer } from "@react-navigation/native";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { AlertProvider } from "../context/AlertContext";
import { useSelector } from "react-redux";

export default function Root() {
  // const userRole = useSelector((state) => state.auth.userRole);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <AlertProvider>
      <NavigationContainer>
        {isLoggedIn ? <AppStack /> : <AuthStack />}
      </NavigationContainer>
    </AlertProvider>
  );
}
