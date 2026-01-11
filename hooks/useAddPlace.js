import { useState, useCallback, useEffect } from 'react';
import lieuService from '../services/lieuService';
import typeLieuService from '../services/typeLieuService';
import { Alert } from 'react-native';
import * as Location from 'expo-location';

export const useAddPlace = (navigation) => {
  const [formData, setFormData] = useState({
    idLieu: null,
    idTypeLieu: null,
    nomLieu: '',
    descriptionLieu: '',
    longitude: null,
    latitude: null,
    adresseLieu: '',
    imageLieu: ''
  });

  const [selectedLocation, setSelectedLocation] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [typesLieu, setTypesLieu] = useState([]);
  const [loadingTypes, setLoadingTypes] = useState(false);
  const [mapRegion, setMapRegion] = useState({
    latitude: 33.7038,
    longitude: -7.3588,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  /**
   * Charger les types de lieu
   */
  const loadTypesLieu = useCallback(async () => {
    try {
      setLoadingTypes(true);
      const types = await typeLieuService.getAllTypes();
      setTypesLieu(types);
    } catch (error) {
      console.error('Erreur chargement types:', error);
      Alert.alert('Erreur', 'Impossible de charger les types de lieu');
    } finally {
      setLoadingTypes(false);
    }
  }, []);

  useEffect(() => {
    loadTypesLieu();
  }, [loadTypesLieu]);

  /**
   * Générer un ID unique pour le lieu
   */
  const generateLieuId = useCallback(() => {
    return Date.now();
  }, []);

  /**
   * Obtenir la localisation actuelle
   */
  const getCurrentLocation = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        Alert.alert(
          'Permission refusée',
          'Veuillez autoriser l\'accès à votre localisation pour utiliser cette fonctionnalité'
        );
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = location.coords;

      setCurrentLocation({ latitude, longitude });
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      });

      return { latitude, longitude };
    } catch (error) {
      console.error('Erreur localisation:', error);
      Alert.alert('Erreur', 'Impossible d\'obtenir votre localisation');
    }
  }, []);

  /**
   * Géocoder inverse pour obtenir l'adresse
   */
  const reverseGeocode = useCallback(async (latitude, longitude) => {
    try {
      const addresses = await Location.reverseGeocodeAsync({
        latitude,
        longitude
      });

      if (addresses && addresses.length > 0) {
        const address = addresses[0];
        const formattedAddress = [
          address.name,
          address.street,
          address.city,
          address.region,
          address.country
        ].filter(Boolean).join(', ');

        return formattedAddress;
      }
    } catch (error) {
      console.error('Erreur geocoding:', error);
    }
    return '';
  }, []);

  /**
   * Sélectionner une position sur la carte
   */
  const onMapPress = useCallback(async (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    
    setSelectedLocation({ latitude, longitude });
    setFormData(prev => ({
      ...prev,
      latitude,
      longitude
    }));

    // Obtenir l'adresse
    const address = await reverseGeocode(latitude, longitude);
    if (address) {
      setFormData(prev => ({
        ...prev,
        adresseLieu: address
      }));
    }
  }, [reverseGeocode]);

  /**
   * Mettre à jour les champs du formulaire
   */
  const updateField = useCallback((field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  /**
   * Rechercher un lieu par nom sur la carte
   */
  const searchLocation = useCallback(async (query) => {
    try {
      if (!query.trim()) return;

      const locations = await Location.geocodeAsync(query);
      
      if (locations && locations.length > 0) {
        const { latitude, longitude } = locations[0];
        
        setMapRegion({
          latitude,
          longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        });

        setSelectedLocation({ latitude, longitude });
        setFormData(prev => ({
          ...prev,
          latitude,
          longitude,
          adresseLieu: query
        }));
      } else {
        Alert.alert('Aucun résultat', 'Aucun lieu trouvé pour cette recherche');
      }
    } catch (error) {
      console.error('Erreur recherche:', error);
      Alert.alert('Erreur', 'Impossible de rechercher ce lieu');
    }
  }, []);

  /**
   * Valider le formulaire
   */
  const validateForm = useCallback(() => {
    if (!formData.nomLieu.trim()) {
      Alert.alert('Erreur', 'Le nom du lieu est obligatoire');
      return false;
    }

    if (!formData.idTypeLieu) {
      Alert.alert('Erreur', 'Le type de lieu est obligatoire');
      return false;
    }

    if (!formData.latitude || !formData.longitude) {
      Alert.alert('Erreur', 'Veuillez sélectionner une position sur la carte');
      return false;
    }

    return true;
  }, [formData]);

  /**
   * Soumettre le formulaire
   */
  const submitPlace = useCallback(async () => {
    if (!validateForm()) return false;

    try {
      setLoading(true);

      const placeData = {
        ...formData,
        idLieu: generateLieuId()
      };

      await lieuService.createLieu(placeData);
      
      Alert.alert(
        'Succès',
        'Le lieu a été ajouté avec succès',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );

      return true;
    } catch (error) {
      console.error('Erreur création lieu:', error);
      Alert.alert('Erreur', error.message || 'Impossible d\'ajouter le lieu');
      return false;
    } finally {
      setLoading(false);
    }
  }, [formData, validateForm, generateLieuId, navigation]);

  /**
   * Réinitialiser le formulaire
   */
  const resetForm = useCallback(() => {
    setFormData({
      idLieu: null,
      idTypeLieu: null,
      nomLieu: '',
      descriptionLieu: '',
      longitude: null,
      latitude: null,
      adresseLieu: '',
      imageLieu: ''
    });
    setSelectedLocation(null);
  }, []);

  return {
    formData,
    selectedLocation,
    currentLocation,
    loading,
    loadingTypes,
    typesLieu,
    mapRegion,
    setMapRegion,
    updateField,
    onMapPress,
    getCurrentLocation,
    searchLocation,
    submitPlace,
    resetForm
  };
};