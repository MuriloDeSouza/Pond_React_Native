import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercado App</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
        <Image
          source={require('../assets/perfil_icon.png')} // Substitua pelo seu ícone
          style={styles.profileIcon}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#2ecc71',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  profileIcon: {
    width: 32,
    height: 32,
    tintColor: 'white',
  },
});

export default Header;