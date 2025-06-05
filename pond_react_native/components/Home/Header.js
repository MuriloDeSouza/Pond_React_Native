import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Header = ({ navigation }) => {
  const [profilePhoto, setProfilePhoto] = useState(require('../../assets/perfil_icon.png'));

  // Carrega a foto do perfil salva
  useEffect(() => {
    const loadProfilePhoto = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('@userData');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          if (userData.photo) {
            setProfilePhoto({ uri: userData.photo });
          }
        }
      } catch (error) {
        console.error('Erro ao carregar foto do perfil:', error);
      }
    };

    // Carrega quando o componente monta
    loadProfilePhoto();

    // Atualiza quando volta para o Header (quando o foco volta para a tela)
    const unsubscribe = navigation.addListener('focus', () => {
      loadProfilePhoto();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercadinho do Murilove</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <View style={styles.profileContainer}>
          <Image 
            source={profilePhoto} 
            style={styles.profileImage}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2ecc71',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileContainer: {
    flex: 0.5,
    justifyContent: 'center', 
    alignItems: 'center'
  },
  profileImage: {
    width: 60, 
    height: 40, 
    borderRadius: 20,
    borderWidth: 2,
    borderColor: 'white'
  }
});

export default Header;