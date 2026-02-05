import { 
  View, 
  Text, 
  ScrollView, 
  Image, 
  TouchableOpacity,
  SafeAreaView,
  StatusBar
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/shared/placeDetailsStyles';
import { usePlaceDetails } from "../../hooks/usePlaceDetails";

export default function PlaceDetailsScreen({ route, navigation }) {
  const {lieu,loading,error,isFavorite,handleAddReview,openMap,getTypeIcon,
    getNiveauCalmeLabel,getNiveauCalmeColor,toggleFavorite} =  usePlaceDetails(route, navigation);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Chargement...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (error || !lieu) {
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.errorContainer}>
          <Ionicons name="alert-circle-outline" size={64} color="#F44336" />
          <Text style={styles.errorText}>{error || 'Lieu introuvable'}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.retryButtonText}>Retour</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const typeLieuLabel = lieu.typeLieu?.typeLieu || 'LIEU';
  const typeLieuIcon = getTypeIcon(typeLieuLabel);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
      
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        bounces={true}
      >
        <View style={styles.imageContainer}>
          {lieu.imageLieu ? (
            <Image 
              source={{ uri: lieu.imageLieu }} 
              style={styles.coverImage}
              resizeMode="cover"
              onError={(e) => {
                console.log('Erreur chargement image:', lieu.imageLieu);
              }}
            />
          ) : (
            <View style={styles.placeholderImage}>
              <Ionicons 
                name={typeLieuIcon}
                size={100} 
                color="#BDBDBD" 
              />
              <Text style={styles.placeholderText}>Aucune image disponible</Text>
            </View>
          )}
          
          <View style={styles.imageOverlay} />
          
          <SafeAreaView style={styles.headerButtonsContainer}>
            <View style={styles.headerButtons}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
                activeOpacity={0.8}
              >
                <Ionicons name="arrow-back" size={24} color="#fff" />
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={styles.favoriteButton}
                onPress={toggleFavorite}
                activeOpacity={0.8}
              >
                <Ionicons 
                  name={isFavorite ? "heart" : "heart-outline"} 
                  size={24} 
                  color={isFavorite ? "#FF4444" : "#fff"} 
                />
              </TouchableOpacity>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.content}>
          <View style={styles.typeBadge}>
            <Ionicons 
              name={typeLieuIcon}
              size={16} 
              color="#5B6FF0" 
            />
            <Text style={styles.typeBadgeText}>
              {typeLieuLabel.toUpperCase()}
            </Text>
          </View>

          <Text style={styles.nomLieu}>{lieu.nom_lieu}</Text>

          <View style={styles.scoreSection}>
            <View style={styles.scoreCard}>
              <View style={styles.scoreCircleContainer}>
                <View 
                  style={[
                    styles.scoreCircle, 
                    { borderColor: getNiveauCalmeColor(lieu.score_calme) }
                  ]}
                >
                  <Text style={[
                    styles.scoreValue,
                    { color: getNiveauCalmeColor(lieu.score_calme) }
                  ]}>
                    {Math.round(lieu.score_calme)}
                  </Text>
                  <Text style={styles.scoreMax}>/100</Text>
                </View>
              </View>
              <View style={styles.scoreInfo}>
                <Text style={styles.scoreLabel}>Score de calme</Text>
                <Text 
                  style={[
                    styles.scoreLevel,
                    { color: getNiveauCalmeColor(lieu.score_calme) }
                  ]}
                >
                  {getNiveauCalmeLabel(lieu.score_calme)}
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="location" size={22} color="#5B6FF0" />
              <Text style={styles.sectionTitle}>Localisation</Text>
            </View>
            <Text style={styles.address}>{lieu.adresse_lieu}</Text>
            <TouchableOpacity 
              style={styles.mapButton} 
              onPress={openMap}
              activeOpacity={0.7}
            >
              <Ionicons name="navigate" size={18} color="#5B6FF0" />
              <Text style={styles.mapButtonText}>Voir sur la carte</Text>
            </TouchableOpacity>
          </View>

          {lieu.description_lieu && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="information-circle" size={22} color="#5B6FF0" />
                <Text style={styles.sectionTitle}>Description</Text>
              </View>
              <Text style={styles.description}>{lieu.description_lieu}</Text>
            </View>
          )}

          {lieu.latitude && lieu.longitude && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Ionicons name="map" size={22} color="#5B6FF0" />
                <Text style={styles.sectionTitle}>Coordonnées GPS</Text>
              </View>
              <View style={styles.coordinatesContainer}>
                <View style={styles.coordinateItem}>
                  <Text style={styles.coordinateLabel}>Latitude</Text>
                  <Text style={styles.coordinateValue}>
                    {lieu.latitude.toFixed(6)}
                  </Text>
                </View>
                <View style={styles.coordinateDivider} />
                <View style={styles.coordinateItem}>
                  <Text style={styles.coordinateLabel}>Longitude</Text>
                  <Text style={styles.coordinateValue}>
                    {lieu.longitude.toFixed(6)}
                  </Text>
                </View>
              </View>
            </View>
          )}

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="stats-chart" size={22} color="#5B6FF0" />
              <Text style={styles.sectionTitle}>Statistiques</Text>
            </View>
            <View style={styles.statsGrid}>
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="star" size={24} color="#FFC107" />
                </View>
                <Text style={styles.statValue}>
                  {lieu.note_moyenne !== null ? lieu.note_moyenne.toFixed(1) : '—'}
                </Text>
                <Text style={styles.statLabel}>Note moyenne</Text>
              </View>
              <View style={styles.statCard}>
                <View style={styles.statIconContainer}>
                  <Ionicons name="heart" size={24} color="#FF4444" />
                </View>
                <Text style={styles.statValue}>
                  {lieu.favoris?.length || 0}
                </Text>
                <Text style={styles.statLabel}>Favoris</Text>
              </View>
            </View>
          </View>

          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <Ionicons name="information" size={22} color="#5B6FF0" />
              <Text style={styles.sectionTitle}>Informations</Text>
            </View>
            <View style={styles.infoList}>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Type de lieu</Text>
                <Text style={styles.infoValue}>
                  {typeLieuLabel}
                </Text>
              </View>
              {lieu.typeLieu?.baseScore && (
                <>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Score de base</Text>
                    <Text style={styles.infoValue}>
                      {lieu.typeLieu.baseScore}/100
                    </Text>
                  </View>
                </>
              )}
              {lieu.created_at && (
                <>
                  <View style={styles.infoDivider} />
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Ajouté le</Text>
                    <Text style={styles.infoValue}>
                      {new Date(lieu.created_at).toLocaleDateString('fr-FR', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </Text>
                  </View>
                </>
              )}
            </View>
          </View>

          <View style={styles.bottomSpacer} />
        </View>
      </ScrollView>

      <View style={styles.floatingButtonContainer}>
        <TouchableOpacity 
          style={styles.floatingButton}
          activeOpacity={0.9}
          onPress={handleAddReview} 
        >
          <Ionicons name="star" size={22} color="#fff" />
          <Text style={styles.floatingButtonText}>Laisser une note</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}