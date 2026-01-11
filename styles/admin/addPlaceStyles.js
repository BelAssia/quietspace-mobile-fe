import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useAddPlace } from '../../hooks/useAddPlace';
import MapSelector from '../../components/places/MapSelector';
import styles from '../../styles/admin/addPlaceStyles';

export default function AddPlaceScreen({ navigation }) {
  const {
    formData,
    selectedLocation,
    loading,
    loadingTypes,
    typesLieu,
    mapRegion,
    setMapRegion,
    updateField,
    onMapPress,
    getCurrentLocation,
    searchLocation,
    submitPlace,
  } = useAddPlace(navigation);

  const [locationSearch, setLocationSearch] = useState('');

  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleSearchLocation = () => {
    if (locationSearch.trim()) {
      searchLocation(locationSearch);
    }
  };

  const handleSubmit = async () => {
    await submitPlace();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#120217" />
        </TouchableOpacity>
        <Text style={styles.title}>Ajouter un lieu</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Section Carte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="map-outline" size={18} color="#120217" /> Localisation
          </Text>
          <Text style={styles.sectionSubtitle}>
            Recherchez ou appuyez sur la carte pour sélectionner
          </Text>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Rechercher une adresse..."
              placeholderTextColor="#9CA3AF"
              value={locationSearch}
              onChangeText={setLocationSearch}
              onSubmitEditing={handleSearchLocation}
            />
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearchLocation}
            >
              <Ionicons name="search" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          <MapSelector
            region={mapRegion}
            selectedLocation={selectedLocation}
            onMapPress={onMapPress}
            onCurrentLocation={getCurrentLocation}
          />

          {selectedLocation && (
            <View style={styles.locationInfo}>
              <Ionicons name="checkmark-circle" size={20} color="#10B981" />
              <Text style={styles.locationInfoText}>
                Position sélectionnée
              </Text>
            </View>
          )}
        </View>

        {/* Section Informations */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            <Ionicons name="information-circle-outline" size={18} color="#120217" /> Informations
          </Text>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Nom du lieu <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Bibliothèque Centrale"
              placeholderTextColor="#9CA3AF"
              value={formData.nomLieu}
              onChangeText={(value) => updateField('nomLieu', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>
              Type de lieu <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.pickerContainer}>
              {loadingTypes ? (
                <View style={styles.pickerLoading}>
                  <ActivityIndicator size="small" color="#5B6FF0" />
                  <Text style={styles.pickerLoadingText}>Chargement...</Text>
                </View>
              ) : (
                <Picker
                  selectedValue={formData.idTypeLieu}
                  onValueChange={(value) => updateField('idTypeLieu', value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Sélectionner un type..." value={null} />
                  {typesLieu.map((type) => (
                    <Picker.Item
                      key={type.idTypeLieu}
                      label={type.typeLieu}
                      value={type.idTypeLieu}
                    />
                  ))}
                </Picker>
              )}
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Décrivez le lieu..."
              placeholderTextColor="#9CA3AF"
              value={formData.descriptionLieu}
              onChangeText={(value) => updateField('descriptionLieu', value)}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              style={styles.input}
              placeholder="Adresse complète"
              placeholderTextColor="#9CA3AF"
              value={formData.adresseLieu}
              onChangeText={(value) => updateField('adresseLieu', value)}
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>URL de l'image</Text>
            <TextInput
              style={styles.input}
              placeholder="https://example.com/image.jpg"
              placeholderTextColor="#9CA3AF"
              value={formData.imageLieu}
              onChangeText={(value) => updateField('imageLieu', value)}
            />
          </View>
        </View>

        {/* Boutons */}
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.cancelButtonText}>Annuler</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <>
                <Ionicons name="checkmark" size={20} color="#FFFFFF" />
                <Text style={styles.submitButtonText}>Ajouter</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}