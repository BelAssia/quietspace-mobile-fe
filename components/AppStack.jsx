import { createStackNavigator } from "@react-navigation/stack";
import UserTabs from "./UserTabs";
import AdminTabs from "./AdminTabs";
import PlaceDetailsScreen from "../screens/shared/PlaceDetailsScreen";
import { useSelector } from "react-redux";
import AddReviewScreen from "../screens/user/AddReviewScreen";
import AddPlaceScreen from "../screens/admin/AddPlaceScreen";
import EditPlaceScreen from "../screens/admin/EditPlaceScreen";

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

      {/* screen partagées */}
      <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
      <Stack.Screen
        name="AddReview"
        component={AddReviewScreen}
        options={{
          presentation: "modal",
          headerShown: false,
        }}
      />

      {role === "admin" && (
        <>
          <Stack.Screen
            name="AddPlace"
            component={AddPlaceScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditPlace"
            component={EditPlaceScreen}
            options={{ headerShown: false }}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
