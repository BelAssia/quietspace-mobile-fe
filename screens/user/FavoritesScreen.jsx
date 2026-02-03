import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/user/userFavoritesStyles';
import { useFavoris } from "../../hooks/useFavoris";

export default function FavoritesScreen({ navigation }) {
   const {user,favoris,loading,handleRemove} =
      useFavoris(navigation);
  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mes Favoris</Text>
        </View>
        <ActivityIndicator size="large" color="#5B6FF0" style={{ marginTop: 40 }} />
      </View>
    );
  }

  if (!user?.id_user) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mes Favoris</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="person-outline" size={64} color="#BDBDBD" />
          <Text style={{ color: '#9E9E9E', marginTop: 12 }}>Veuillez vous connecter</Text>
        </View>
      </View>
    );
  }

  if (favoris.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Mes Favoris</Text>
        </View>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Ionicons name="heart-outline" size={64} color="#BDBDBD" />
          <Text style={{ color: '#9E9E9E', marginTop: 12 }}>Aucun favori pour le moment</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mes Favoris</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {favoris.map((item) => (
          <TouchableOpacity
            key={item.idLieu}
            style={styles.favoriteCard}
            onPress={() => navigation.navigate('PlaceDetails', { lieuId: item.idLieu })}
          >
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.lieu?.nomLieu}</Text>
              <TouchableOpacity onPress={() => handleRemove(item.idLieu)}>
                <Ionicons name="heart" size={22} color="#EF4444" />
              </TouchableOpacity>
            </View>
            <Text style={styles.cardType}>{item.lieu?.typeLieu?.typeLieu?.toUpperCase()}</Text>
            <Text style={styles.cardAddress}>{item.lieu?.adresseLieu}</Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardScore}>{item.lieu?.scoreCalme ? Math.round(item.lieu.scoreCalme) : '—'}/100</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}