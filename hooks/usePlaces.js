import { useState, useEffect, useCallback } from 'react';
import lieuService from '../services/lieuService';
import { Alert } from 'react-native';

export const usePlaces = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  /**
   * Charger tous les lieux
   */
  const loadPlaces = useCallback(async () => {
    try {
      setLoading(true);
      const data = await lieuService.getAllLieux(true);
      setPlaces(data);
      setFilteredPlaces(data);
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Impossible de charger les lieux');
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Rafraîchir la liste
   */
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await loadPlaces();
    } finally {
      setRefreshing(false);
    }
  }, [loadPlaces]);

  /**
   * Rechercher des lieux par nom
   */
  const searchPlaces = useCallback((query) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setFilteredPlaces(places);
      return;
    }

    const filtered = places.filter(place => 
      place.nomLieu?.toLowerCase().includes(query.toLowerCase()) ||
      place.adresseLieu?.toLowerCase().includes(query.toLowerCase()) ||
      place.typeLieu?.typeLieu?.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredPlaces(filtered);
  }, [places]);

  /**
   * Supprimer un lieu
   */
  const deletePlace = useCallback(async (id) => {
    try {
      await lieuService.deleteLieu(id);
      await loadPlaces();
      return true;
    } catch (error) {
      Alert.alert('Erreur', error.message || 'Impossible de supprimer le lieu');
      return false;
    }
  }, [loadPlaces]);

  /**
   * Confirmer la suppression
   */
  const confirmDelete = useCallback((id, name) => {
    Alert.alert(
      'Confirmer la suppression',
      `Êtes-vous sûr de vouloir supprimer "${name}" ?`,
      [
        { text: 'Annuler', style: 'cancel' },
        {
          text: 'Supprimer',
          style: 'destructive',
          onPress: () => deletePlace(id)
        }
      ]
    );
  }, [deletePlace]);

  useEffect(() => {
    loadPlaces();
  }, [loadPlaces]);

  return {
    places: filteredPlaces,
    loading,
    refreshing,
    searchQuery,
    loadPlaces,
    onRefresh,
    searchPlaces,
    deletePlace,
    confirmDelete
  };
};