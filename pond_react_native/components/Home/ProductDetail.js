import React from 'react';
import { View, ScrollView, Image, Text, StyleSheet } from 'react-native';

const ProductDetail = ({ route }) => {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Image 
        source={{ uri: product.thumbnail }} 
        style={styles.productImage}
        resizeMode="contain"
      />
      
      <View style={styles.detailsContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>R$ {product.price.toFixed(2)}</Text>
        <Text style={styles.brand}>Marca: {product.brand}</Text>
        
        <Text style={styles.sectionTitle}>Descrição:</Text>
        <Text style={styles.description}>{product.description}</Text>
        
        <Text style={styles.sectionTitle}>Detalhes:</Text>
        <Text style={styles.detail}>Categoria: {product.category}</Text>
        <Text style={styles.detail}>Avaliação: {product.rating}/5</Text>
        <Text style={styles.detail}>Estoque: {product.stock} unidades</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    padding: 16,
  },
  productImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 16,
  },
  detailsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: 8,
  },
  brand: {
    fontSize: 16,
    color: '#666',
    marginBottom: 16,
    fontStyle: 'italic',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 16,
    color: '#444',
    lineHeight: 24,
    marginBottom: 16,
  },
  detail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 4,
  },
});

export default ProductDetail;