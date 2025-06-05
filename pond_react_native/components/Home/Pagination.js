import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const Pagination = ({ currentPage, totalPages, totalProducts, onPrev, onNext }) => {
  return (
    <View style={styles.pagination}>
      <TouchableOpacity 
        style={[styles.pageButton, currentPage === 0 && styles.disabledButton]}
        onPress={onPrev}
        disabled={currentPage === 0}
      >
        <Ionicons name="chevron-back" size={24} color={currentPage === 0 ? '#ccc' : '#3498db'} />
      </TouchableOpacity>
      
      <Text style={styles.pageText}>
        Página {currentPage + 1} de {totalPages}
      </Text>
      
      <TouchableOpacity 
        style={[styles.pageButton, (currentPage + 1) >= totalPages && styles.disabledButton]}
        onPress={onNext}
        disabled={(currentPage + 1) >= totalPages}
      >
        <Ionicons name="chevron-forward" size={24} color={(currentPage + 1) >= totalPages ? '#ccc' : '#3498db'} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageText: {
    fontSize: 16,
    color: '#333',
  },
});

export default Pagination;