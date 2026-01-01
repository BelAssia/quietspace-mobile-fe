import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import AdminDashboardScreen from "../screens/admin/AdminDashboardScreen";
import ManagePlacesScreen from "../screens/admin/ManagePlacesScreen";
import FeedbackScreen from "../screens/admin/FeedbackScreen";
import AdminProfileScreen from "../screens/admin/AdminProfileScreen";

const Tab = createBottomTabNavigator();

export default function AdminTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color }) => {
          let iconName;

          if (route.name === "Dashboard") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Places") {
            iconName = focused ? "location" : "location-outline";
          } else if (route.name === "Feedback") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={24} color={color} />;
        },
        tabBarActiveTintColor: "#5B6FF0",
        tabBarInactiveTintColor: "#4b5f83",
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          paddingTop: 5,
          backgroundColor: "#FFFFFF",
          borderTopWidth: 1,
          borderTopColor: "#E5E7EB",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      })}
    >
      <Tab.Screen
        name="Dashboard"
        component={AdminDashboardScreen}
        options={{ tabBarLabel: "Tableau" }}
      />
      <Tab.Screen
        name="Places"
        component={ManagePlacesScreen}
        options={{ tabBarLabel: "Lieux" }}
      />
      <Tab.Screen
        name="Feedback"
        component={FeedbackScreen}
        options={{ tabBarLabel: "Feedbacks" }}
      />
      <Tab.Screen
        name="Profile"
        component={AdminProfileScreen}
        options={{ tabBarLabel: "Profile" }}
      />
    </Tab.Navigator>
  );
}
