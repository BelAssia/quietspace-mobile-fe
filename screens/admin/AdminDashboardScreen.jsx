import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/admin/adminDashboardStyles';

export default function AdminDashboardScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Tableau de bord</Text>
        <Text style={styles.subtitle}>Vue d'ensemble</Text>
      </View>

      <View style={styles.statsGrid}>
        <View style={styles.statCard}>
          <Ionicons name="location" size={32} color="#5B6FF0" />
          <Text style={styles.statValue}>24</Text>
          <Text style={styles.statLabel}>Lieux</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="people" size={32} color="#10B981" />
          <Text style={styles.statValue}>156</Text>
          <Text style={styles.statLabel}>Utilisateurs</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="chatbubbles" size={32} color="#F59E0B" />
          <Text style={styles.statValue}>12</Text>
          <Text style={styles.statLabel}>Feedbacks</Text>
        </View>

        <View style={styles.statCard}>
          <Ionicons name="star" size={32} color="#EF4444" />
          <Text style={styles.statValue}>89</Text>
          <Text style={styles.statLabel}>Avis</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Actions rapides</Text>
        <TouchableOpacity style={styles.actionButton}>
          <Ionicons name="add-circle" size={24} color="#5B6FF0" />
          <Text style={styles.actionText}>Ajouter un lieu</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}