import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/user/userLocationStyles';

export default function LocationScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Explorer</Text>
        <TouchableOpacity>
          <Ionicons name="options" size={24} color="#120217" />
        </TouchableOpacity>
      </View>

      <View style={styles.mapPlaceholder}>
        <Ionicons name="map" size={48} color="#4b5f83" />
        <Text style={styles.mapText}>Carte interactive</Text>
        <Text style={styles.mapSubtext}>16 lieux disponibles</Text>
      </View>

      <TouchableOpacity style={styles.locationButton}>
        <Ionicons name="navigate" size={24} color="#5B6FF0" />
      </TouchableOpacity>

      <View style={styles.filterPanel}>
        <Text style={styles.filterTitle}>Filtres</Text>
        <View style={styles.filterRow}>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="library" size={20} color="#5B6FF0" />
            <Text style={styles.filterButtonText}>Bibliothèque</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="cafe" size={20} color="#5B6FF0" />
            <Text style={styles.filterButtonText}>Café</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}