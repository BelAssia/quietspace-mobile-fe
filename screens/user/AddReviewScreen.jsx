import { 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/user/Addreviewstyles';
import { useReview } from "../../hooks/useReview";

export default function AddReviewScreen({route, navigation }) {
   const {lieuNom,note,setNote,hoveredStar,setHoveredStar,loading, setLoading,
    checking,isUpdate,handleSubmit,
 } = useReview(route,navigation);
    const renderStar = (index) => {
    const isFilled = index <= (hoveredStar || note);
    return (
      <TouchableOpacity
        key={index}
        onPress={() => setNote(index)}
        onPressIn={() => setHoveredStar(index)}
        onPressOut={() => setHoveredStar(0)}
        style={styles.starButton}
      >
        <Ionicons
          name={isFilled ? 'star' : 'star-outline'}
          size={60}
          color={isFilled ? '#FFC107' : '#BDBDBD'}
        />
      </TouchableOpacity>
    );
  };

  if (checking) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#5B6FF0" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {isUpdate ? 'Modifier votre note' : 'Laisser une note'}
        </Text>
        <View />
      </View>

      <View style={styles.content}>
        <View style={styles.lieuInfo}>
          <Ionicons name="location" size={24} />
          <Text style={styles.lieuNom}>{lieuNom}</Text>
        </View>

        <View style={styles.starsContainer}>
          {[1, 2, 3, 4, 5].map(renderStar)}
        </View>

        {note > 0 && (
          <View style={styles.selectedNoteContainer}>
            <Text style={styles.selectedNoteValue}>{note}/5</Text>
          </View>
        )}

        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
          disabled={loading || note === 0}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>
              {isUpdate ? 'Mettre à jour' : 'Valider'}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}