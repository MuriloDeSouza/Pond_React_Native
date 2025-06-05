import React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet } from 'react-native';

const ProductCard = ({ product, onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={onPress}
    >
      <Image 
        source={{ uri: product.thumbnail }} 
        style={styles.productImage} 
        defaultSource={require('../../assets/logo.png')}
      />
      <Text style={styles.productName}>{product.title}</Text>
      <Text style={styles.productPrice}>R$ {product.price.toFixed(2).replace('.',',')}</Text>
      <Text style={styles.productBrand}>{product.brand}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {product.description.length > 50 
          ? `${product.description.substring(0, 50)}...` 
          : product.description}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    maxWidth: '46%',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
    borderRadius: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
});

export default ProductCard;