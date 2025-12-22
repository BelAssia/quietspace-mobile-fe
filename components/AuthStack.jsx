import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';
import WelcomeScreen from '../screens/auth/WelcomeScreen';

const Stack = createStackNavigator();

export default function AuthStack({ setIsLoggedIn, setUserRole }) {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn">
        {(props) => (
          <SignInScreen 
            {...props} 
            setIsLoggedIn={setIsLoggedIn}
            setUserRole={setUserRole}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="SignUp">
        {(props) => (
          <SignUpScreen 
            {...props} 
            setIsLoggedIn={setIsLoggedIn}
            setUserRole={setUserRole}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}