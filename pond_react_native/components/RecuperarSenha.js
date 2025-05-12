import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  Image
} from 'react-native';

const RecuperarSenha = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleRecuperarSenha = () => {
    // Validação simples
    if (!email.trim()) {
      setError('Por favor, insira seu email');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Email inválido');
      return;
    }

    setError('');
    setSuccess('Um link de recuperação foi enviado para seu email!');
    
    // Simulação: depois de 3 segundos, volta para o Login
    setTimeout(() => {
      navigation.goBack();
    }, 3000);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        {/* Logo (igual ao Login) */}
        <Image
          source={require('../assets/logo.png')} // Substitua pelo seu logo
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Recuperar Senha</Text>
        <Text style={styles.subtitle}>Digite seu email para receber o link de recuperação</Text>

        {/* Mensagens de erro/sucesso */}
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        {success ? <Text style={styles.successText}>{success}</Text> : null}

        {/* Campo Email */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="seu@email.com"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>

        {/* Botão Enviar */}
        <TouchableOpacity 
          style={styles.button} 
          onPress={handleRecuperarSenha}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Enviar Link</Text>
        </TouchableOpacity>

        {/* Link para voltar ao Login */}
        <TouchableOpacity 
          style={styles.backLink} 
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backLinkText}>Voltar ao Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

// Estilos (reutilizados do Login com pequenas adaptações)
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  innerContainer: {
    flex: 1,
    padding: 32,
    justifyContent: 'center',
  },
  logo: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#333',
    marginBottom: 8,
    fontWeight: '500',
  },
  input: {
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  button: {
    height: 50,
    backgroundColor: '#3498db',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
  successText: {
    color: '#2ecc71',
    textAlign: 'center',
    marginBottom: 16,
  },
  backLink: {
    alignSelf: 'center',
    marginTop: 20,
  },
  backLinkText: {
    color: '#3498db',
    fontWeight: '500',
  },
});

export default RecuperarSenha;