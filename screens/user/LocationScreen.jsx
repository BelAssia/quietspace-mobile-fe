// screens/user/LocationScreen.js
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
  Switch,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MapView, { Marker, Circle, PROVIDER_DEFAULT } from "react-native-maps";
import styles from "../../styles/user/userLocationStyles";
import { useLocationScreen } from "../../hooks/useLocationScreen";
import { useLocationTracking } from "../../hooks/useLocationTracking";

export default function LocationScreen() {
  const {
    mapRef,
    userLocation,
    locationLoading,
    mapRegion,
    setMapRegion,
    searchQuery,
    setSearchQuery,
    searchResults,
    searching,
    showSearchResults,
    markerCoordinate,
    handleSearch,
    selectSearchResult,
    handleMapPress,
    recenterMap,
  } = useLocationScreen();
  const {
    isConnected,
    isTracking,
    nearbyPlaces,
    trackingConfig,
    startTracking,
    stopTracking,
  } = useLocationTracking();

  if (locationLoading || !userLocation || !mapRegion) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#5B6FF0" />
        <Text style={{ marginTop: 10, color: "#6B7280", fontSize: 16 }}>
          Récupération de votre position...
        </Text>
        <Text style={{ marginTop: 5, color: "#9CA3AF", fontSize: 14 }}>
          Veuillez activer le GPS
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Header avec indicateur de connexion */}
      <View style={styles.header}>
        <Text style={styles.title}>Explorer</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          {/* Indicateur de connexion WebSocket */}
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 8,
                height: 8,
                borderRadius: 4,
                backgroundColor: isConnected ? '#10B981' : '#EF4444',
                marginRight: 5,
              }}
            />
            <Text style={{ fontSize: 11, color: '#6B7280' }}>
              {isConnected ? 'En ligne' : 'Hors ligne'}
            </Text>
          </View>

          <TouchableOpacity onPress={recenterMap}>
            <Ionicons name="navigate" size={24} color="#120217" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <View style={{ flex: 1 }}>
              <Text style={styles.sectionTitle}>Tracking en temps réel</Text>
              {trackingConfig.message && (
                <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>
                  {trackingConfig.message}
                </Text>
              )}
            </View>
            <Switch
              value={isTracking}
              onValueChange={(value) => value ? startTracking() : stopTracking()}
              trackColor={{ false: '#D1D5DB', true: '#5B6FF0' }}
              thumbColor={isTracking ? '#FFFFFF' : '#F3F4F6'}
              disabled={!isConnected}
            />
          </View>

          {/* Informations de vitesse */}
          {isTracking && trackingConfig.speedKmh && (
            <View style={styles.speedInfo}>
              <Ionicons name="speedometer-outline" size={16} color="#5B6FF0" />
              <Text style={styles.speedText}>
                Vitesse: {trackingConfig.speedKmh} km/h
              </Text>
            </View>
          )}
        </View>
        {isTracking && nearbyPlaces.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Lieux calmes détectés ({nearbyPlaces.length})
            </Text>
            <Text style={{ fontSize: 12, color: '#6B7280', marginBottom: 10 }}>
              Dans un rayon de {trackingConfig.radius || 200}m
            </Text>
            
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              style={{ marginHorizontal: -16 }}
              contentContainerStyle={{ paddingHorizontal: 16 }}
            >
              {nearbyPlaces.slice(0, 10).map((place, index) => (
                <TouchableOpacity
                  key={place.idLieu || index}
                  style={styles.nearbyPlaceCard}
                  onPress={() => {
                    // Centrer la carte sur ce lieu
                    mapRef.current?.animateToRegion({
                      latitude: place.latitude,
                      longitude: place.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.005,
                    }, 1000);
                  }}
                >
                  <View style={styles.placeCardHeader}>
                    <Text style={styles.placeCardName} numberOfLines={1}>
                      {place.nomLieu}
                    </Text>
                    <View style={styles.scoreBadge}>
                      <Text style={styles.scoreText}>{place.scoreCalme}</Text>
                    </View>
                  </View>
                  
                  <View style={styles.placeCardInfo}>
                    <Ionicons name="location-outline" size={14} color="#6B7280" />
                    <Text style={styles.distanceText}>
                      {place.distance < 1000
                        ? `${Math.round(place.distance)}m`
                        : `${(place.distance / 1000).toFixed(1)}km`}
                    </Text>
                  </View>
                  
                  <View style={styles.placeCardInfo}>
                    <Ionicons name="volume-low-outline" size={14} color="#6B7280" />
                    <Text style={styles.calmeText} numberOfLines={1}>
                      {place.niveauCalme}
                    </Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* Recherche de lieu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rechercher un lieu</Text>
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.searchInputField}
                placeholder="Ex: Café Central Casablanca..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={searching}
            >
              {searching ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="search" size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Résultats de recherche */}
          {showSearchResults && (
            <View style={styles.searchResultsContainer}>
              {searchResults.length === 0 ? (
                <Text style={styles.noResults}>Aucun résultat trouvé</Text>
              ) : (
                searchResults.map((result, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchResultItem}
                    onPress={() => selectSearchResult(result)}
                  >
                    <Ionicons name="location" size={20} color="#5B6FF0" />
                    <View style={styles.searchResultText}>
                      <Text style={styles.searchResultName} numberOfLines={1}>
                        {result.displayName}
                      </Text>
                      <Text style={styles.searchResultType}>{result.type}</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>

        {/* Carte avec buffer et lieux */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Carte interactive
            {!isTracking && (
              <Text style={styles.sectionSubtitle}>
                {" "}(activez le tracking pour voir les lieux)
              </Text>
            )}
          </Text>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_DEFAULT}
              style={styles.map}
              region={mapRegion}
              onRegionChangeComplete={setMapRegion}
              showsUserLocation={true}
              showsMyLocationButton={false}
              onPress={handleMapPress}
            >
              {isTracking && userLocation && (
                <Circle
                  center={userLocation}
                  radius={trackingConfig.radius || 200}
                  fillColor="rgba(91, 111, 240, 0.15)"
                  strokeColor="rgba(91, 111, 240, 0.5)"
                  strokeWidth={2}
                />
              )}

              {markerCoordinate && !isTracking && (
                <Marker coordinate={markerCoordinate} pinColor="#5B6FF0" />
              )}
              {isTracking &&
                nearbyPlaces.map((place) => (
                  <Marker
                    key={place.idLieu}
                    coordinate={{
                      latitude: place.latitude,
                      longitude: place.longitude,
                    }}
                    pinColor="#10B981"
                    title={place.nomLieu}
                    description={`${Math.round(place.distance)}m • Score: ${place.scoreCalme}/100`}
                  >
                    <View style={styles.customMarker}>
                      <View style={styles.markerInner}>
                        <Text style={styles.markerScore}>{place.scoreCalme}</Text>
                      </View>
                    </View>
                  </Marker>
                ))}
            </MapView>
          </View>

          {/* Informations de position */}
          {markerCoordinate && (
            <View style={styles.coordinatesInfo}>
              <Text style={styles.coordinatesText}>
                📍 Lat: {markerCoordinate.latitude.toFixed(6)} | Lon:{" "}
                {markerCoordinate.longitude.toFixed(6)}
              </Text>
            </View>
          )}

          {/* Légende */}
          {isTracking && nearbyPlaces.length > 0 && (
            <View style={styles.legend}>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#5B6FF0' }]} />
                <Text style={styles.legendText}>Votre position</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendDot, { backgroundColor: '#10B981' }]} />
                <Text style={styles.legendText}>Lieux calmes détectés</Text>
              </View>
              <View style={styles.legendItem}>
                <View style={[styles.legendCircle, { borderColor: '#5B6FF0' }]} />
                <Text style={styles.legendText}>Zone de détection ({trackingConfig.radius || 200}m)</Text>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      {/* Bouton de recentrage */}
      <TouchableOpacity style={styles.locationButton} onPress={recenterMap}>
        <Ionicons name="navigate" size={24} color="#10B981" />
      </TouchableOpacity>
    </View>
  );
}




