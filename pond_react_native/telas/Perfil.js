import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Componentes
import ProfileImage from '../components/Perfil/ProfileImage';
import ProfileInfo from '../components/Perfil/ProfileInfo';
import ProfileActions from '../components/Perfil/ProfileActions';

const Perfil = ({ navigation }) => {
  const [user, setUser] = useState({
    name: 'Murilo Prianti',
    email: 'mpri@gmail.com',
    photo: null,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({...user});

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('@userData');
        if (savedUser !== null) {
          const parsedUser = JSON.parse(savedUser);
          setUser(prev => ({
            ...prev,
            ...parsedUser,
          }));
          setTempUser(prev => ({
            ...prev,
            ...parsedUser,
          }));
        }
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
      }
    };

    loadUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUser = {
        ...tempUser, 
        photo: result.assets[0].uri
      };
      
      setTempUser(updatedUser);
      
      if (!isEditing) {
        // Se não estiver editando, salva imediatamente
        await saveUserData(updatedUser);
        setUser(updatedUser);
      }
    }
  };

  const saveUserData = async (userData) => {
    try {
      await AsyncStorage.setItem('@userData', JSON.stringify(userData));
    } catch (error) {
      console.error('Erro ao salvar dados:', error);
      throw error;
    }
  };

  const handleSave = async () => {
    if (!tempUser.name.trim() || !tempUser.email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(tempUser.email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    try {
      await saveUserData(tempUser);
      setUser(tempUser);
      setIsEditing(false);
      Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao salvar os dados');
    }
  };

  const handleEdit = () => {
    setTempUser(user);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      <ProfileImage 
        photoUri={tempUser.photo} 
        onChangePhoto={pickImage} 
      />

      <ProfileInfo
        isEditing={isEditing}
        name={user.name}
        email={user.email}
        tempName={tempUser.name}
        tempEmail={tempUser.email}
        onChangeName={(text) => setTempUser({...tempUser, name: text})}
        onChangeEmail={(text) => setTempUser({...tempUser, email: text})}
      />

      <ProfileActions
        isEditing={isEditing}
        onEdit={handleEdit}
        onSave={handleSave}
        onCancel={handleCancel}
        onBack={() => navigation.goBack()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default Perfil;