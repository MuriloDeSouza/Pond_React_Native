import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ProfileActions = ({ 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onBack 
}) => {
  return (
    <View style={styles.buttonsContainer}>
      {isEditing ? (
        <>
          <TouchableOpacity 
            style={[styles.button, styles.saveButton]}
            onPress={onSave}
          >
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.cancelButton]}
            onPress={onCancel}
          >
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity 
            style={[styles.button, styles.editButton]}
            onPress={onEdit}
          >
            <Ionicons name="pencil" size={20} color="white" />
            <Text style={styles.buttonText}> Editar Perfil</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.button, styles.backButton]}
            onPress={onBack}
          >
            <Text style={styles.buttonText}>Voltar</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
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

export default ProfileActions;