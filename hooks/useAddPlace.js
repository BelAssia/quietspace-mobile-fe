
import  { useState, useEffect, useRef } from "react";
import {
  Alert,

} from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  createLieuWithImage,
  searchPlaces,
  reverseGeocode,
} from "../services/lieuService";
import { getAllTypesLieux } from "../services/typeLieuService";


export const useAddPlace = (navigation) =>{
 const mapRef = useRef(null);
  const [imageUri, setImageUri] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    nomLieu: "",
    descriptionLieu: "",
    adresseLieu: "",
    idTypeLieu: null,
    latitude: 33.5731,
    longitude: -7.5898,
  });

  const [typesLieu, setTypesLieu] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingTypes, setLoadingTypes] = useState(true);

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
  }, []);

  const loadTypesLieu = async () => {
    try {
      console.log("📡 Chargement des types de lieux...");
      const data = await getAllTypesLieux();
      console.log("✅ Types de lieux reçus:", data);

      if (Array.isArray(data) && data.length > 0) {
        setTypesLieu(data);
        setFormData((prev) => ({ ...prev, idTypeLieu: data[0].idTypeLieu }));
      } else {
        setTypesLieu([]);
        Alert.alert("Attention", "Aucun type de lieu disponible");
      }
    } catch (error) {
      console.error("❌ Erreur chargement types:", error);
      Alert.alert("Erreur", "Impossible de charger les types de lieu");
      setTypesLieu([]);
    } finally {
      setLoadingTypes(false);
    }
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

  // Fonctions pour la gestion des images
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
        setImageUri(result.assets[0].uri);
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
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      Alert.alert("Erreur", "Impossible de prendre une photo");
    }
  };

  const removeImage = () => {
    setImageUri(null);
  };

  const showImagePicker = () => {
    Alert.alert("Choisir une image", "Sélectionnez la source de l'image", [
      { text: "Annuler", style: "cancel" },
      { text: "Prendre une photo", onPress: takePhoto },
      { text: "Choisir depuis la galerie", onPress: pickImage },
    ]);
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
      // Utiliser la fonction avec image
      await createLieuWithImage(formData, imageUri);
      Alert.alert("Succès", "Lieu créé avec succès", [
        { text: "OK", onPress: () => navigation.goBack() },
      ]);
    } catch (error) {
      Alert.alert("Erreur", error.message || "Impossible de créer le lieu");
    } finally {
      setLoading(false);
    }
  };

    return {mapRef,
        imageUri,
    formData,
    setFormData,
    typesLieu,
    loading,
    loadingTypes,
    searchQuery,
    setSearchQuery,
    searchResults,
    searching,
    showSearchResults,
    markerCoordinate,

    handleSearch,
    selectSearchResult,
    handleMapPress,

    removeImage,
    showImagePicker,
    handleSubmit,
    };

  };
