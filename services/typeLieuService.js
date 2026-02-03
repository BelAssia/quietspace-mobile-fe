import { API_BASE_URL } from "../config/api.config";

/**
 * Récupérer tous les types de lieux
 * @returns {Promise<Array>} Liste des types de lieux
 */
export const getAllTypesLieux = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/type-lieu`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Erreur lors de la récupération des types de lieux:', error);
    throw error;
  }
};



/**
 * Récupérer un type de lieu par son ID
 * @param {number} id - ID du type de lieu
 * @param {boolean} withLieux - Inclure les lieux associés
 * @returns {Promise<Object>} Type de lieu
 */
export const getTypeLieuById = async (id, withLieux = false) => {
  try {
    const url = withLieux 
      ? `${API_BASE_URL}/type-lieu/${id}?withLieux=true`
      : `${API_BASE_URL}/type-lieu/${id}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du type de lieu ${id}:`, error);
    throw error;
  }
};



