// import { useState, useEffect, useRef } from "react";
// import * as Location from "expo-location";
// import {
//   Alert,
// } from "react-native";

// export const useLocationScreen = () => {
//   const mapRef = useRef(null);
//   const [userLocation, setUserLocation] = useState(null);
//   const [locationLoading, setLocationLoading] = useState(true);
//   const [mapRegion, setMapRegion] = useState(null);
//   // États pour la recherche
//   const [searchQuery, setSearchQuery] = useState("");
//   const [searchResults, setSearchResults] = useState([]);
//   const [searching, setSearching] = useState(false);
//   const [showSearchResults, setShowSearchResults] = useState(false);
//   // État pour le marqueur placé par l'utilisateur
//   const [markerCoordinate, setMarkerCoordinate] = useState(null);

//   useEffect(() => {
//     getUserLocation();
//   }, []);

//   const getUserLocation = async () => {
//     try {
//       setLocationLoading(true);
//       const { status } = await Location.requestForegroundPermissionsAsync();
      
//       if (status !== "granted") {
//         Alert.alert(
//           "Permission requise",
//           "L'application a besoin d'accéder à votre position pour fonctionner.",
//           [{ text: "Réessayer", onPress: () => getUserLocation() }]
//         );
//         setLocationLoading(false);
//         return;
//       }

//       const location = await Location.getCurrentPositionAsync({
//         accuracy: Location.Accuracy.High,
//         maximumAge: 10000,
//         timeout: 15000,
//       });

//       const coords = {
//         latitude: location.coords.latitude,
//         longitude: location.coords.longitude,
//       };

//       console.log("📍 Position réelle obtenue:", coords);

//       setUserLocation(coords);
//       setMapRegion({
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });

//       // Placer le marqueur initial sur la position de l'utilisateur
//       setMarkerCoordinate(coords);

//       setLocationLoading(false);
//     } catch (error) {
//       console.error("❌ Erreur de géolocalisation:", error);
//       setLocationLoading(false);
//       Alert.alert(
//         "Erreur de localisation",
//         "Impossible d'obtenir votre position. Vérifiez que le GPS est activé.",
//         [{ text: "Réessayer", onPress: () => getUserLocation() }]
//       );
//     }
//   };

//   const handleSearch = async () => {
//     if (!searchQuery.trim()) {
//       setShowSearchResults(false);
//       return;
//     }

//     setSearching(true);
//     setShowSearchResults(true);

//     try {
//       const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
//         searchQuery
//       )}&limit=5`;

//       const response = await fetch(url);
//       const data = await response.json();

//       const results = data.map((item) => ({
//         displayName: item.display_name,
//         latitude: parseFloat(item.lat),
//         longitude: parseFloat(item.lon),
//         type: item.type,
//       }));

//       setSearchResults(results);
//     } catch (error) {
//       console.error("Erreur de recherche:", error);
//       Alert.alert("Erreur", "Impossible de rechercher le lieu");
//     } finally {
//       setSearching(false);
//     }
//   };

//   const selectSearchResult = (result) => {
//     const coords = {
//       latitude: result.latitude,
//       longitude: result.longitude,
//     };

//     const newRegion = {
//       ...coords,
//       latitudeDelta: 0.01,
//       longitudeDelta: 0.01,
//     };

//     // Placer le marqueur sur le résultat de recherche
//     setMarkerCoordinate(coords);

//     setMapRegion(newRegion);
    
//     if (mapRef.current) {
//       mapRef.current.animateToRegion(newRegion, 1000);
//     }

//     setShowSearchResults(false);
//     setSearchQuery("");
//   };

//   const handleMapPress = (event) => {
//     const { latitude, longitude } = event.nativeEvent.coordinate;
//     setMarkerCoordinate({ latitude, longitude });
//   };

//   const recenterMap = () => {
//     if (userLocation && mapRef.current) {
//       const newRegion = {
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//         latitudeDelta: 0.02,
//         longitudeDelta: 0.02,
//       };
//       mapRef.current.animateToRegion(newRegion, 1000);
//       setMarkerCoordinate(userLocation);
//     }
//   };

//   return {
//    mapRef,
//   userLocation,
//   locationLoading,
//   mapRegion,
//   setMapRegion,
//   searchQuery,
//   setSearchQuery,
//   searchResults,
//   searching,
//   showSearchResults,
//   markerCoordinate,
//   handleSearch,
//   selectSearchResult,
//   handleMapPress,
//   recenterMap,
//   };


// };
// hooks/useLocationScreen.js
import { useState, useEffect, useRef } from "react";
import * as Location from "expo-location";
import { Alert } from "react-native";

export const useLocationScreen = () => {
  const mapRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationLoading, setLocationLoading] = useState(true);
  const [mapRegion, setMapRegion] = useState(null);
  
  // États pour la recherche
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  
  // État pour le marqueur placé par l'utilisateur
  const [markerCoordinate, setMarkerCoordinate] = useState(null);
  
  // 🆕 Référence pour le watcher de position
  const locationWatcher = useRef(null);

  useEffect(() => {
    getUserLocation();
    
    // 🆕 Nettoyage à la destruction du composant
    return () => {
      if (locationWatcher.current) {
        locationWatcher.current.remove();
      }
    };
  }, []);

  const getUserLocation = async () => {
    try {
      setLocationLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== "granted") {
        Alert.alert(
          "Permission requise",
          "L'application a besoin d'accéder à votre position pour fonctionner.",
          [{ text: "Réessayer", onPress: () => getUserLocation() }]
        );
        setLocationLoading(false);
        return;
      }

      // Position initiale
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        maximumAge: 10000,
        timeout: 15000,
      });

      const coords = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };

      console.log("📍 Position réelle obtenue:", coords);

      setUserLocation(coords);
      setMapRegion({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });

      // Placer le marqueur initial sur la position de l'utilisateur
      setMarkerCoordinate(coords);

      setLocationLoading(false);

      // 🆕 Watcher pour mettre à jour userLocation en temps réel
      locationWatcher.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Balanced,
          timeInterval: 5000, // Mise à jour toutes les 5 secondes
          distanceInterval: 10, // Ou après 10m de déplacement
        },
        (newLocation) => {
          const newCoords = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          };
          
          console.log("📍 Position mise à jour:", newCoords);
          
          // 🆕 Mettre à jour userLocation pour que le buffer suive
          setUserLocation(newCoords);
        }
      );

    } catch (error) {
      console.error("❌ Erreur de géolocalisation:", error);
      setLocationLoading(false);
      Alert.alert(
        "Erreur de localisation",
        "Impossible d'obtenir votre position. Vérifiez que le GPS est activé.",
        [{ text: "Réessayer", onPress: () => getUserLocation() }]
      );
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setShowSearchResults(false);
      return;
    }

    setSearching(true);
    setShowSearchResults(true);

    try {
      const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        searchQuery
      )}&limit=5`;

      const response = await fetch(url);
      const data = await response.json();

      const results = data.map((item) => ({
        displayName: item.display_name,
        latitude: parseFloat(item.lat),
        longitude: parseFloat(item.lon),
        type: item.type,
      }));

      setSearchResults(results);
    } catch (error) {
      console.error("Erreur de recherche:", error);
      Alert.alert("Erreur", "Impossible de rechercher le lieu");
    } finally {
      setSearching(false);
    }
  };

  const selectSearchResult = (result) => {
    const coords = {
      latitude: result.latitude,
      longitude: result.longitude,
    };

    const newRegion = {
      ...coords,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    // Placer le marqueur sur le résultat de recherche
    setMarkerCoordinate(coords);

    setMapRegion(newRegion);
    
    if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 1000);
    }

    setShowSearchResults(false);
    setSearchQuery("");
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerCoordinate({ latitude, longitude });
  };

  const recenterMap = () => {
    if (userLocation && mapRef.current) {
      const newRegion = {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
        latitudeDelta: 0.02,
        longitudeDelta: 0.02,
      };
      mapRef.current.animateToRegion(newRegion, 1000);
      setMarkerCoordinate(userLocation);
    }
  };

  return {
    mapRef,
    userLocation,
    locationLoading,
    mapRegion,
    setMapRegion,
    searchQuery,
    setSearchQuery,
    searchResults,
    searching,
    showSearchResults,
    markerCoordinate,
    handleSearch,
    selectSearchResult,
    handleMapPress,
    recenterMap,
  };
};