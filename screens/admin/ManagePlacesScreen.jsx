import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  RefreshControl,
  ActivityIndicator 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlaces } from '../../hooks/usePlaces';
import SearchBar from '../../components/places/SearchBar';
import PlaceCard from '../../components/places/PlaceCard';
import styles from '../../styles/admin/adminPlacesStyles';

export default function ManagePlacesScreen({ navigation }) {
  const {
    places,
    loading,
    refreshing,
    searchQuery,
    onRefresh,
    searchPlaces,
    confirmDelete
  } = usePlaces();

  const handleEdit = (place) => {
    navigation.navigate('EditPlace', { place });
  };

  const handleAddPlace = () => {
    navigation.navigate('AddPlace');
  };

  if (loading && !refreshing) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#5B6FF0" />
        <Text style={styles.loadingText}>Chargement des lieux...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des lieux</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={handleAddPlace}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <SearchBar
        value={searchQuery}
        onChangeText={searchPlaces}
        onClear={() => searchPlaces('')}
        placeholder="Rechercher par nom, adresse ou type..."
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#5B6FF0']}
            tintColor="#5B6FF0"
          />
        }
      >
        {places.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="location-outline" size={64} color="#9CA3AF" />
            <Text style={styles.emptyTitle}>Aucun lieu trouvé</Text>
            <Text style={styles.emptyText}>
              {searchQuery 
                ? 'Aucun lieu ne correspond à votre recherche' 
                : 'Commencez par ajouter votre premier lieu'}
            </Text>
            {!searchQuery && (
              <TouchableOpacity 
                style={styles.emptyButton}
                onPress={handleAddPlace}
              >
                <Text style={styles.emptyButtonText}>Ajouter un lieu</Text>
              </TouchableOpacity>
            )}
          </View>
        ) : (
          <>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsText}>
                {places.length} lieu{places.length > 1 ? 'x' : ''} trouvé{places.length > 1 ? 's' : ''}
              </Text>
            </View>
            {places.map((place) => (
              <PlaceCard
                key={place.idLieu}
                place={place}
                onEdit={handleEdit}
                onDelete={confirmDelete}
              />
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
}
// import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
// import { Ionicons } from '@expo/vector-icons';
// import styles from '../../styles/admin/adminPlacesStyles';

// export default function ManagePlacesScreen() {
//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <Text style={styles.title}>Gestion des lieux</Text>
//         <TouchableOpacity style={styles.addButton}>
//           <Ionicons name="add" size={24} color="#FFFFFF" />
//         </TouchableOpacity>
//       </View>

//       <ScrollView showsVerticalScrollIndicator={false}>
//         <View style={styles.placeCard}>
//           <View style={styles.placeHeader}>
//             <Text style={styles.placeName}>BiblioCity</Text>
//             <View style={styles.actions}>
//               <TouchableOpacity style={styles.iconButton}>
//                 <Ionicons name="create-outline" size={20} color="#5B6FF0" />
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.iconButton}>
//                 <Ionicons name="trash-outline" size={20} color="#EF4444" />
//               </TouchableOpacity>
//             </View>
//           </View>
//           <Text style={styles.placeType}>BIBLIOTHÈQUE</Text>
//           <Text style={styles.placeScore}>Score: 92/100</Text>
//         </View>
//       </ScrollView>
//     </View>
//   );
// }
