import { View, Text, Image, TouchableOpacity } from "react-native";
import styles from "../styles/homestyles";

export default function HomeScreen(props) {
  return (
    <View style={styles.container}>
      <View style={styles.imageCard}>
        <Image
          source={require("../assets/quitSpace_logo.png")}
          style={styles.image}
        />
      </View>
      <Text style={styles.subtitle}> Find your perfect concentration spot</Text>
      <TouchableOpacity style={styles.button} onPress={()=> props.navigation.navigate("Auth") }>
        <Text style={styles.buttonText}> Start</Text>
      </TouchableOpacity>
    </View>
  );
}
