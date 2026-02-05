import appAPI from "../api/appAPI";
import { API_BASE_URL } from "../config/api.config";


/**
 * Récupérer tous les lieux
 */
export const getAllLieux = async (withRelations = false) => {
  try {
    const params = withRelations ? { params: { withRelations: true } } : {};
    const response = await appAPI.get('/lieu', params);
    return response.data.map(lieu => transformLieuData(lieu));
  } catch (error) {
    console.error('Erreur lors de la récupération des lieux:', error);
    throw error;
  }
};

/**
 * Récupérer un lieu par son ID
 */
export const getLieuById = async (id, withRelations = false) => {
  try {
    const params = withRelations ? { params: { withRelations: true } } : {};
    const response = await appAPI.get(`/lieu/${id}`, params);
    console.log(' Données brutes API:', JSON.stringify(response.data, null, 2));
    const transformed = transformLieuData(response.data);
    console.log(' Données transformées:', JSON.stringify(transformed, null, 2));
    return transformed;
  } catch (error) {
    console.error(`Erreur lors de la récupération du lieu ${id}:`, error);
    throw error;
  }
};

/**
 * Récupérer les N lieux les plus proches
 */
export const getClosestLieux = async (longitude, latitude, limit = 10) => {
  try {
    const response = await appAPI.get('/lieu/closest', {
      params: { longitude, latitude, limit }
    });
    return response.data.map(lieu => ({
      ...transformLieuData(lieu),
      distance: lieu.distance
    }));
  } catch (error) {
    console.error('Erreur lors de la récupération des lieux les plus proches:', error);
    throw error;
  }
};

/**
 * Transformer les données du lieu pour le format frontend
 */
const transformLieuData = (lieu) => {
  let longitude = null;
  let latitude = null;
  // Extraire les coordonnées
  if (lieu.geom?.coordinates) {
    [longitude, latitude] = lieu.geom.coordinates;
  } else if (lieu.longitude !== undefined && lieu.latitude !== undefined) {
    longitude = lieu.longitude;
    latitude = lieu.latitude;
  }
  
  // Gérer typeLieu (accepter type_lieu ET typeLieu)
  let typeLieu = null;
  const typeLieuSource = lieu.typeLieu || lieu.type_lieu;
  
  if (typeLieuSource) {
    typeLieu = {
      idTypeLieu: typeLieuSource.idTypeLieu,
      typeLieu: typeLieuSource.typeLieu,
      baseScore: typeLieuSource.baseScore,
      lieux: typeLieuSource.lieux || []
    };
  }
  
  const imageSource = lieu.imageLieu || lieu.image_lieu;
  let imageLieu = null;
  
  if (imageSource) {
    // Si c'est l'image par défaut
    if (imageSource === 'placeholder_lieuimg.jpg') {
      imageLieu = `${appAPI.defaults.baseURL}/assets/images/placeholder_lieuimg.jpg`;
    }
    // Si c'est déjà une URL complète
    else if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      imageLieu = imageSource;
    } 
    // Si c'est un nom de fichier UUID (image uploadée)
    else if (imageSource.includes('-') || imageSource.length > 20) {
      // C'est probablement une image uploadée (UUID.jpg)
      imageLieu = `${appAPI.defaults.baseURL}/assets/images/lieux/${imageSource}`;
    }
    // Sinon, c'est peut-être dans le dossier images/
    else {
      imageLieu = `${appAPI.defaults.baseURL}/assets/images/${imageSource}`;
    }
  } else {
    // Fallback à l'image par défaut
    imageLieu = `${appAPI.defaults.baseURL}/assets/images/placeholder_lieuimg.jpg`;
  }

  console.log('🔍 Transformation image:', {
    source: imageSource,
    result: imageLieu,
    apiBase: appAPI.defaults.baseURL
  });

  const result = {
    id_lieu: lieu.idLieu,
    id_type_lieu: lieu.idTypeLieu,
    nom_lieu: lieu.nomLieu?.trim() || '',             
    description_lieu: lieu.descriptionLieu || '',
    latitude,
    longitude,
    score_calme: Number(lieu.scoreCalme) || 0,         
    niveau_calme: formatNiveauCalme(lieu.niveauCalme),
    adresse_lieu: lieu.adresseLieu || '',
    imageLieu: imageLieu,
    created_at: lieu.createdAt,
    updated_at: lieu.updatedAt,
    typeLieu: typeLieu,
    note_moyenne: lieu.noteMoyenne !== undefined ? lieu.noteMoyenne : null,
    avis: lieu.avis || [],
    favoris: lieu.favoris || [],
    envBruitLieux: lieu.envBruitLieux || [],
    lieuCalmePeriodes: lieu.lieuCalmePeriodes || []
  };
  return result;
};

/*
 * Formater le niveau de calme pour l'affichage
 */
const formatNiveauCalme = (niveau) => {
  if (!niveau) return 'Non défini';
  const niveauxMap = {
    'tres_calme': 'Très calme',
    'calme': 'Calme',
    'assez_bruyant': 'Assez bruyant',
    'tres_bruyant': 'Très bruyant'
  };
  return niveauxMap[niveau] || niveau;
};

/////////////////
/////////////// GESTION ADMIN
//////////////

/**
 * Supprimer un lieu
 */
export const deleteLieu = async (id) => {
  try {
    await appAPI.delete(`/lieu/${id}`);
    return true;
  } catch (error) {
    console.error(`Erreur lors de la suppression du lieu ${id}:`, error);
    throw error;
  }
};

/**
 * Rechercher des lieux via Nominatim (OpenStreetMap)
 */
export const searchPlaces = async (query) => {
  try {
    const response = await appAPI.get('/lieu/geocode/search', {
      params: { q: query }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la recherche de lieux:', error);
    throw error;
  }
};

/**
 * Géocodage inverse - Obtenir l'adresse depuis les coordonnées
 */
export const reverseGeocode = async (latitude, longitude) => {
  try {
    const response = await appAPI.get('/lieu/geocode/reverse', {
      params: { latitude, longitude }
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors du géocodage inverse:', error);
    throw error;
  }
};

/**
 * Créer un lieu avec image
 */
export const createLieuWithImage = async (lieuData, imageUri) => {
  try {
    const formData = new FormData();
    
    // Ajouter les champs texte
    Object.keys(lieuData).forEach(key => {
      if (lieuData[key] !== null && lieuData[key] !== undefined) {
        formData.append(key, String(lieuData[key]));
      }
    });
    
    // Ajouter l'image si elle existe
    if (imageUri) {
      const fileName = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('image', {
        uri: imageUri,
        name: fileName,
        type: fileType,
      });
    }
    
    const response = await appAPI.post('/lieu', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return transformLieuData(response.data);
  } catch (error) {
    console.error('Erreur lors de la création du lieu avec image:', error);
    throw error;
  }
};

/**
 * Mettre à jour un lieu avec image
 */
export const updateLieuWithImage = async (id, lieuData, imageUri, removeImage = false) => {
  try {
    const formData = new FormData();
    
    // Ajouter les champs texte
    Object.keys(lieuData).forEach(key => {
      if (lieuData[key] !== null && lieuData[key] !== undefined && key !== 'imageLieu') {
        formData.append(key, String(lieuData[key]));
      }
    });
    
    // Gestion des images
    if (imageUri) {
      // Nouvelle image
      const fileName = imageUri.split('/').pop();
      const match = /\.(\w+)$/.exec(fileName);
      const fileType = match ? `image/${match[1]}` : 'image/jpeg';
      
      formData.append('image', {
        uri: imageUri,
        name: fileName,
        type: fileType,
      });
    } else if (removeImage) {
      // Pour supprimer l'image (mettre l'image par défaut)
      formData.append('imageLieu', '');
    }
    
    const response = await fetch(`${API_BASE_URL}/lieu/${id}`, {
      method: 'PUT',
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || `Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return transformLieuData(data);
  } catch (error) {
    console.error(`Erreur lors de la mise à jour du lieu ${id}:`, error);
    throw error;
  }
};



