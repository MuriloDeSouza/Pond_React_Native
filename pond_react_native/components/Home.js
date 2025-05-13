import React from 'react';
import { View, FlatList, Image, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import Header from './Header';

const Home = ({ navigation }) => {
  // Dados simulados de produtos
  const products = [
    {
      id: '1',
      name: 'Arroz Integral',
      price: 'R$ 8,99',
      image: require('../assets/arroz.png'),
    },
    {
      id: '2',
      name: 'Feijão Carioca',
      price: 'R$ 7,50',
      image: require('../assets/feijao.png'),
    },
    {
      id: '3',
      name: 'Óleo de Soja',
      price: 'R$ 9,80',
      image: require('../assets/oleo.png'),
    },
    {
      id: '4',
      name: 'Açúcar Cristal',
      price: 'R$ 5,20',
      image: require('../assets/acucar.png'),
    },
    {
      id: '5',
      name: 'Café em Pó',
      price: 'R$ 12,90',
      image: require('../assets/cafe.png'),
    },
    {
      id: '6',
      name: 'Leite Integral',
      price: 'R$ 4,75',
      image: require('../assets/leite.png'),
    },
  ];

  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  listContent: {
    padding: 8,
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    maxWidth: '46%', // Para garantir 2 colunas com espaçamento
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
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
  },
});

export default Home;