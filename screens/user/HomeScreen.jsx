import { View, Text, TextInput, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/user/filterStyles';
import { useFilter } from "../../hooks/useFilter";

export default function FilterScreen({ navigation }) {
const {searchQuery, setSearchQuery,showFilters, setShowFilters,userLocation,filteredLieux,typesLieux,
loading,error,activeFiltersCount,handleLieuPress,getNiveauCalmeColor,getTypeLabel,getTypeIcon,formatDistance,
resetFilters,toggleNiveauCalme,toggleType,distanceOptions,niveauxCalme, selectedNiveauCalme,selectedDistance,setSelectedDistance,calculateDistance,selectedTypes,
} = useFilter(navigation);

  return (
    <View style={styles.container}>
      {/* Section Fixe du Haut */}
      <View style={styles.topSection}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.title}>QuietSpace</Text>
            <Text style={styles.subtitle}>Trouvez votre espace calme</Text>
          </View>
          <Ionicons name="notifications-outline" size={24} color="#120217" />
        </View>

        {/* Search Box */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={20} color="#4b5f83" />
          <TextInput
            style={styles.searchInput}
            placeholder="Rechercher un lieu..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#999"
          />
          {searchQuery !== '' && (
            <TouchableOpacity onPress={() => setSearchQuery('')}>
              <Ionicons name="close-circle" size={20} color="#999" />
            </TouchableOpacity>
          )}
        </View>

        {/* Quick Type Filters */}
        <View style={styles.quickFiltersContainer}>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.quickFiltersContent}
          >
            {typesLieux.map(type => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.filterChip,
                  selectedTypes.includes(type.id) && styles.filterActive
                ]}
                onPress={() => toggleType(type.id)}
              >
                <Ionicons
                  name={type.icon}
                  size={18}
                  color={selectedTypes.includes(type.id) ? '#5B6FF0' : '#4b5f83'}
                />
                <Text style={selectedTypes.includes(type.id) ? styles.filterTextActive : styles.filterText}>
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Advanced Filters Button */}
        <TouchableOpacity style={styles.advancedFilterBtn} onPress={() => setShowFilters(true)}>
          <Ionicons name="options-outline" size={20} color="#5B6FF0" />
          <Text style={styles.advancedFilterText}>Filtres avancés</Text>
          {activeFiltersCount > 0 && (
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{String(activeFiltersCount)}</Text>
            </View>
          )}
        </TouchableOpacity>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            {`${filteredLieux.length} ${filteredLieux.length > 1 ? 'lieux trouvés' : 'lieu trouvé'}`}
          </Text>
          {activeFiltersCount > 0 && (
            <TouchableOpacity onPress={resetFilters}>
              <Text style={styles.resetText}>Réinitialiser</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Places List - Section Scrollable */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        style={styles.placesList}
        contentContainerStyle={styles.placesListContent}
      >
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Chargement des lieux...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Ionicons name="alert-circle-outline" size={64} color="#F44336" />
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity style={styles.retryButton} onPress={fetchLieux}>
              <Text style={styles.retryButtonText}>Réessayer</Text>
            </TouchableOpacity>
          </View>
        ) : filteredLieux.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="search-outline" size={64} color="#ccc" />
            <Text style={styles.emptyText}>Aucun lieu trouvé</Text>
            <Text style={styles.emptySubtext}>Essayez de modifier vos filtres</Text>
          </View>
        ) : (
          filteredLieux.map((lieu, index) => {
          const distance = userLocation
            ? calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                lieu.latitude,
                lieu.longitude
              )
            : null;

          return (
            <TouchableOpacity 
              key={lieu.id_lieu || index} 
              style={styles.placeCard}
              onPress={() => handleLieuPress(lieu)}
              activeOpacity={0.7}
            >
              <View style={styles.placeHeader}>
                <View style={styles.placeHeaderLeft}>
                  <Ionicons
                    name={getTypeIcon(lieu.id_type_lieu)}
                    size={20}
                    color="#5B6FF0"
                  />
                  <Text style={styles.placeName}>{lieu.nom_lieu}</Text>
                </View>
                <Ionicons name="heart-outline" size={22} color="#4b5f83" />
              </View>

              <Text style={styles.placeType}>{getTypeLabel(lieu.id_type_lieu).toUpperCase()}</Text>
              <Text style={styles.placeAddress}>{lieu.adresse_lieu}</Text>

              {lieu.description_lieu && (
                <Text style={styles.placeDescription} numberOfLines={2}>
                  {lieu.description_lieu}
                </Text>
              )}

              <View style={styles.placeFooter}>
                <View style={styles.scoreContainer}>
                  <View
                    style={[
                      styles.scoreBox,
                      { backgroundColor: getNiveauCalmeColor(lieu.score_calme) }
                    ]}
                  >
                    <Text style={styles.score}>{String(lieu.score_calme)}</Text>
                    <Text style={styles.scoreLabel}>/100</Text>
                  </View>
                  <Text style={styles.niveauCalme}>{lieu.niveau_calme}</Text>
                </View>

                {distance && (
                  <View style={styles.distanceContainer}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text style={styles.distance}>{formatDistance(distance)}</Text>
                  </View>
                )}
              </View>
            </TouchableOpacity>
          );
        }))}

      </ScrollView>

      {/* Advanced Filters Modal */}
      <Modal
        visible={showFilters}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setShowFilters(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtres avancés</Text>
              <TouchableOpacity onPress={() => setShowFilters(false)}>
                <Ionicons name="close" size={28} color="#120217" />
              </TouchableOpacity>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              {/* Niveau de Calme */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Niveau de calme</Text>
                {niveauxCalme.map((niveau, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.filterOption}
                    onPress={() => toggleNiveauCalme(niveau.label)}
                  >
                    <View style={styles.checkboxContainer}>
                      <View
                        style={[
                          styles.checkbox,
                          selectedNiveauCalme.includes(niveau.label) && styles.checkboxActive
                        ]}
                      >
                        {selectedNiveauCalme.includes(niveau.label) && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                      </View>
                      <View style={styles.niveauInfo}>
                        <View style={styles.niveauLabelContainer}>
                          <View
                            style={[styles.colorIndicator, { backgroundColor: niveau.color }]}
                          />
                          <Text style={styles.filterOptionText}>{niveau.label}</Text>
                        </View>
                        <Text style={styles.scoreRange}>
                          {`Score: ${niveau.scoreMin} - ${niveau.scoreMax}%`}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>

              {/* Distance */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Distance maximale</Text>
                <View style={styles.distanceOptions}>
                  {distanceOptions.map((option, index) => (
                    <TouchableOpacity
                      key={index}
                      style={[
                        styles.distanceChip,
                        selectedDistance === option.value && styles.distanceChipActive
                      ]}
                      onPress={() => setSelectedDistance(option.value)}
                    >
                      <Text
                        style={[
                          styles.distanceChipText,
                          selectedDistance === option.value && styles.distanceChipTextActive
                        ]}
                      >
                        {option.label}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Type de lieu (dans le modal aussi) */}
              <View style={styles.filterSection}>
                <Text style={styles.filterSectionTitle}>Type de lieu</Text>
                {typesLieux.map(type => (
                  <TouchableOpacity
                    key={type.id}
                    style={styles.filterOption}
                    onPress={() => toggleType(type.id)}
                  >
                    <View style={styles.checkboxContainer}>
                      <View
                        style={[
                          styles.checkbox,
                          selectedTypes.includes(type.id) && styles.checkboxActive
                        ]}
                      >
                        {selectedTypes.includes(type.id) && (
                          <Ionicons name="checkmark" size={16} color="#fff" />
                        )}
                      </View>
                      <Ionicons name={type.icon} size={20} color="#4b5f83" style={styles.typeIcon} />
                      <Text style={styles.filterOptionText}>{type.label}</Text>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>

            {/* Modal Actions */}
            <View style={styles.modalActions}>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Réinitialiser</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.applyButton}
                onPress={() => setShowFilters(false)}
              >
                <Text style={styles.applyButtonText}>Appliquer</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}










