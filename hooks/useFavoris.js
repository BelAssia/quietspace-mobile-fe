import { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { getFavoris, removeFavori } from '../services/favorisService';


export const useFavoris = (navigation) => {
  const user = useSelector((state) => state.auth.user);

  const [favoris, setFavoris] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavoris = useCallback(async () => {
    if (!user?.id_user) {
      setLoading(false);
      return;
    }
    try {
      setLoading(true);
      const data = await getFavoris(user.id_user);
      setFavoris(data);
    } catch (err) {
      console.error('Erreur loadFavoris:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.id_user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      loadFavoris();
    });
    return unsubscribe;
  }, [navigation, loadFavoris]);

  const handleRemove = async (idLieu) => {
    if (!user?.id_user) return;
    try {
      await removeFavori(user.id_user, idLieu);
      setFavoris((prev) => prev.filter((f) => f.idLieu !== idLieu));
    } catch (err) {
      console.error('Erreur suppression favori:', err);
    }
  };

  return {user,favoris,loading,handleRemove};
};