import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function PlaceCard({ place, onEdit, onDelete }) {
  return (
    <View style={styles.placeCard}>
      <View style={styles.placeHeader}>
        <View style={styles.placeInfo}>
          <Text style={styles.placeName} numberOfLines={1}>
            {place.nomLieu || 'Sans nom'}
          </Text>
          <Text style={styles.placeType}>
            {place.typeLieu?.typeLieu?.toUpperCase() || 'TYPE INCONNU'}
          </Text>
        </View>
        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => onEdit(place)}
          >
            <Ionicons name="create-outline" size={20} color="#5B6FF0" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.iconButton}
            onPress={() => onDelete(place.idLieu, place.nomLieu)}
          >
            <Ionicons name="trash-outline" size={20} color="#EF4444" />
          </TouchableOpacity>
        </View>
      </View>
      
      {place.adresseLieu && (
        <View style={styles.addressContainer}>
          <Ionicons name="location-outline" size={14} color="#6B7280" />
          <Text style={styles.placeAddress} numberOfLines={2}>
            {place.adresseLieu}
          </Text>
        </View>
      )}
      
      <View style={styles.footer}>
        <Text style={styles.placeScore}>
          Score: {place.scoreCalme || 0}/100
        </Text>
        <View style={styles.statsContainer}>
          {place.avis && place.avis.length > 0 && (
            <View style={styles.stat}>
              <Ionicons name="star" size={14} color="#F59E0B" />
              <Text style={styles.statText}>{place.avis.length}</Text>
            </View>
          )}
          {place.favoris && place.favoris.length > 0 && (
            <View style={styles.stat}>
              <Ionicons name="heart" size={14} color="#EF4444" />
              <Text style={styles.statText}>{place.favoris.length}</Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  placeCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  placeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  placeInfo: {
    flex: 1,
    marginRight: 12,
  },
  placeName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#120217',
    marginBottom: 4,
  },
  placeType: {
    fontSize: 11,
    color: '#5B6FF0',
    fontWeight: '600',
    letterSpacing: 0.5,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F5F7FF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 6,
  },
  placeAddress: {
    flex: 1,
    fontSize: 13,
    color: '#6B7280',
    lineHeight: 18,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
  },
  placeScore: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '600',
  },
  statsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  statText: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
});