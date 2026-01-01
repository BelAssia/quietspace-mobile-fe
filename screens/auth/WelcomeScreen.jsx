import { View, Text, TouchableOpacity, Image } from "react-native";
import styles from "../../styles/auth/welcomeStyles2";

export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Image
          source={require("../../assets/quitSpace_logo.png")}
          style={styles.logoImage}
          resizeMode="contain"
        />
        <Text style={styles.subtitle}>
          Trouvez votre espace de concentration idéal
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text style={styles.primaryButtonText}>Se connecter</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={() => navigation.navigate("SignUp")}
        >
          <Text style={styles.secondaryButtonText}>Créer un compte</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
