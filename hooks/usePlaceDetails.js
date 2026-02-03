import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getLieuById } from '../services/lieuService';
import { addFavori, removeFavori, getFavoris } from '../services/favorisService';

export const usePlaceDetails = (route, navigation) =>{
  const { lieuId, lieu: lieuFromParams } = route.params;
  const user = useSelector((state) => state.auth.user);
  const [lieu, setLieu] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    loadLieuDetails();
    if (user?.id_user) {
      checkFavoris();
    }
  }, [lieuId, user?.id_user]);

  const loadLieuDetails = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await getLieuById(lieuId, true);
      setLieu(data);
      setLoading(false);
    } catch (err) {
      console.error('Erreur lors du chargement des détails:', err);
      setError('Impossible de charger les détails du lieu');
      setLoading(false);
    }
  };

  const checkFavoris = async () => {
    try {
      const favoris = await getFavoris(user.id_user);
      const estFavoris = favoris.some((f) => f.idLieu === lieuId);
      setIsFavorite(estFavoris);
    } catch (err) {
      console.error('Erreur checkFavoris:', err);
    }
  };

  const toggleFavorite = async () => {
    if (!user?.id_user) return;
    try {
      if (isFavorite) {
        await removeFavori(user.id_user, lieuId);
      } else {
        await addFavori(user.id_user, lieuId);
      }
      setIsFavorite(!isFavorite);
    } catch (err) {
      console.error('Erreur toggleFavorite:', err);
    }
  };

  const getNiveauCalmeColor = (score) => {
    if (score >= 80) return '#4CAF50';
    if (score >= 60) return '#FFC107';
    if (score >= 40) return '#FF9800';
    return '#F44336';
  };

  const getNiveauCalmeLabel = (score) => {
    if (score >= 80) return 'Très calme';
    if (score >= 60) return 'Calme';
    if (score >= 40) return 'Assez bruyant';
    return 'Très bruyant';
  };

  const getTypeIcon = (typeLieuLabel) => {
    const iconMap = {
      'BIBLIOTHEQUE': 'library',
      'BIBLIOTHÈQUE': 'library',
      'CAFE': 'cafe',
      'CAFÉ': 'cafe',
      'COWORKING': 'business',
      'SALLE_ETUDE': 'school',
      "SALLE D'ÉTUDE": 'school',
      'PARC': 'leaf',
      'MUSEE': 'images',
      'MUSÉE': 'images',
    };
    
    const upperType = typeLieuLabel?.toUpperCase() || '';
    return iconMap[upperType] || 'location';
  };

  const openMap = () => {
    console.log('Ouvrir la navigation vers:', lieu?.adresse_lieu);
  };

  const handleAddReview = () => {
    navigation.navigate('AddReview', {
      lieuId: lieu.id_lieu,
      lieuNom: lieu.nom_lieu
    });
  };


  return {lieu,loading,error,isFavorite,handleAddReview,openMap,getTypeIcon,
    getNiveauCalmeLabel,getNiveauCalmeColor,toggleFavorite};
};
