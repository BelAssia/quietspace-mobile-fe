// ==================== screens/admin/FeedbackScreen.jsx ====================
import { View, Text, ScrollView } from 'react-native';
import styles from '../../styles/admin/adminFeedbackStyles';

export default function FeedbackScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Feedbacks</Text>
        <Text style={styles.subtitle}>12 nouveaux messages</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.feedbackCard}>
          <Text style={styles.feedbackUser}>John Doe</Text>
          <Text style={styles.feedbackText}>
            Super application ! Très utile pour trouver des lieux calmes.
          </Text>
          <Text style={styles.feedbackDate}>Il y a 2 heures</Text>
        </View>
      </ScrollView>
    </View>
  );
}