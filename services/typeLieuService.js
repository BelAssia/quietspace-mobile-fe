import appAPI from "../api/appAPI";


const TYPE_LIEU_ENDPOINT = '/type-lieu';

class TypeLieuService {
  /**
   * Récupérer tous les types de lieu
   */
  async getAllTypes(withLieux = false) {
    try {
      const response = await appAPI.get(TYPE_LIEU_ENDPOINT, {
        params: { withLieux: withLieux ? 'true' : 'false' }
      });
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Récupérer un type par ID
   */
  async getTypeById(id) {
    try {
      const response = await appAPI.get(`${TYPE_LIEU_ENDPOINT}/${id}`);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Créer un nouveau type
   */
  async createType(typeData) {
    try {
      const response = await appAPI.post(TYPE_LIEU_ENDPOINT, typeData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Mettre à jour un type
   */
  async updateType(id, typeData) {
    try {
      const response = await appAPI.patch(`${TYPE_LIEU_ENDPOINT}/${id}`, typeData);
      return response.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Supprimer un type
   */
  async deleteType(id) {
    try {
      await appAPI.delete(`${TYPE_LIEU_ENDPOINT}/${id}`);
      return true;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  /**
   * Gérer les erreurs
   */
  handleError(error) {
    if (error.response) {
      const message = error.response.data?.message || 
                     error.response.data?.error || 
                     'Erreur serveur';
      return new Error(message);
    } else if (error.request) {
      return new Error('Impossible de contacter le serveur. Vérifiez votre connexion.');
    } else {
      return new Error(error.message || 'Une erreur est survenue');
    }
  }
}

export default new TypeLieuService();