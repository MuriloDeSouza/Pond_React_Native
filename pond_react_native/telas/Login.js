import React, { useState } from 'react';
import { 
  View, 
  KeyboardAvoidingView,
  Platform,
  StyleSheet
} from 'react-native';
import LoginHeader from '../components/Login/LoginHeader';
import LoginInput from '../components/Login/LoginInput';
import LoginButton from '../components/Login/LoginButton';
import LoginFooter from '../components/Login/LoginFooter';

const Login = ({ navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.trim() || !password.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }
    
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    const DEFAULT_EMAIL = 'mu@g.com';
    const DEFAULT_PASSWORD = '123';

    if (email !== DEFAULT_EMAIL || password !== DEFAULT_PASSWORD) {
      setError('Email ou senha incorretos');
      return;
    }

    setError('');
    navigation.navigate('Home', { newLogin: true });
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <LoginHeader />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <LoginInput
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <LoginInput
          label="Senha"
          placeholder="••••••••"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <LoginFooter navigation={navigation} />

        <LoginButton 
          title="Entrar" 
          onPress={handleLogin} 
        />
      </View>
    </KeyboardAvoidingView>
  );
};

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
  errorText: {
    color: '#e74c3c',
    textAlign: 'center',
    marginBottom: 16,
  },
});

export default Login;