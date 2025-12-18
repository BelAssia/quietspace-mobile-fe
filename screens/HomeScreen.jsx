import { View, Text } from "react-native";
import styles from "../styles/homestyles";

export default function HomeScreen() {
  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.title}>Home</Text>
        <Text style={styles.subtitle}>
          Welcome to your dashboard
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Your Space</Text>
        <Text style={styles.cardText}>
          Access your personal content and manage your activities easily.
        </Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Stay Focused</Text>
        <Text style={styles.cardText}>
          Organize your time and enjoy a calm and productive experience.
        </Text>
      </View>

    </View>
  );
}
