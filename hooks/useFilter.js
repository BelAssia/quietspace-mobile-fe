import { useState, useEffect, useCallback, useMemo } from 'react';
import 
{ 
  getAllLieux,
} from '../services/lieuService';
import * as Location from 'expo-location';
import { getAllTypesLieux } from '../services/typeLieuService';

export const useFilter = (navigation) =>{
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const [lieux, setLieux] = useState([]);
  const [filteredLieux, setFilteredLieux] = useState([]);
  const [typesLieux, setTypesLieux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [locationPermission, setLocationPermission] = useState(null);

  // États des filtres
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedNiveauCalme, setSelectedNiveauCalme] = useState([]);
  const [selectedDistance, setSelectedDistance] = useState(null);

  const niveauxCalme = useMemo(() => [
    { label: 'Très calme', scoreMin: 80, scoreMax: 100, color: '#4CAF50' },
    { label: 'Calme', scoreMin: 60, scoreMax: 79, color: '#FFC107' },
    { label: 'Assez bruyant', scoreMin: 40, scoreMax: 59, color: '#FF9800' },
    { label: 'Très bruyant', scoreMin: 0, scoreMax: 39, color: '#F44336' }
  ], []);

  const distanceOptions = useMemo(() => [
    { label: '500m', value: 500 },
    { label: '1 km', value: 1000 },
    { label: '2 km', value: 2000 },
    { label: '5 km', value: 5000 },
    { label: '10 km', value: 10000 },
    { label: 'Tous', value: null }
  ], []);

  // Mapper les types de lieux avec leurs icônes
  const getIconForTypeLieu = useCallback((typeLieu) => {
    const iconMap = {
      'BIBLIOTHEQUE': 'library',
      'BIBLIOTHÈQUE': 'library',
      'CAFE': 'cafe',
      'CAFÉ': 'cafe',
      'COWORKING': 'business',
      'SALLE_ETUDE': 'school',
      "SALLE D'ÉTUDE": 'school',
      'SALLE D\'ÉTUDE': 'school',
      'PARC': 'leaf',
      'MUSEE': 'images',
      'MUSÉE': 'images',
    };
    
    const upperType = typeLieu?.toUpperCase() || '';
    return iconMap[upperType] || 'location';
  }, []);

  // Charger les types de lieux depuis l'API
  const loadTypesLieux = useCallback(async () => {
    try {
      const types = await getAllTypesLieux();
      const formattedTypes = types.map(type => ({
        id: type.idTypeLieu,
        name: type.typeLieu,
        label: type.typeLieu,
        icon: getIconForTypeLieu(type.typeLieu),
        baseScore: type.baseScore
      }));

      setTypesLieux(formattedTypes);
    } catch (error) {
      setError('Erreur lors du chargement des types de lieux');
    }
  }, [getIconForTypeLieu]);

  // Charger les lieux depuis l'API
  const fetchLieux = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      let data;
      if (userLocation) {
        data = await getAllLieux(true);
      } else {
        data = await getAllLieux(true);
      }
      setLieux(data);
      setFilteredLieux(data);
      setLoading(false);
    } catch (error) {
      setError('Impossible de charger les lieux');
      setLoading(false);
    }
  }, [userLocation]);

  // Calculer la distance entre deux points (formule Haversine)
  const calculateDistance = useCallback((lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Rayon de la Terre en mètres
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance en mètres
  }, []);

  // Appliquer les filtres
  const applyFilters = useCallback(() => {
    if (lieux.length === 0) {
      console.log('Pas de lieux à filtrer pour le moment');
      return;
    }
    
    let filtered = [...lieux];
    
    // Filtre par recherche
    if (searchQuery) {
      filtered = filtered.filter(lieu =>
        lieu.nom_lieu.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lieu.adresse_lieu.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre par type
    if (selectedTypes.length > 0) {
      filtered = filtered.filter(lieu => selectedTypes.includes(lieu.id_type_lieu));
    }

    // Filtre par niveau de calme
    if (selectedNiveauCalme.length > 0) {
      filtered = filtered.filter(lieu => {
        return selectedNiveauCalme.some(niveau => {
          const niveauInfo = niveauxCalme.find(n => n.label === niveau);
          return lieu.score_calme >= niveauInfo.scoreMin && lieu.score_calme <= niveauInfo.scoreMax;
        });
      });
    }

    // Filtre par distance
    if (selectedDistance && userLocation) {
      filtered = filtered.filter(lieu => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          lieu.latitude,
          lieu.longitude
        );
        return distance <= selectedDistance;
      });
    }

    // Trier par distance si la position est disponible
    if (userLocation) {
      filtered.sort((a, b) => {
        const distA = calculateDistance(userLocation.latitude, userLocation.longitude, a.latitude, a.longitude);
        const distB = calculateDistance(userLocation.latitude, userLocation.longitude, b.latitude, b.longitude);
        return distA - distB;
      });
    }
    
    setFilteredLieux(filtered);
  }, [lieux, selectedTypes, selectedNiveauCalme, selectedDistance, searchQuery, userLocation, calculateDistance, niveauxCalme]);

  // Récupérer la position réelle de l'utilisateur
  const getUserLocation = useCallback(async () => {
    try {
      // Demander la permission d'accès à la localisation
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationPermission(status);
      
      if (status !== 'granted') {
        console.log('Permission de localisation refusée');
        // Fallback vers Casablanca si permission refusée
        setUserLocation({
          latitude: 33.5731,
          longitude: -7.6177
        });
        return;
      }

      // Récupérer la position actuelle
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced, // Bon équilibre entre précision et batterie
      });

      setUserLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      });

      console.log('Localisation récupérée:', location.coords);
    } catch (error) {
      console.error('Erreur lors de la récupération de la localisation:', error);
      // Fallback vers Casablanca en cas d'erreur
      setUserLocation({
        latitude: 33.5731,
        longitude: -7.6177
      });
    }
  }, []);

  // Récupérer la position de l'utilisateur au chargement
  useEffect(() => {    
    getUserLocation();
  }, [getUserLocation]);

  // Charger les types de lieux
  useEffect(() => {
    loadTypesLieux();
  }, [loadTypesLieux]);

  // Charger les lieux quand la position est disponible
  useEffect(() => {
    if (userLocation) {
      fetchLieux();
    }
  }, [userLocation, fetchLieux]);

  // Appliquer les filtres quand les filtres ou la recherche changent
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const toggleType = useCallback((typeId) => {
    setSelectedTypes(prev =>
      prev.includes(typeId)
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  }, []);

  const toggleNiveauCalme = useCallback((niveau) => {
    setSelectedNiveauCalme(prev =>
      prev.includes(niveau)
        ? prev.filter(n => n !== niveau)
        : [...prev, niveau]
    );
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedTypes([]);
    setSelectedNiveauCalme([]);
    setSelectedDistance(null);
    setSearchQuery('');
  }, []);

  const formatDistance = useCallback((meters) => {
    if (meters < 1000) {
      return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
  }, []);

  const getTypeIcon = useCallback((typeId) => {
    const type = typesLieux.find(t => t.id === typeId);
    return type ? type.icon : 'location';
  }, [typesLieux]);

  const getTypeLabel = useCallback((typeId) => {
    const type = typesLieux.find(t => t.id === typeId);
    return type ? type.label : 'Lieu';
  }, [typesLieux]);

  const getNiveauCalmeColor = useCallback((score) => {
    const niveau = niveauxCalme.find(n => score >= n.scoreMin && score <= n.scoreMax);
    return niveau ? niveau.color : '#999';
  }, [niveauxCalme]);

  const handleLieuPress = useCallback((lieu) => {
    navigation.navigate('PlaceDetails', { 
      lieuId: lieu.id_lieu,
      lieu: lieu
    });
  }, [navigation]);

  const activeFiltersCount = selectedTypes.length + selectedNiveauCalme.length + (selectedDistance ? 1 : 0);

  
return {searchQuery, setSearchQuery,showFilters, setShowFilters,userLocation, setUserLocation,
lieux, setLieux,filteredLieux, setFilteredLieux,typesLieux, setTypesLieux,loading, setLoading,
error, setError,activeFiltersCount,handleLieuPress,getNiveauCalmeColor,getTypeLabel,getTypeIcon,
formatDistance,resetFilters,toggleNiveauCalme,toggleType,distanceOptions,niveauxCalme, selectedNiveauCalme,
selectedDistance,setSelectedDistance,calculateDistance,selectedTypes
};
 
};
