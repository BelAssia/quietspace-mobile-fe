import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 15,
    backgroundColor: "#FFFFFF",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#120217",
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F2937",
    marginBottom: 12,
  },
  searchRow: {
    flexDirection: "row",
    gap: 10,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 48,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInputField: {
    flex: 1,
    fontSize: 16,
    color: "#1F2937",
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: "#5B6FF0",
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  searchResultsContainer: {
    marginTop: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    maxHeight: 200,
  },
  searchResultItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  searchResultText: {
    flex: 1,
    marginLeft: 10,
  },
  searchResultName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#1F2937",
  },
  searchResultType: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 2,
  },
  noResults: {
    padding: 20,
    textAlign: "center",
    color: "#9CA3AF",
  },
  mapContainer: {
    height: 400,
    borderRadius: 12,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  map: {
    width: "100%",
    height: "100%",
  },
  coordinatesInfo: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 8,
  },
  coordinatesText: {
    fontSize: 13,
    color: "#6B7280",
    textAlign: "center",
  },
  locationButton: {
    position: "absolute",
    bottom: 40,
    right: 20,
    backgroundColor: "#FFFFFF",
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },


  // styles/user/userLocationStyles.js

// Ajoutez ces styles à votre fichier existant :

speedInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#EEF2FF',
  padding: 8,
  borderRadius: 8,
  gap: 6,
},
speedText: {
  fontSize: 12,
  color: '#5B6FF0',
  fontWeight: '600',
},

// Cards des lieux à proximité (scroll horizontal)
nearbyPlaceCard: {
  backgroundColor: '#FFFFFF',
  borderRadius: 12,
  padding: 12,
  marginRight: 12,
  width: 180,
  borderWidth: 1,
  borderColor: '#E5E7EB',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.05,
  shadowRadius: 4,
  elevation: 2,
},
placeCardHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: 8,
},
placeCardName: {
  fontSize: 14,
  fontWeight: '600',
  color: '#111827',
  flex: 1,
  marginRight: 8,
},
scoreBadge: {
  backgroundColor: '#5B6FF0',
  paddingHorizontal: 8,
  paddingVertical: 4,
  borderRadius: 6,
},
scoreText: {
  fontSize: 12,
  fontWeight: '700',
  color: '#FFFFFF',
},
placeCardInfo: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 4,
  gap: 4,
},
distanceText: {
  fontSize: 12,
  color: '#6B7280',
  fontWeight: '500',
},
calmeText: {
  fontSize: 12,
  color: '#6B7280',
},

// Marqueurs personnalisés sur la carte
customMarker: {
  alignItems: 'center',
  justifyContent: 'center',
},
markerInner: {
  backgroundColor: '#10B981',
  width: 36,
  height: 36,
  borderRadius: 18,
  alignItems: 'center',
  justifyContent: 'center',
  borderWidth: 3,
  borderColor: '#FFFFFF',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.3,
  shadowRadius: 3,
  elevation: 5,
},
markerScore: {
  color: '#FFFFFF',
  fontSize: 11,
  fontWeight: '700',
},

// Légende de la carte
legend: {
  backgroundColor: '#F9FAFB',
  padding: 12,
  borderRadius: 8,
  marginTop: 10,
  gap: 8,
},
legendItem: {
  flexDirection: 'row',
  alignItems: 'center',
  gap: 8,
},
legendDot: {
  width: 12,
  height: 12,
  borderRadius: 6,
},
legendCircle: {
  width: 12,
  height: 12,
  borderRadius: 6,
  borderWidth: 2,
},
legendText: {
  fontSize: 12,
  color: '#6B7280',
},












calloutContainer: {
    width: 280,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 8,
  },

  // Contenu du callout
  calloutContent: {
    gap: 10,
  },

  // En-tête avec titre et score
  calloutHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: 8,
  },

  calloutTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: '#1F2937',
    lineHeight: 20,
  },

  calloutScoreBadge: {
    backgroundColor: '#10B981',
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    minWidth: 40,
    alignItems: 'center',
  },

  calloutScoreText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  // Section d'informations
  calloutInfo: {
    gap: 6,
  },

  calloutInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  calloutDistance: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },

  calloutCalme: {
    fontSize: 13,
    color: '#6B7280',
    flex: 1,
  },

  // Footer avec call-to-action
  calloutFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  calloutAction: {
    fontSize: 12,
    color: '#5B6FF0',
    fontWeight: '600',
  },

  // Marqueur personnalisé (déjà existant, gardé pour référence)
  customMarker: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  markerInner: {
    backgroundColor: '#10B981',
    borderRadius: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  markerScore: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 14,
  },
});