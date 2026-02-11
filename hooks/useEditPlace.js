import  { useState, useEffect, useRef } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  getLieuById,
  updateLieuWithImage,
  searchPlaces,
  reverseGeocode,
} from "../services/lieuService";
import { getAllTypesLieux } from "../services/typeLieuService";
import { API_BASE_URL } from "../config/api.config";

import {
 
  Alert,
  
} from "react-native";


export const useEditPlace = (navigation,route) =>{
  const { lieuId } = route.params;
  const mapRef = useRef(null);

  // Form state
  const [formData, setFormData] = useState({
    nomLieu: "",
    descriptionLieu: "",
    adresseLieu: "",
    idTypeLieu: null,
    latitude: 33.5731,
    longitude: -7.5898,
  });

  // Image states
  const [currentImage, setCurrentImage] = useState(null);
  const [newImageUri, setNewImageUri] = useState(null);
  const [removingImage, setRemovingImage] = useState(false);

  const [typesLieu, setTypesLieu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true);
  const [loadingLieu, setLoadingLieu] = useState(true);

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  // Map state
  const [markerCoordinate, setMarkerCoordinate] = useState({
    latitude: 33.5731,
    longitude: -7.5898,
  });

  useEffect(() => {
    loadTypesLieu();
    loadLieu();
  }, []);

  const loadTypesLieu = async () => {
    try {
      const data = await getAllTypesLieux();

      if (Array.isArray(data) && data.length > 0) {
        setTypesLieu(data);
      } else {
        setTypesLieu([]);
        Alert.alert("Attention", "Aucun type de lieu disponible");
      }
    } catch (error) {
      console.error("Erreur chargement types:", error);
      Alert.alert("Erreur", "Impossible de charger les types de lieu");
      setTypesLieu([]);
    } finally {
      setLoadingTypes(false);
    }
  };

  // Fonctions pour la gestion des images
  const loadLieu = async () => {
    try {
      const data = await getLieuById(lieuId, true);

      const initialData = {
        nomLieu: data.nom_lieu || "",
        descriptionLieu: data.description_lieu || "",
        adresseLieu: data.adresse_lieu || "",
        idTypeLieu: data.id_type_lieu,
        latitude: data.latitude || 33.5731,
        longitude: data.longitude || -7.5898,
      };

      setFormData(initialData);

      // Stocker l'URL complète de l'image
      // transformLieuData() devrait déjà retourner l'URL complète
      setCurrentImage(data.imageLieu);

      const initialCoordinate = {
        latitude: data.latitude || 33.5731,
        longitude: data.longitude || -7.5898,
      };
      setMarkerCoordinate(initialCoordinate);

      // Centrer la carte sur le lieu
      setTimeout(() => {
        mapRef.current?.animateToRegion(
          {
            ...initialCoordinate,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          },
          1000,
        );
      }, 500);
    } catch (error) {
      console.error(" Erreur chargement lieu:", error);
      Alert.alert("Erreur", "Impossible de charger le lieu", [
        { text: "Retour", onPress: () => navigation.goBack() },
      ]);
    } finally {
      setLoadingLieu(false);
    }
  };
  const pickImage = async () => {
    try {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission requise", "Accès à la galerie nécessaire");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setNewImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de sélectionner une image");
    }
  };

  const takePhoto = async () => {
    try {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission requise", "Accès à la caméra nécessaire");
        return;
      }

      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.8,
      });

      if (!result.canceled) {
        setNewImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de prendre une photo");
    }
  };

  const showImagePicker = () => {
    Alert.alert("Choisir une image", "Sélectionnez la source de l'image", [
      { text: "Annuler", style: "cancel" },
      { text: "Prendre une photo", onPress: takePhoto },
      { text: "Choisir depuis la galerie", onPress: pickImage },
    ]);
  };

  const removeImage = () => {
    Alert.alert(
      "Supprimer l'image",
      "Voulez-vous vraiment supprimer cette image ?",
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: () => {
            setRemovingImage(true);
            setNewImageUri(""); // Chaîne vide signifie "supprimer l'image"
          },
        },
      ],
    );
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      setSearching(true);
      const data = await searchPlaces(searchQuery);
      setSearchResults(Array.isArray(data) ? data : []);
      setShowSearchResults(true);
    } catch (error) {
      Alert.alert("Erreur", "Impossible de rechercher des lieux");
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  };

  const selectSearchResult = async (result) => {
    const newCoordinate = {
      latitude: result.latitude,
      longitude: result.longitude,
    };

    setMarkerCoordinate(newCoordinate);
    setFormData((prev) => ({
      ...prev,
      latitude: result.latitude,
      longitude: result.longitude,
      adresseLieu: result.displayName,
    }));

    mapRef.current?.animateToRegion(
      {
        ...newCoordinate,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      },
      1000,
    );

    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleMapPress = async (e) => {
    const coordinate = e.nativeEvent.coordinate;
    setMarkerCoordinate(coordinate);
    setFormData((prev) => ({
      ...prev,
      latitude: coordinate.latitude,
      longitude: coordinate.longitude,
    }));

    try {
      const data = await reverseGeocode(
        coordinate.latitude,
        coordinate.longitude,
      );
      if (data.display_name) {
        setFormData((prev) => ({
          ...prev,
          adresseLieu: data.display_name,
        }));
      }
    } catch (error) {
      console.log("Géocodage inverse échoué:", error);
    }
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.nomLieu.trim()) {
      Alert.alert("Erreur", "Le nom du lieu est obligatoire");
      return;
    }
    if (!formData.idTypeLieu) {
      Alert.alert("Erreur", "Veuillez sélectionner un type de lieu");
      return;
    }

    try {
      setLoading(true);

      // Préparer les données
      const updateData = { ...formData };

      // Si on veut supprimer l'image
      if (removingImage) {
        updateData.imageLieu = ""; // Chaîne vide = supprimer l'image
      }

      // Mettre à jour avec l'image
      await updateLieuWithImage(
        lieuId,
        updateData,
        newImageUri === "" ? null : newImageUri,
        removingImage,
      );

      Alert.alert("Succès", "Lieu modifié avec succès", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erreur", error.message || "Impossible de modifier le lieu");
    } finally {
      setLoading(false);
    }
  };

  // Modifiez la fonction getDisplayImage() :
  const getDisplayImage = () => {
    // URL de l'image par défaut depuis le backend
    const defaultImageUrl = `${API_BASE_URL}/assets/images/placeholder_lieuimg.jpg`;

    // Si on veut supprimer l'image, montrer l'image par défaut
    if (removingImage) {
      return { uri: defaultImageUrl };
    }

    // Si on a une nouvelle image sélectionnée
    if (newImageUri) {
      return { uri: newImageUri };
    }

    // Si on a une image actuelle (depuis le backend)
    if (currentImage) {
      // Si currentImage est déjà une URL complète
      if (currentImage.startsWith("http")) {
        return { uri: currentImage };
      }
      // Sinon, construire l'URL complète
      return { uri: `${API_BASE_URL}${currentImage}` };
    }

    // Fallback: image par défaut
    return { uri: defaultImageUrl };
  };

 
    return {
mapRef,
formData, setFormData,
currentImage, 
newImageUri, 
removingImage,
typesLieu,
loading, 
loadingTypes, 
loadingLieu, 
searchQuery, setSearchQuery,
searchResults,
searching, 
showSearchResults, 
markerCoordinate, 
showImagePicker,
removeImage,
handleSearch,
selectSearchResult,
handleMapPress,
handleSubmit,
getDisplayImage};

  };
