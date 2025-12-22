// ==================== screens/shared/PlaceDetailsScreen.jsx ====================
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/shared/placeDetailsStyles';

export default function PlaceDetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#120217" />
      </TouchableOpacity>

      <ScrollView>
        <View style={styles.imagePlaceholder}>
          <Ionicons name="image" size={48} color="#4b5f83" />
        </View>

        <View style={styles.content}>
          <Text style={styles.name}>BiblioCity</Text>
          <Text style={styles.type}>BIBLIOTHÈQUE</Text>
          <Text style={styles.address}>Avenue Hassan II, Casablanca</Text>
          
          <View style={styles.scoreContainer}>
            <Text style={styles.score}>92</Text>
            <Text style={styles.scoreLabel}>/100 - Très calme</Text>
          </View>

          <Text style={styles.description}>
            Grande bibliothèque moderne avec espaces silencieux dédiés à l'étude.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}