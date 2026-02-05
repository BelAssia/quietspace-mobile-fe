import appAPI from "../api/appAPI";

/**
 * Créer un nouvel avis
 */
export const createAvis = async (idUser, idLieu, note) => {
  try {
    const response = await appAPI.post('/avis', { idUser, idLieu, note });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création de l\'avis:', error);
    throw error;
  }
};

/**
 * Mettre à jour un avis existant
 */
export const updateAvis = async (idUser, idLieu, note) => {
  try {
    const response = await appAPI.patch(`/avis/${idUser}/${idLieu}`, { note });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'avis:', error);
    throw error;
  }
};

/**
 * Récupérer l'avis d'un utilisateur pour un lieu
 */
export const getUserAvis = async (idUser, idLieu) => {
  try {
    const response = await appAPI.get(`/avis/${idUser}/${idLieu}`);
    return response.data;
  } catch (error) {
    // Si c'est une erreur 404, retourner null (pas d'avis)
    if (error.response?.status === 404) {
      return null;
    }
    console.error('Erreur lors de la récupération de l\'avis:', error);
    throw error;
  }
};
