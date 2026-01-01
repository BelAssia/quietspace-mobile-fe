import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/admin/adminProfileStyles';
export default function AdminProfileScreen() {
  const handleLogout = () => {
    // setIsLoggedIn(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Ionicons name="shield-checkmark" size={40} color="#5B6FF0" />
        </View>
        <Text style={styles.name}>Administrateur</Text>
        <Text style={styles.email}>admin@quietspace.com</Text>
      </View>

      <View style={styles.menu}>
        <TouchableOpacity style={styles.menuItem}>
          <Ionicons name="settings-outline" size={22} color="#4b5f83" />
          <Text style={styles.menuText}>Paramètres</Text>
          <Ionicons name="chevron-forward" size={20} color="#4b5f83" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Déconnexion</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}