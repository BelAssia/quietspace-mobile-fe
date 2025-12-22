import { createStackNavigator } from '@react-navigation/stack';
import UserTabs from './UserTabs';
import AdminTabs from './AdminTabs';
import PlaceDetailsScreen from '../screens/shared/PlaceDetailsScreen';

const Stack = createStackNavigator();

export default function AppStack({ userRole, setIsLoggedIn }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {userRole === 'ADMIN' ? (
        <Stack.Screen name="AdminTabs">
          {(props) => <AdminTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      ) : (
        <Stack.Screen name="UserTabs">
          {(props) => <UserTabs {...props} setIsLoggedIn={setIsLoggedIn} />}
        </Stack.Screen>
      )}
      <Stack.Screen name="PlaceDetails" component={PlaceDetailsScreen} />
    </Stack.Navigator>
  );
}