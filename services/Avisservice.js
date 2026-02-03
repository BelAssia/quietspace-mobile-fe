import { API_BASE_URL } from "../config/api.config";

/**
 * Créer un nouvel avis
 */
export const createAvis = async (idUser, idLieu, note) => {
  try {
    const response = await fetch(`${API_BASE_URL}/avis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        idUser,
        idLieu,
        note
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
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
    const response = await fetch(`${API_BASE_URL}/avis/${idUser}/${idLieu}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        note
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l\'avis:', error);
    throw error;
  }
};


/*
 * Récupérer l'avis d'un utilisateur pour un lieu
 */
export const getUserAvis = async (idUser, idLieu) => {
  try {
    const response = await fetch(`${API_BASE_URL}/avis/${idUser}/${idLieu}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 404) {
      return null; 
    }
    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'avis:', error);
    throw error;
  }
};