import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker, UrlTile } from 'react-native-maps';
import { Ionicons } from '@expo/vector-icons';

export default function MapSelector({ 
  region, 
  selectedLocation, 
  onMapPress, 
  onCurrentLocation 
}) {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={region}
        onPress={onMapPress}
        showsUserLocation
        showsMyLocationButton={false}
        mapType="none" // Désactiver le mapType par défaut
      >
        {/* OpenStreetMap Tiles - 100% Gratuit */}
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />
        
        {selectedLocation && (
          <Marker
            coordinate={selectedLocation}
            title="Lieu sélectionné"
            pinColor="#5B6FF0"
          >
            <View style={styles.customMarker}>
              <Ionicons name="location" size={40} color="#5B6FF0" />
            </View>
          </Marker>
        )}
      </MapView>

      <TouchableOpacity 
        style={styles.myLocationButton}
        onPress={onCurrentLocation}
      >
        <Ionicons name="locate" size={24} color="#5B6FF0" />
      </TouchableOpacity>

      {selectedLocation && (
        <View style={styles.coordinatesInfo}>
          <Ionicons name="location" size={16} color="#5B6FF0" />
          <Text style={styles.coordinatesText}>
            {selectedLocation.latitude.toFixed(6)}, {selectedLocation.longitude.toFixed(6)}
          </Text>
        </View>
      )}
      
      {/* Attribution OpenStreetMap (obligatoire) */}
      <View style={styles.attribution}>
        <Text style={styles.attributionText}>
          © OpenStreetMap contributors
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  map: {
    flex: 1,
  },
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  myLocationButton: {
    position: 'absolute',
    right: 16,
    bottom: 50,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  coordinatesInfo: {
    position: 'absolute',
    top: 16,
    left: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    gap: 6,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#120217',
    fontWeight: '500',
  },
  attribution: {
    position: 'absolute',
    bottom: 4,
    left: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  attributionText: {
    fontSize: 9,
    color: '#666',
  },
});