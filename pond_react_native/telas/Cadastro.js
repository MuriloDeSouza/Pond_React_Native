import React, { useState } from 'react';
import { 
  View, 
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text
} from 'react-native';
import AuthHeader from '../components/Cadastro/AuthHeader';
import AuthInput from '../components/Cadastro/AuthInput';
import AuthButton from '../components/Cadastro/AuthButton';
import AuthFooter from '../components/Cadastro/AuthFooter';

const Cadastro = ({ navigation, onCadastro }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [error, setError] = useState('');

  const handleCadastro = () => {
    // Validações
    if (!nome.trim() || !email.trim() || !senha.trim() || !confirmarSenha.trim()) {
      setError('Por favor, preencha todos os campos');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Por favor, insira um email válido');
      return;
    }

    if (senha !== confirmarSenha) {
      setError('As senhas não coincidem');
      return;
    }

    setError('');
    if (onCadastro) {
      onCadastro({ nome, email, senha });
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <AuthHeader 
          title="Crie sua conta" 
          subtitle="Preencha os dados para se cadastrar" 
        />
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <AuthInput
          label="Nome Completo"
          placeholder="Seu nome"
          value={nome}
          onChangeText={setNome}
          autoCapitalize="words"
        />

        <AuthInput
          label="Email"
          placeholder="seu@email.com"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />

        <AuthInput
          label="Senha"
          placeholder="••••••••"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
        />

        <AuthInput
          label="Confirmar Senha"
          placeholder="••••••••"
          value={confirmarSenha}
          onChangeText={setConfirmarSenha}
          secureTextEntry
        />

        <AuthButton 
          title="Cadastrar" 
          onPress={handleCadastro} 
        />

        <AuthFooter
          mainText="Já tem uma conta?"
          linkText="Faça login"
          onLinkPress={() => navigation.navigate('Login')}
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

export default Cadastro;