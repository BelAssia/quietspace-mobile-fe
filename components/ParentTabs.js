import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { SafeAreaView } from "react-native-safe-area-context";

const Tab = createBottomTabNavigator();

export default function ParentTabs() {
  return (
    <SafeAreaView>
      <Tab.Navigator screenOptions={{ headerShown: false }}>
       <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Location" component={LocationScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
    </SafeAreaView>
  );
}
