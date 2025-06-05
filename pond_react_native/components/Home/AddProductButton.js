import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const AddProductButton = ({ onPressCamera, onPressGallery }) => {
  return (
    <View style={styles.actionButtonsContainer}>
      <TouchableOpacity 
        style={[styles.actionButton, styles.galleryButton]}
        onPress={onPressGallery}
      >
        <Ionicons name="images" size={24} color="white" />
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.actionButton, styles.cameraButton]}
        onPress={onPressCamera}
      >
        <Ionicons name="camera" size={30} color="white" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 70,
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cameraButton: {
    backgroundColor: '#3498db',
  },
  galleryButton: {
    backgroundColor: '#9b59b6',
  },
});

export default AddProductButton;