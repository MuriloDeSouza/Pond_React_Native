import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const ProfileImage = ({ photoUri, onChangePhoto }) => {
  return (
    <TouchableOpacity onPress={onChangePhoto}>
      <Image 
        source={photoUri ? { uri: photoUri } : require('../../assets/perfil_icon.png')} 
        style={styles.profileImage} 
      />
      <Text style={styles.changePhotoText}>Alterar foto</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileImage;