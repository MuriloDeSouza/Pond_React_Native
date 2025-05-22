import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const Perfil = ({ navigation }) => {
  // Dados do usuário e estado de edição
  const [user, setUser] = useState({
    name: 'Murilo Prianti',
    email: 'mpri@gmail.com',
    photo: require('../assets/ronaldinho.png'),
  });
  const [isEditing, setIsEditing] = useState(false);
  const [tempUser, setTempUser] = useState({...user});

  // Função para selecionar nova foto
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      const updatedUser = {...user, photo: { uri: result.assets[0].uri }};
      setUser(updatedUser);
      setTempUser(updatedUser);
    }
  };

  // Função para salvar as alterações
  const handleSave = () => {
    // Validações básicas
    if (!tempUser.name.trim() || !tempUser.email.trim()) {
      Alert.alert('Erro', 'Nome e email são obrigatórios');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(tempUser.email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    setUser(tempUser);
    setIsEditing(false);
    Alert.alert('Sucesso', 'Dados atualizados com sucesso!');
  };

  // Função para cancelar edição
  const handleCancel = () => {
    setTempUser(user);
    setIsEditing(false);
  };

  return (
    <View style={styles.container}>
      {/* Foto do perfil */}
      <TouchableOpacity onPress={pickImage}>
        <Image 
          source={typeof tempUser.photo === 'object' ? tempUser.photo : { uri: tempUser.photo }} 
          style={styles.profileImage} 
        />
        <Text style={styles.changePhotoText}>Alterar foto</Text>
      </TouchableOpacity>

      {/* Dados do usuário */}
      <View style={styles.infoContainer}>
        <Text style={styles.label}>Nome:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={tempUser.name}
            onChangeText={(text) => setTempUser({...tempUser, name: text})}
            placeholder="Digite seu nome"
          />
        ) : (
          <Text style={styles.info}>{user.name}</Text>
        )}

        <Text style={styles.label}>Email:</Text>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={tempUser.email}
            onChangeText={(text) => setTempUser({...tempUser, email: text})}
            placeholder="Digite seu email"
            keyboardType="email-address"
          />
        ) : (
          <Text style={styles.info}>{user.email}</Text>
        )}
      </View>

      {/* Botões */}
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.saveButton]}
              onPress={handleSave}
            >
              <Text style={styles.buttonText}>Salvar</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.cancelButton]}
              onPress={handleCancel}
            >
              <Text style={styles.buttonText}>Cancelar</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity 
              style={[styles.button, styles.editButton]}
              onPress={() => setIsEditing(true)}
            >
              <Ionicons name="pencil" size={20} color="white" />
              <Text style={styles.buttonText}> Editar Perfil</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.button, styles.backButton]}
              onPress={() => navigation.goBack()}
            >
              <Text style={styles.buttonText}>Voltar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
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
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 30,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#3498db',
  },
  changePhotoText: {
    color: '#3498db',
    textAlign: 'center',
    marginBottom: 30,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 18,
    marginBottom: 20,
    color: '#333',
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#3498db',
  },
  saveButton: {
    backgroundColor: '#2ecc71',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  backButton: {
    backgroundColor: '#95a5a6',
  },
});

export default Perfil;