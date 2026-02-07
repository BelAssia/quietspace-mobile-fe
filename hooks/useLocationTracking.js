import { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import * as Location from 'expo-location';
import { API_BASE_URL } from '../config/api.config';

export const useLocationTracking = () => {
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [trackingConfig, setTrackingConfig] = useState({
    updateInterval: 120000, // 2 minutes par défaut
    radius: 200,
  });
  
  const locationSubscription = useRef(null);
  // 🆕 Pour calculer la vitesse manuellement
  const lastPosition = useRef(null);
  const lastTimestamp = useRef(null);

  // Connexion WebSocket
  useEffect(() => {
    const newSocket = io(`${API_BASE_URL}/location`, {
      transports: ['websocket'],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    newSocket.on('connect', () => {
      console.log(' WebSocket connecté');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log(' WebSocket déconnecté');
      setIsConnected(false);
    });

    newSocket.on('nearbyPlaces', (data) => {
      console.log(` ${data.places.length} lieux reçus`);
      setNearbyPlaces(data.places);
    });

    newSocket.on('trackingConfig', (config) => {
      
      setTrackingConfig((prev) => ({ ...prev, ...config }));
    });

    newSocket.on('trackingStatus', (status) => {
      console.log(' Status:', status.message);
    });

    newSocket.on('error', (error) => {
      console.error(' Erreur WebSocket:', error);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  //  Fonction pour calculer la vitesse manuellement
  const calculateSpeed = (newLat, newLon, newTimestamp) => {
    if (!lastPosition.current || !lastTimestamp.current) {
      return 0;
    }

    const timeDiff = (newTimestamp - lastTimestamp.current) / 1000; // en secondes
    
    // Si moins de 1 seconde, vitesse non fiable
    if (timeDiff < 1) {
      return 0;
    }

    // Calcul distance avec formule Haversine (en mètres)
    const R = 6371e3;
    const φ1 = (lastPosition.current.lat * Math.PI) / 180;
    const φ2 = (newLat * Math.PI) / 180;
    const Δφ = ((newLat - lastPosition.current.lat) * Math.PI) / 180;
    const Δλ = ((newLon - lastPosition.current.lon) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // distance en mètres

    // Vitesse = distance / temps (en m/s)
    const speed = distance / timeDiff;

    // Limiter les valeurs aberrantes (max 50 m/s = 180 km/h)
    return Math.min(speed, 50);
  };

  // Envoyer la position actuelle au backend
  const sendCurrentLocation = async () => {
    if (!socket || !isConnected) {
      console.log(' Socket non connecté');
      return;
    }

    try {
      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const newLat = location.coords.latitude;
      const newLon = location.coords.longitude;
      const newTimestamp = location.timestamp;

      //  Calculer la vitesse manuellement
      let calculatedSpeed = calculateSpeed(newLat, newLon, newTimestamp);

      // Utiliser la vitesse de l'API si disponible et cohérente, sinon notre calcul
      let finalSpeed = location.coords.speed;
      
      if (finalSpeed === null || finalSpeed === undefined || finalSpeed < 0) {
        finalSpeed = calculatedSpeed;
      } else {
        // Vérifier la cohérence (si différence > 10 m/s, utiliser le calcul)
        if (Math.abs(finalSpeed - calculatedSpeed) > 10) {
          console.log(` Vitesse API incohérente: ${finalSpeed} m/s vs calculée: ${calculatedSpeed.toFixed(2)} m/s`);
          finalSpeed = calculatedSpeed;
        }
      }

      // Mettre à jour les références pour le prochain calcul
      lastPosition.current = { lat: newLat, lon: newLon };
      lastTimestamp.current = newTimestamp;

      const locationData = {
        latitude: newLat,
        longitude: newLon,
        speed: Math.max(0, finalSpeed), // Assurer que speed >= 0
        accuracy: location.coords.accuracy,
        timestamp: newTimestamp,
      };

      console.log(' Envoi position:', {
        ...locationData,
        speedKmh: (locationData.speed * 3.6).toFixed(2) + ' km/h'
      });
      
      socket.emit('updateLocation', locationData);

    } catch (error) {
      console.error(' Erreur récupération position:', error);
    }
  };

  // Démarrer le tracking (UNIQUEMENT QUAND APP OUVERTE)
  const startTracking = async () => {
    try {
      // Vérifier les permissions FOREGROUND uniquement
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission de localisation refusée');
        return;
      }

      if (!socket || !isConnected) {
        console.error('Socket non connecté');
        return;
      }

      console.log(' Démarrage du tracking');
      
      // Réinitialiser les références de calcul de vitesse
      lastPosition.current = null;
      lastTimestamp.current = null;
      
      socket.emit('startTracking');

      // Envoyer immédiatement la première position
      await sendCurrentLocation();

      // Tracking en temps réel avec watchPositionAsync
      locationSubscription.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 5000, // Vérifier toutes les 5 secondes
          distanceInterval: 10, // Ou après 10 mètres de déplacement
        },
        (location) => {
          const newLat = location.coords.latitude;
          const newLon = location.coords.longitude;
          const newTimestamp = location.timestamp;

          // Calculer la vitesse
          let calculatedSpeed = calculateSpeed(newLat, newLon, newTimestamp);
          let finalSpeed = location.coords.speed;
          
          if (finalSpeed === null || finalSpeed === undefined || finalSpeed < 0) {
            finalSpeed = calculatedSpeed;
          } else if (Math.abs(finalSpeed - calculatedSpeed) > 10) {
            console.log(`⚠️ Vitesse incohérente: API=${finalSpeed} m/s, calculée=${calculatedSpeed.toFixed(2)} m/s`);
            finalSpeed = calculatedSpeed;
          }

          // Mettre à jour les références
          lastPosition.current = { lat: newLat, lon: newLon };
          lastTimestamp.current = newTimestamp;

          const locationData = {
            latitude: newLat,
            longitude: newLon,
            speed: Math.max(0, finalSpeed),
            accuracy: location.coords.accuracy,
            timestamp: newTimestamp,
          };

          console.log('📡 Position mise à jour:', {
            ...locationData,
            speedKmh: (locationData.speed * 3.6).toFixed(2) + ' km/h'
          });
          
          socket.emit('updateLocation', locationData);
        },
      );

      setIsTracking(true);

    } catch (error) {
      console.error(' Erreur démarrage tracking:', error);
    }
  };

  // Arrêter le tracking
  const stopTracking = () => {
    console.log(' Arrêt du tracking');

    if (socket) {
      socket.emit('stopTracking');
    }

    if (locationSubscription.current) {
      locationSubscription.current.remove();
      locationSubscription.current = null;
    }

    // Réinitialiser les références
    lastPosition.current = null;
    lastTimestamp.current = null;

    setIsTracking(false);
  };

  // Changer le rayon de tracking
  const setTrackingRadius = (radius) => {
    if (socket && isConnected) {
      socket.emit('setTrackingRadius', { radius });
    }
  };

  // Nettoyage au démontage du composant
  useEffect(() => {
    return () => {
      stopTracking();
    };
  }, []);

  return {
    isConnected,
    isTracking,
    nearbyPlaces,
    trackingConfig,
    startTracking,
    stopTracking,
    setTrackingRadius,
    sendCurrentLocation,
  };
};