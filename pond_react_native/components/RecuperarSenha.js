import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  Image,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ip_address from '../backend/routes/ip_address'; // Importando o endereço IP do backend
// const ip_address = "10.150.0.133";

const RecuperarSenha = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1); // 1 = email, 2 = OTP, 3 = nova senha
  const [loading, setLoading] = useState(false);

  const handleEnviarOTP = async () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu email');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um email válido');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://${ip_address}:8000/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Código OTP enviado para seu email!');
        setStep(2);
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Falha ao enviar OTP');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível conectar ao servidor');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificarOTP = async () => {
    if (!otp.trim() || otp.length !== 6) {
      Alert.alert('Erro', 'Por favor, insira um código OTP válido (6 dígitos)');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://${ip_address}:8000/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Código verificado com sucesso!');
        setStep(3);
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Código OTP inválido');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível verificar o código');
    } finally {
      setLoading(false);
    }
  };

  const handleRedefinirSenha = async () => {
    if (!newPassword.trim() || newPassword.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://${ip_address}:8000/reset-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha: newPassword }),
      });

      if (response.ok) {
        Alert.alert('Sucesso', 'Senha redefinida com sucesso!', [
          { text: 'OK', onPress: () => navigation.navigate('Login') }
        ]);
      } else {
        const error = await response.json();
        Alert.alert('Erro', error.message || 'Falha ao redefinir senha');
      }
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível redefinir a senha');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        
        <Text style={styles.title}>Recuperar Senha</Text>

        {step === 1 && (
          <>
            <Text style={styles.subtitle}>Digite seu email para receber um código de verificação</Text>
            
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

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleEnviarOTP}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Enviando...' : 'Enviar Código'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.subtitle}>Enviamos um código de 6 dígitos para {email}</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Código OTP</Text>
              <TextInput
                style={styles.input}
                placeholder="123456"
                placeholderTextColor="#999"
                value={otp}
                onChangeText={setOtp}
                keyboardType="numeric"
                maxLength={6}
              />
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleVerificarOTP}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Verificando...' : 'Verificar Código'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.subtitle}>Crie uma nova senha para sua conta</Text>
            
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Nova Senha</Text>
              <TextInput
                style={styles.input}
                placeholder="••••••••"
                placeholderTextColor="#999"
                value={newPassword}
                onChangeText={setNewPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity 
              style={styles.button} 
              onPress={handleRedefinirSenha}
              disabled={loading}
            >
              <Text style={styles.buttonText}>
                {loading ? 'Processando...' : 'Redefinir Senha'}
              </Text>
            </TouchableOpacity>
          </>
        )}

        {step !== 1 && (
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setStep(step - 1)}
            disabled={loading}
          >
            <Text style={styles.secondaryButtonText}>Voltar</Text>
          </TouchableOpacity>
        )}

        {step === 1 && (
          <TouchableOpacity 
            style={styles.backLink} 
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backLinkText}>Voltar ao Login</Text>
          </TouchableOpacity>
        )}
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
    marginTop: 10,
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
  secondaryButton: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 15,
  },
  secondaryButtonText: {
    color: '#3498db',
    fontSize: 14,
    fontWeight: '500',
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