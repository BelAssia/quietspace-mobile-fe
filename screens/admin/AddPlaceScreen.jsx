import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import styles from "../../styles/admin/addPlaceStyles";
import { useAddPlace } from "../../hooks/useAddPlace";
export default function AddPlaceScreen({ navigation }) {
  const {mapRef,
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
  } = useAddPlace(navigation);

  //  Afficher le loader si les types ne sont pas encore chargés
  if (loadingTypes) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#5B6FF0" />
        <Text style={{ marginTop: 10, color: "#6B7280" }}>Chargement...</Text>
      </View>
    );
  }

  //  Afficher un message si aucun type de lieu n'est disponible
  if (!Array.isArray(typesLieu) || typesLieu.length === 0) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Ionicons name="alert-circle-outline" size={64} color="#EF4444" />
        <Text style={{ marginTop: 10, fontSize: 16, color: "#6B7280" }}>
          Aucun type de lieu disponible
        </Text>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.submitButtonText}>Retour</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="#120217" />
        </TouchableOpacity>
        <Text style={styles.title}>Ajouter un lieu</Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Recherche de lieu */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Rechercher un lieu</Text>
          <View style={styles.searchRow}>
            <View style={styles.searchInputContainer}>
              <Ionicons name="search" size={20} color="#9CA3AF" />
              <TextInput
                style={styles.searchInputField}
                placeholder="Ex: Café Central Casablanca..."
                value={searchQuery}
                onChangeText={setSearchQuery}
                onSubmitEditing={handleSearch}
                placeholderTextColor="#9CA3AF"
              />
            </View>
            <TouchableOpacity
              style={styles.searchButton}
              onPress={handleSearch}
              disabled={searching}
            >
              {searching ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Ionicons name="search" size={20} color="#FFFFFF" />
              )}
            </TouchableOpacity>
          </View>

          {/* Résultats de recherche */}
          {showSearchResults && (
            <View style={styles.searchResultsContainer}>
              {searchResults.length === 0 ? (
                <Text style={styles.noResults}>Aucun résultat trouvé</Text>
              ) : (
                searchResults.map((result, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.searchResultItem}
                    onPress={() => selectSearchResult(result)}
                  >
                    <Ionicons name="location" size={20} color="#5B6FF0" />
                    <View style={styles.searchResultText}>
                      <Text style={styles.searchResultName} numberOfLines={1}>
                        {result.displayName}
                      </Text>
                      <Text style={styles.searchResultType}>{result.type}</Text>
                    </View>
                    <Ionicons
                      name="chevron-forward"
                      size={20}
                      color="#9CA3AF"
                    />
                  </TouchableOpacity>
                ))
              )}
            </View>
          )}
        </View>

        {/* Carte */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            Sélectionner sur la carte
            <Text style={styles.sectionSubtitle}>
              {" "}
              (cliquez pour placer le marqueur)
            </Text>
          </Text>
          <View style={styles.mapContainer}>
            <MapView
              ref={mapRef}
              provider={PROVIDER_DEFAULT}
              style={styles.map}
              initialRegion={{
                latitude: 33.5731,
                longitude: -7.5898,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onPress={handleMapPress}
            >
              <Marker coordinate={markerCoordinate} />
            </MapView>
          </View>
          <View style={styles.coordinatesInfo}>
            <Text style={styles.coordinatesText}>
              📍 Lat: {markerCoordinate.latitude.toFixed(6)} | Lon:{" "}
              {markerCoordinate.longitude.toFixed(6)}
            </Text>
          </View>
        </View>

        {/* Section Image */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Image du lieu (optionnelle)</Text>

          {imageUri ? (
            <View style={styles.imagePreviewContainer}>
              <Image
                source={{ uri: imageUri }}
                style={styles.imagePreview}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeImageButton}
                onPress={removeImage}
              >
                <Ionicons name="trash-outline" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <TouchableOpacity
                style={styles.imageUploadButton}
                onPress={showImagePicker}
              >
                <Ionicons name="camera-outline" size={48} color="#9CA3AF" />
                <Text style={styles.imageUploadText}>Ajouter une photo</Text>
                <Text style={styles.imageUploadSubtext}>
                  Optionnel - appuyez pour sélectionner
                </Text>
              </TouchableOpacity>

              <Text style={styles.imageNote}>
                Format supporté : JPEG, PNG, GIF, WebP (max 5MB)
              </Text>
            </>
          )}
        </View>

        {/* Formulaire */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informations du lieu</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Nom du lieu <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Ex: Bibliothèque Centrale"
              value={formData.nomLieu}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, nomLieu: text }))
              }
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Type de lieu <Text style={styles.required}>*</Text>
            </Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={formData.idTypeLieu}
                onValueChange={(value) =>
                  setFormData((prev) => ({ ...prev, idTypeLieu: value }))
                }
                style={styles.picker}
              >
                {typesLieu.map((type) => (
                  <Picker.Item
                    key={type.idTypeLieu}
                    label={`${type.typeLieu} (Score: ${type.baseScore})`}
                    value={type.idTypeLieu}
                  />
                ))}
              </Picker>
            </View>
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Adresse</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Adresse complète..."
              value={formData.adresseLieu}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, adresseLieu: text }))
              }
              multiline
              numberOfLines={2}
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Description du lieu..."
              value={formData.descriptionLieu}
              onChangeText={(text) =>
                setFormData((prev) => ({ ...prev, descriptionLieu: text }))
              }
              multiline
              numberOfLines={4}
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
            style={styles.submitButton}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#FFFFFF" />
            ) : (
              <Text style={styles.submitButtonText}>Créer le lieu</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
