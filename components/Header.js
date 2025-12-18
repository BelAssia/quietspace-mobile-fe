import { View, Text } from "react-native";
import styles from "../styles/headerstyles";

export default function Header(props){

   return( <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Bonjour : {props.title}</Text>
    </View>);
}