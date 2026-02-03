import { API_BASE_URL } from "../config/api.config";

/**
 * Récupérer tous les lieux
 */
export const getAllLieux = async (withRelations = false) => {
  try {
    const url = withRelations 
      ? `${API_BASE_URL}/lieu?withRelations=true`
      : `${API_BASE_URL}/lieu`;

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
    return data.map(lieu => transformLieuData(lieu));
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
    const url = withRelations 
      ? `${API_BASE_URL}/lieu/${id}?withRelations=true`
      : `${API_BASE_URL}/lieu/${id}`;
    console.log(' Fetching lieu from:', url);
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
    console.log(' Données brutes API:', JSON.stringify(data, null, 2));
    const transformed = transformLieuData(data);
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
    const url = `${API_BASE_URL}/lieu/closest?longitude=${longitude}&latitude=${latitude}&limit=${limit}`;
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
    return data.map(lieu => ({
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
    // Si c'est déjà une URL complète
    if (imageSource.startsWith('http://') || imageSource.startsWith('https://')) {
      imageLieu = imageSource;
    } 
    // Si c'est juste un nom de fichier
    else {
      imageLieu = `${API_BASE_URL}/assets/images/${imageSource}`;
    }
  } else {
    console.log(' Pas d\'image pour ce lieu');
  }

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