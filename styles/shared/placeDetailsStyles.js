import { StyleSheet, Dimensions, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollView: {
    flex: 1,
  },
  
  // Image de couverture - CORRIGÉE
  imageContainer: {
    width: width,
    height: height * 0.35,
    position: 'relative',
    backgroundColor: '#E0E0E0',
  },
  coverImage: {
    width: '100%',
    height: '100%',
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    marginTop: 12,
    fontSize: 14,
    color: '#999',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
    background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.4))',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  
  // Header buttons - CORRIGÉS
  headerButtonsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 12 : 0,
  },
  backButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  favoriteButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  
  // Contenu - AMÉLIORÉ
  content: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    paddingTop: 20,
    paddingHorizontal: 20,
  },

  // Badge TYPE - NOUVEAU
  typeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#F0F2FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
  },
  typeBadgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#5B6FF0',
    marginLeft: 6,
    letterSpacing: 0.5,
  },
  
  // Nom du lieu - AMÉLIORÉ
  nomLieu: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#120217',
    marginBottom: 20,
    lineHeight: 34,
  },
  
  // Score de calme - COMPLÈTEMENT REVU
  scoreSection: {
    marginBottom: 24,
  },
  scoreCard: {
    backgroundColor: '#F8F9FA',
    borderRadius: 16,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreCircleContainer: {
    marginRight: 20,
  },
  scoreCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 6,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
  },
  scoreValue: {
    fontSize: 32,
    fontWeight: 'bold',
    lineHeight: 36,
  },
  scoreMax: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  scoreInfo: {
    flex: 1,
  },
  scoreLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
  },
  scoreLevel: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  
  // Sections
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#120217',
    marginLeft: 10,
  },
  
  // Adresse
  address: {
    fontSize: 16,
    color: '#4b5f83',
    lineHeight: 24,
    marginBottom: 14,
  },
  mapButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 18,
    backgroundColor: '#F0F2FF',
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  mapButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#5B6FF0',
    marginLeft: 8,
  },
  
  // Description
  description: {
    fontSize: 15,
    color: '#4b5f83',
    lineHeight: 24,
  },
  
  // Coordonnées GPS - AMÉLIORÉES
  coordinatesContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  coordinateItem: {
    flex: 1,
  },
  coordinateDivider: {
    width: 1,
    backgroundColor: '#D1D5DB',
    marginHorizontal: 18,
  },
  coordinateLabel: {
    fontSize: 12,
    color: '#9CA3AF',
    marginBottom: 6,
    fontWeight: '600',
  },
  coordinateValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#120217',
  },
  
  // Statistiques - AMÉLIORÉES
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 18,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#120217',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  
  // Informations - AMÉLIORÉES
  infoList: {
    backgroundColor: '#F8F9FA',
    borderRadius: 14,
    padding: 18,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoDivider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  infoLabel: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#120217',
    textAlign: 'right',
    flex: 1,
    marginLeft: 12,
  },
  
  // Bouton flottant - AMÉLIORÉ
  floatingButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    paddingVertical: 16,
    paddingBottom: Platform.OS === 'ios' ? 24 : 16,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 10,
  },
  floatingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B6FF0',
    paddingVertical: 16,
    borderRadius: 14,
    shadowColor: '#5B6FF0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  floatingButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    marginLeft: 10,
  },
  
  // États - AMÉLIORÉS
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 40,
  },
  errorText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 24,
    lineHeight: 24,
  },
  retryButton: {
    backgroundColor: '#5B6FF0',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 12,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
  },
  
  bottomSpacer: {
    height: 100,
  },
});