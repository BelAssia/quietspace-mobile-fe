import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#120217',
  },

  // Sections
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#120217',
    marginBottom: 12,
  },
  sectionSubtitle: {
    fontSize: 12,
    fontWeight: '400',
    color: '#6B7280',
  },

  // Recherche
  searchRow: {
    flexDirection: 'row',
    gap: 8,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    paddingHorizontal: 16,
    borderRadius: 12,
    height: 48,
    gap: 8,
  },
  searchInputField: {
    flex: 1,
    fontSize: 16,
    color: '#120217',
  },
  searchButton: {
    width: 48,
    height: 48,
    backgroundColor: '#5B6FF0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  // Résultats de recherche
  searchResultsContainer: {
    marginTop: 12,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    padding: 8,
    maxHeight: 300,
  },
  searchResultItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    marginBottom: 8,
    gap: 12,
  },
  searchResultText: {
    flex: 1,
  },
  searchResultName: {
    fontSize: 14,
    fontWeight: '500',
    color: '#120217',
    marginBottom: 2,
  },
  searchResultType: {
    fontSize: 12,
    color: '#6B7280',
  },
  noResults: {
    textAlign: 'center',
    color: '#9CA3AF',
    padding: 20,
  },

  // Carte
  mapContainer: {
    height: 300,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#F3F4F6',
  },
  map: {
    flex: 1,
  },
  coordinatesInfo: {
    backgroundColor: '#F9FAFB',
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  coordinatesText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },

  // Formulaire
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  required: {
    color: '#EF4444',
  },
  input: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#120217',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  pickerContainer: {
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  picker: {
    height: 50,
  },

  // Boutons
  buttonsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingBottom: 40,
    gap: 12,
  },
  cancelButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6B7280',
  },
  submitButton: {
    flex: 1,
    height: 50,
    backgroundColor: '#5B6FF0',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },


// Ajoutez ces styles à la fin de votre fichier addPlaceStyles.js
imagePreviewContainer: {
  position: 'relative',
  marginBottom: 15,
  borderRadius: 16,
  overflow: 'hidden',
  borderWidth: 2,
  borderColor: '#E5E7EB',
  backgroundColor: '#F3F4F6',
},
imagePreview: {
  width: '100%',
  height: 200,
},
removeImageButton: {
  position: 'absolute',
  top: 12,
  right: 12,
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: 20,
  width: 40,
  height: 40,
  justifyContent: 'center',
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 3,
},
imageUploadButton: {
  height: 200,
  backgroundColor: '#F9FAFB',
  borderRadius: 16,
  borderWidth: 2,
  borderColor: '#E5E7EB',
  borderStyle: 'dashed',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 15,
},
imageUploadText: {
  fontSize: 16,
  fontWeight: '600',
  color: '#120217',
  marginTop: 12,
},
imageUploadSubtext: {
  fontSize: 14,
  color: '#6B7280',
  marginTop: 4,
},
imageNote: {
  fontSize: 12,
  color: '#6B7280',
  textAlign: 'center',
  marginTop: 8,
  fontStyle: 'italic',
}
});