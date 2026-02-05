import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import styles from "../../styles/admin/adminPlacesStyles";
import { useManagePlaces } from "../../hooks/useManagePlaces";

export default function ManagePlacesScreen({ navigation }) {
  const {
    filteredLieux,
    typesLieu,
    loading,
    searchQuery,
    setSearchQuery,
    selectedType,
    setSelectedType,
    sortBy,
    setSortBy,
    handleDelete,
    getTypeLieuName,
    getNiveauCalmeColor,
    handleLieuPress,
  } = useManagePlaces(navigation);
  // ✅ Afficher le loader tant que les données ne sont pas chargées
  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#5B6FF0" />
        <Text style={{ marginTop: 10, color: "#6B7280" }}>Chargement...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des lieux</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate("AddPlace")}
        >
          <Ionicons name="add" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <Ionicons
          name="search"
          size={20}
          color="#9CA3AF"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un lieu..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#9CA3AF"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color="#9CA3AF" />
          </TouchableOpacity>
        )}
      </View>

      {/* Filtres */}
      <View style={styles.filtersContainer}>
        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Type:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={selectedType}
              onValueChange={setSelectedType}
              style={styles.picker}
            >
              <Picker.Item label="Tous" value="all" />
              {Array.isArray(typesLieu) &&
                typesLieu.map((type) => (
                  <Picker.Item
                    key={type.idTypeLieu}
                    label={type.typeLieu}
                    value={type.idTypeLieu.toString()}
                  />
                ))}
            </Picker>
          </View>
        </View>

        <View style={styles.filterItem}>
          <Text style={styles.filterLabel}>Trier:</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={sortBy}
              onValueChange={setSortBy}
              style={styles.picker}
            >
              <Picker.Item label="Plus récent" value="recent" />
              <Picker.Item label="Nom A-Z" value="name" />
              <Picker.Item label="Score" value="score" />
            </Picker>
          </View>
        </View>
      </View>

      {/* Compteur */}
      <Text style={styles.resultCount}>
        {filteredLieux.length} lieu{filteredLieux.length > 1 ? "x" : ""} trouvé
        {filteredLieux.length > 1 ? "s" : ""}
      </Text>

      {/* Liste des lieux */}
      <ScrollView showsVerticalScrollIndicator={false}>
    {filteredLieux.length === 0 ? (
      <View style={styles.emptyState}>
        <Ionicons name="location-outline" size={64} color="#D1D5DB" />
        <Text style={styles.emptyText}>Aucun lieu trouvé</Text>
      </View>
    ) : (
      filteredLieux.map((lieu) => (
        // ✅ TOUCHABLE SUR TOUTE LA CARTE
        <TouchableOpacity
          key={lieu.id_lieu}
          style={styles.placeCard}
          onPress={() => handleLieuPress(lieu)} // ✅ Navigation vers détails
          activeOpacity={0.7}
        >
          <View style={styles.placeHeader}>
            <Text style={styles.placeName}>
              {lieu.nom_lieu || "Sans nom"}
            </Text>
            <View style={styles.actions}>
              {/* Bouton Éditer */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={(e) => {
                  e.stopPropagation(); // ✅ Empêche la propagation au parent
                  navigation.navigate("EditPlace", { lieuId: lieu.id_lieu });
                }}
              >
                <Ionicons name="create-outline" size={20} color="#5B6FF0" />
              </TouchableOpacity>
              
              {/* Bouton Supprimer */}
              <TouchableOpacity
                style={styles.iconButton}
                onPress={(e) => {
                  e.stopPropagation(); // ✅ Empêche la propagation au parent
                  handleDelete(lieu.id_lieu, lieu.nom_lieu);
                }}
              >
                <Ionicons name="trash-outline" size={20} color="#EF4444" />
              </TouchableOpacity>
            </View>
          </View>

          <Text style={styles.placeType}>
            {getTypeLieuName(lieu.id_type_lieu)}
          </Text>

          {lieu.adresse_lieu && (
            <View style={styles.addressRow}>
              <Ionicons name="location-outline" size={14} color="#6B7280" />
              <Text style={styles.placeAddress} numberOfLines={1}>
                {lieu.adresse_lieu}
              </Text>
            </View>
          )}

          <View style={styles.placeFooter}>
            <Text style={styles.placeScore}>
              Score: {lieu.score_calme || 0}/100
            </Text>
            <View
              style={[
                styles.niveauBadge,
                {
                  backgroundColor:
                    getNiveauCalmeColor(lieu.niveau_calme) + "20",
                },
              ]}
            >
              <Text
                style={[
                  styles.niveauText,
                  { color: getNiveauCalmeColor(lieu.niveau_calme) },
                ]}
              >
                {lieu.niveau_calme || "N/A"}
              </Text>
            </View>
          </View>
        </TouchableOpacity> // ✅ Fermeture du TouchableOpacity principal
      ))
    )}
  </ScrollView>
    </View>
  );
}
