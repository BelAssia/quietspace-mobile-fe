import appAPI from "../api/appAPI";

const LIEU_ENDPOINT = '/lieu';

class LieuService {
  /**
   * Récupérer tous les lieux
   */
  async getAllLieux(withRelations = false) {
    try {
      const response = await appAPI.get(LIEU_ENDPOINT, {
        params: { withRelations: withRelations ? 'true' : 'false' }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Récupérer un lieu par ID
   */
  async getLieuById(id, withRelations = false) {
    try {
      const response = await appAPI.get(`${LIEU_ENDPOINT}/${id}`, {
        params: { withRelations: withRelations ? 'true' : 'false' }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Créer un nouveau lieu
   */
  async createLieu(lieuData) {
    try {
      const response = await appAPI.post(LIEU_ENDPOINT, lieuData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Mettre à jour un lieu
   */
  async updateLieu(id, lieuData) {
    try {
      const response = await appAPI.patch(`${LIEU_ENDPOINT}/${id}`, lieuData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Supprimer un lieu
   */
  async deleteLieu(id) {
    try {
      await appAPI.delete(`${LIEU_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Rechercher des lieux à proximité
   */
  async findNearby(longitude, latitude, radius = 1000) {
    try {
      const response = await appAPI.get(`${LIEU_ENDPOINT}/nearby`, {
        params: { longitude, latitude, radius }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Rechercher des lieux par type
   */
  async findByType(idTypeLieu) {
    try {
      const response = await appAPI.get(`${LIEU_ENDPOINT}/type/${idTypeLieu}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Rechercher des lieux dans une bounding box
   */
  async findInBoundingBox(minLng, minLat, maxLng, maxLat) {
    try {
      const response = await appAPI.get(`${LIEU_ENDPOINT}/bounding-box`, {
        params: { minLng, minLat, maxLng, maxLat }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Gérer les erreurs
   */
  handleError(error) {
    if (error.response) {
      // Erreur de réponse du serveur
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     'Erreur serveur';
      return new Error(message);
    } else if (error.request) {
      // Pas de réponse du serveur
      return new Error('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } else {
      // Erreur de configuration
      return new Error(error.message || 'Une erreur est survenue');
    }
  }
}

export default new LieuService();