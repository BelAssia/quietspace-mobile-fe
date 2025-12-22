import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert,Modal,FlatList } from 'react-native';
import { useState } from 'react';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../styles/auth/authStyles2';
import villes from '../../assets/json/Villes.json';

export default function SignUpScreen({ navigation, setIsLoggedIn, setUserRole }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
   const [ville, setVille] = useState('');
const [showVilles, setShowVilles] = useState(false);
  const handleSignUp = async () => {
    if (!username || !email || !password) {
      Alert.alert('Erreur', 'Veuillez remplir tous les champs');
      return;
    }

    setLoading(true);
    try {
      // Simuler un appel API
      // const response = await signupAPI.post('/signup', { username, email, password });
      
      setUserRole('USER');
      setIsLoggedIn(true);
    } catch (error) {
      Alert.alert('Erreur', "Erreur lors de l'inscription");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="arrow-back" size={24} color="#120217" />
      </TouchableOpacity>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>Créer un compte</Text>
        <Text style={styles.subtitle}>
          Rejoignez QuietSpace et trouvez votre lieu idéal
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nom complet"
          placeholderTextColor="#999"
          autoCapitalize="words"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#999"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#999"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />


      <TouchableOpacity onPress={() => setShowVilles(true)}>
  <View style={styles.input}>
    <Text style={{ color: ville ? '#120217' : '#999' }}>
      {ville || 'Sélectionnez votre ville'}
    </Text>
  </View>
</TouchableOpacity>


        <TouchableOpacity
          style={styles.button}
          onPress={handleSignUp}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Inscription...' : "S'inscrire"}
          </Text>
        </TouchableOpacity>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Déjà un compte ? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.linkText}>Se connecter</Text>
          </TouchableOpacity>
        </View>





{showVilles && (
  <Modal
    visible={showVilles}
    transparent={true}
    animationType="slide"
    onRequestClose={() => setShowVilles(false)}
  >
    <View style={{
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)'
    }}>
      <View style={{
        backgroundColor: '#fff',
        marginHorizontal: 40,
        borderRadius: 12,
        maxHeight: '60%'
      }}>
        <FlatList
          data={villes}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{ padding: 16, borderBottomWidth: 1, borderBottomColor: '#eee' }}
              onPress={() => {
                setVille(item.ville);
                setShowVilles(false);
              }}
            >
              <Text>{item.ville}</Text>
            </TouchableOpacity>
          )}
        />
        <TouchableOpacity
          style={{ padding: 16, alignItems: 'center' }}
          onPress={() => setShowVilles(false)}
        >
          <Text style={{ color: 'red', fontWeight: 'bold' }}>Annuler</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
)}

      </ScrollView>
    </View>
  );
}