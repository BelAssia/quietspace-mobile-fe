import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/admin/adminPlacesStyles';

export default function ManagePlacesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des lieux</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.placeCard}>
          <View style={styles.placeHeader}>
            <Text style={styles.placeName}>BiblioCity</Text>
            <View style={styles.actions}>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="create-outline" size={20} color="#5B6FF0" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>
          <Text style={styles.placeType}>BIBLIOTHÈQUE</Text>
          <Text style={styles.placeScore}>Score: 92/100</Text>
        </View>
      </ScrollView>
    </View>
  );
}
