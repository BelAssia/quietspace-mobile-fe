import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/user/userFavoritesStyles';

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Favoris</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.favoriteCard}>
          <View style={styles.cardHeader}>
            <Text style={styles.cardTitle}>Café Zen</Text>
            <Ionicons name="heart" size={22} color="#EF4444" />
          </View>
          <Text style={styles.cardType}>CAFÉ</Text>
          <Text style={styles.cardAddress}>Boulevard Zerktouni</Text>
          <View style={styles.cardFooter}>
            <Text style={styles.cardScore}>85/100</Text>
            <Text style={styles.cardDistance}>1.2 km</Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
