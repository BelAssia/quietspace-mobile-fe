
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthStack from './components/AuthStack';
import AppStack from './components/AppStack';



export default function App() {
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  return (

    <NavigationContainer>
      {isLoggedIn? (<AppStack />): (<AuthStack setIsLoggedIn={setIsLoggedIn}/>)}
    
    </NavigationContainer>
  );
}



// import AuthScreen from './screens/AuthScreen';
// import HomeScreen from './screens/HomeScreen';
// import SignupScreen from './screens/SignupScreen';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
// import { useState } from 'react';
// import AuthStack from './components/AuthStack';
// import AppStack from './components/AppStack';

// const Stack = createNativeStackNavigator();  

// export default function App() {
//   // const [isLoggedIn,setIsLoggedIn] = useState(false);
//   return (

//     <NavigationContainer>
//       {/* {isLoggedIn? (<AppStack />): (<AuthStack setIsLoggedIn={setIsLoggedIn}/>)} */}
//       <Stack.Navigator screenOptions={{ headerShown: false }}>
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Auth" component={AuthScreen} />
//         <Stack.Screen name="Signup" component={SignupScreen} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }


