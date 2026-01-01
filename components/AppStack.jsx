import { createStackNavigator } from "@react-navigation/stack";
import UserTabs from "./UserTabs";
import AdminTabs from "./AdminTabs";
import PlaceDetailsScreen from "../screens/shared/PlaceDetailsScreen";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

export default function AppStack() {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role || "user";
  console.log("Navigation avec rôle:", role);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {role === "admin" ? (
        <Stack.Screen name="AdminTabs" component={AdminTabs} />
      ) : (
        <Stack.Screen name="UserTabs" component={UserTabs} />
      )}
      <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
    </Stack.Navigator>
  );
}
