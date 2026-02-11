import { useState, useEffect, useCallback } from "react";
import { getAllLieux, deleteLieu } from "../services/lieuService";
import { getAllTypesLieux } from "../services/typeLieuService";
import {
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native"; 

export const useManagePlaces = (navigation) =>{
  const [lieux, setLieux] = useState([]);
  const [filteredLieux, setFilteredLieux] = useState([]);
  const [typesLieu, setTypesLieu] = useState([]); 
  const [loading, setLoading] = useState(true);

  // Filtres
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [sortBy, setSortBy] = useState("recent");


  useFocusEffect(
    useCallback(() => {
      loadData();
    }, []),
  );

  useEffect(() => {
    if (lieux.length > 0) {
      applyFilters();
    }
  }, [searchQuery, selectedType, sortBy, lieux]);

  const loadData = async () => {
    try {
      setLoading(true);


      // Charger les types de lieux
      const typesData = await getAllTypesLieux();
      console.log(" Types de lieux chargés:", typesData);
      setTypesLieu(Array.isArray(typesData) ? typesData : []);

      // Charger les lieux
      const lieuxData = await getAllLieux();
      console.log("Lieux chargés:", lieuxData);
      setLieux(Array.isArray(lieuxData) ? lieuxData : []);
    } catch (error) {
      console.error("Erreur lors du chargement:", error);
      Alert.alert(
        "Erreur",
        "Impossible de charger les données: " + error.message,
      );
      // En cas d'erreur, initialiser avec des tableaux vides
      setTypesLieu([]);
      setLieux([]);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    if (!Array.isArray(lieux) || lieux.length === 0) {
      setFilteredLieux([]);
      return;
    }

    let filtered = [...lieux];

    // Filtrer par recherche
    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (lieu) =>
          lieu.nom_lieu?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lieu.adresse_lieu?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    // Filtrer par type
    if (selectedType !== "all") {
      filtered = filtered.filter(
        (lieu) => lieu.id_type_lieu === parseInt(selectedType),
      );
    }

    // Trier
    switch (sortBy) {
      case "name":
        filtered.sort((a, b) =>
          (a.nom_lieu || "").localeCompare(b.nom_lieu || ""),
        );
        break;
      case "score":
        filtered.sort((a, b) => (b.score_calme || 0) - (a.score_calme || 0));
        break;
      case "recent":
      default:
        filtered.sort(
          (a, b) => new Date(b.created_at) - new Date(a.created_at),
        );
        break;
    }

    setFilteredLieux(filtered);
  };

  const handleDelete = async (id, nomLieu) => {
    Alert.alert(
      "Confirmation",
      `Êtes-vous sûr de vouloir supprimer "${nomLieu}" ?`,
      [
        { text: "Annuler", style: "cancel" },
        {
          text: "Supprimer",
          style: "destructive",
          onPress: async () => {
            try {
              await deleteLieu(id);
              setLieux(lieux.filter((l) => l.id_lieu !== id));
              Alert.alert("Succès", "Lieu supprimé avec succès");
            } catch (error) {
              Alert.alert("Erreur", "Impossible de supprimer le lieu");
              console.error(error);
            }
          },
        },
      ],
    );
  };

  const getTypeLieuName = (idType) => {
    if (!Array.isArray(typesLieu) || typesLieu.length === 0) {
      return "N/A";
    }
    const type = typesLieu.find((t) => t.idTypeLieu === idType);
    return type ? type.typeLieu : "N/A";
  };

  const getNiveauCalmeColor = (niveau) => {
    const colors = {
      "Très calme": "#10B981",
      Calme: "#34D399",
      "Assez bruyant": "#F59E0B",
      "Très bruyant": "#EF4444",
    };
    return colors[niveau] || "#6B7280";
  };
   const handleLieuPress = useCallback((lieu) => {
    navigation.navigate('PlaceDetails', { 
      lieuId: lieu.id_lieu,
      lieu: lieu
    });
  }, [navigation]);

    return {filteredLieux,
typesLieu,
loading,
searchQuery, setSearchQuery,
selectedType, setSelectedType,
sortBy, setSortBy,
handleDelete,
getTypeLieuName,
getNiveauCalmeColor,handleLieuPress};

  };
