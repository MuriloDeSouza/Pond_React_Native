import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

const Header = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercadinho do Murilove</Text>
      
      <TouchableOpacity onPress={() => navigation.navigate('Perfil')}>
      <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
            <Image source={require('../assets/ronaldinho.png')} style={{width: 50, height: 50, borderRadius: 100}}></Image>
        </View>
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
});

export default Header;