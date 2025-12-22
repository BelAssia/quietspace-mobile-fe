import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/user/userHomeStyles';

export default function HomeScreen({ navigation }) {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.title}>QuietSpace</Text>
          <Text style={styles.subtitle}>Trouvez votre espace calme</Text>
        </View>
        <Ionicons name="notifications-outline" size={24} color="#120217" />
      </View>

      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#4b5f83" />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un lieu..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters}>
        <TouchableOpacity style={[styles.filterChip, styles.filterActive]}>
          <Ionicons name="library" size={18} color="#5B6FF0" />
          <Text style={styles.filterTextActive}>Bibliothèque</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Ionicons name="cafe" size={18} color="#4b5f83" />
          <Text style={styles.filterText}>Café</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterChip}>
          <Ionicons name="business" size={18} color="#4b5f83" />
          <Text style={styles.filterText}>Coworking</Text>
        </TouchableOpacity>
      </ScrollView>

      <Text style={styles.sectionTitle}>Lieux à proximité</Text>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.placeCard}>
          <View style={styles.placeHeader}>
            <Text style={styles.placeName}>BiblioCity</Text>
            <Ionicons name="heart-outline" size={22} color="#4b5f83" />
          </View>
          <Text style={styles.placeType}>BIBLIOTHÈQUE</Text>
          <Text style={styles.placeAddress}>Avenue Hassan II, Casablanca</Text>
          <View style={styles.placeFooter}>
            <View style={styles.scoreBox}>
              <Text style={styles.score}>92</Text>
              <Text style={styles.scoreLabel}>/100</Text>
            </View>
            <Text style={styles.distance}>0.5 km</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
