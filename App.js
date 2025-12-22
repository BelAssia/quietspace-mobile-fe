// ==================== App.js ====================
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import AuthStack from './components/AuthStack';
import AppStack from './components/AppStack';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null); // 'USER' ou 'ADMIN'

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <AppStack userRole={userRole} setIsLoggedIn={setIsLoggedIn} />
      ) : (
        <AuthStack setIsLoggedIn={setIsLoggedIn} setUserRole={setUserRole} />
      )}
    </NavigationContainer>
  );
}