import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function ParentTabs() {
  return (
    <SafeAreaView>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Tracking" component={TrackingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    </SafeAreaView>
  );
}
