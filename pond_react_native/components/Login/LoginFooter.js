import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LoginFooter = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      <TouchableOpacity 
        style={styles.forgotPassword} 
        onPress={() => navigation.navigate('RecuperarSenha')}
      >
        <Text style={styles.forgotPasswordText}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Não tem uma conta?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}>
          <Text style={styles.signupLink}> Cadastre-se</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#3498db',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#3498db',
    fontWeight: '500',
  },
});

export default LoginFooter;