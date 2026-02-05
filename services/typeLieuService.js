import appAPI from "../api/appAPI";

/**
 * Récupérer tous les types de lieux
 * @returns {Promise<Array>} Liste des types de lieux
 */
export const getAllTypesLieux = async () => {
  try {
    const response = await appAPI.get('/type-lieu');
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des types de lieux:', error);
    
    // Gestion améliorée des erreurs
    if (error.response) {
      // Erreur de réponse du serveur
      throw new Error(error.response.data?.message || `Erreur ${error.response.status}`);
    } else if (error.request) {
      // Pas de réponse du serveur
      throw new Error('Pas de réponse du serveur. Vérifiez votre connexion.');
    } else {
      // Erreur de configuration
      throw new Error('Erreur de configuration de la requête');
    }
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
    const params = withLieux ? { params: { withLieux: true } } : {};
    const response = await appAPI.get(`/type-lieu/${id}`, params);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la récupération du type de lieu ${id}:`, error);
    
    if (error.response) {
      throw new Error(error.response.data?.message || `Erreur ${error.response.status}`);
    } else if (error.request) {
      throw new Error('Pas de réponse du serveur');
    } else {
      throw new Error('Erreur de configuration');
    }
  }
};

/**
 * Créer un nouveau type de lieu (admin)
 * @param {Object} typeLieuData - Données du type de lieu
 * @returns {Promise<Object>} Type de lieu créé
 */
export const createTypeLieu = async (typeLieuData) => {
  try {
    const response = await appAPI.post('/type-lieu', typeLieuData);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la création du type de lieu:', error);
    handleAxiosError(error);
  }
};

/**
 * Mettre à jour un type de lieu (admin)
 * @param {number} id - ID du type de lieu
 * @param {Object} typeLieuData - Données à mettre à jour
 * @returns {Promise<Object>} Type de lieu mis à jour
 */
export const updateTypeLieu = async (id, typeLieuData) => {
  try {
    const response = await appAPI.patch(`/type-lieu/${id}`, typeLieuData);
    return response.data;
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du type de lieu ${id}:`, error);
    handleAxiosError(error);
  }
};

/**
 * Supprimer un type de lieu (admin)
 * @param {number} id - ID du type de lieu
 * @returns {Promise<boolean>} Succès de la suppression
 */
export const deleteTypeLieu = async (id) => {
  try {
    await appAPI.delete(`/type-lieu/${id}`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du type de lieu ${id}:`, error);
    handleAxiosError(error);
  }
};

/**
 * Fonction utilitaire pour gérer les erreurs axios
 */
const handleAxiosError = (error) => {
  if (error.response) {
    // Erreur du serveur (4xx, 5xx)
    const status = error.response.status;
    const message = error.response.data?.message || error.response.data || `Erreur ${status}`;
    
    switch (status) {
      case 400:
        throw new Error(`Données invalides: ${message}`);
      case 401:
        throw new Error('Non autorisé. Veuillez vous reconnecter.');
      case 403:
        throw new Error('Accès interdit.');
      case 404:
        throw new Error('Ressource non trouvée.');
      case 409:
        throw new Error('Conflit: ' + message);
      case 422:
        throw new Error(`Erreur de validation: ${message}`);
      case 500:
        throw new Error('Erreur serveur. Veuillez réessayer plus tard.');
      default:
        throw new Error(`Erreur ${status}: ${message}`);
    }
  } else if (error.request) {
    // Pas de réponse du serveur
    throw new Error('Impossible de contacter le serveur. Vérifiez votre connexion internet.');
  } else {
    // Erreur de configuration
    throw new Error('Erreur de configuration: ' + error.message);
  }
};
