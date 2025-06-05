import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const ProfileInfo = ({ 
  isEditing, 
  name, 
  email, 
  tempName, 
  tempEmail, 
  onChangeName, 
  onChangeEmail 
}) => {
  return (
    <View style={styles.infoContainer}>
      <Text style={styles.label}>Nome:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={tempName}
          onChangeText={onChangeName}
          placeholder="Digite seu nome"
        />
      ) : (
        <Text style={styles.info}>{name}</Text>
      )}

      <Text style={styles.label}>Email:</Text>
      {isEditing ? (
        <TextInput
          style={styles.input}
          value={tempEmail}
          onChangeText={onChangeEmail}
          placeholder="Digite seu email"
          keyboardType="email-address"
        />
      ) : (
        <Text style={styles.info}>{email}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ProfileInfo;