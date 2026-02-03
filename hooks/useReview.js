import { 
  Alert
} from 'react-native';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createAvis, updateAvis, getUserAvis } from '../services/Avisservice';

export const useReview = (route,navigation) =>{
  const { lieuId, lieuNom } = route.params;
  const user = useSelector((state) => state.auth.user);
  
  const [note, setNote] = useState(0);
  const [hoveredStar, setHoveredStar] = useState(0);
  const [loading, setLoading] = useState(false);
  const [checking, setChecking] = useState(true);
  const [existingNote, setExistingNote] = useState(null);
  const [isUpdate, setIsUpdate] = useState(false);

  useEffect(() => {
    if (user?.id_user) {
      checkExistingReview();
    } else {
      setChecking(false);
    }
  }, [user?.id_user]);

  const checkExistingReview = async () => {
    try {
      setChecking(true);
      const existingAvis = await getUserAvis(user.id_user, lieuId);
      
      if (existingAvis) {
        setExistingNote(existingAvis.note);
        setNote(existingAvis.note);
        setIsUpdate(true);
      }
      setChecking(false);
    } catch (error) {
      console.error('Erreur vérification note:', error);
      setChecking(false);
    }
  };

  const handleSubmit = async () => {
    if (note === 0) {
      Alert.alert('Erreur', 'Veuillez sélectionner une note');
      return;
    }

    if (!user?.id_user) {
      Alert.alert('Erreur', 'Vous devez être connecté pour laisser une note');
      return;
    }

    try {
      setLoading(true);
      
      if (isUpdate) {
        await updateAvis(user.id_user, lieuId, note);
        Alert.alert('Succès', 'Votre note a été mise à jour !', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      } else {
        await createAvis(user.id_user, lieuId, note);
        Alert.alert('Succès', 'Votre note a été ajoutée !', [
          { text: 'OK', onPress: () => navigation.goBack() }
        ]);
      }
      setLoading(false);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      setLoading(false);
      Alert.alert('Erreur', 'Impossible d\'enregistrer votre note');
    }
  };

return {lieuNom,lieuId,note,setNote,hoveredStar,setHoveredStar,loading, setLoading,
    checking,isUpdate,handleSubmit,
 };
};