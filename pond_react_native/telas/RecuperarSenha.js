import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ip_address from '../backend/routes/ip_address';
import Logo from '../components/RecuperarSenha/Logo';
import InputField from '../components/RecuperarSenha/InputField';
import Button from '../components/RecuperarSenha/Button';

const RecuperarSenha = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // ... (manter as funções handleEnviarOTP, handleVerificarOTP, handleRedefinirSenha)

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.innerContainer}>
        <Logo />
        
        <Text style={styles.title}>Recuperar Senha</Text>

        {step === 1 && (
          <>
            <Text style={styles.subtitle}>Digite seu email para receber um código de verificação</Text>
            
            <InputField
              label="Email"
              placeholder="seu@email.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <Button 
              title={loading ? 'Enviando...' : 'Enviar Código'}
              onPress={handleEnviarOTP}
              disabled={loading}
            />
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.subtitle}>Enviamos um código de 6 dígitos para {email}</Text>
            
            <InputField
              label="Código OTP"
              placeholder="123456"
              value={otp}
              onChangeText={setOtp}
              keyboardType="numeric"
              maxLength={6}
            />

            <Button 
              title={loading ? 'Verificando...' : 'Verificar Código'}
              onPress={handleVerificarOTP}
              disabled={loading}
            />
          </>
        )}

        {step === 3 && (
          <>
            <Text style={styles.subtitle}>Crie uma nova senha para sua conta</Text>
            
            <InputField
              label="Nova Senha"
              placeholder="••••••••"
              value={newPassword}
              onChangeText={setNewPassword}
              secureTextEntry
            />

            <Button 
              title={loading ? 'Processando...' : 'Redefinir Senha'}
              onPress={handleRedefinirSenha}
              disabled={loading}
            />
          </>
        )}

        {step !== 1 && (
          <Button 
            title="Voltar"
            onPress={() => setStep(step - 1)}
            disabled={loading}
            style={styles.secondaryButton}
            textStyle={styles.secondaryButtonText}
          />
        )}

        {step === 1 && (
          <Button 
            title="Voltar ao Login"
            onPress={() => navigation.goBack()}
            style={styles.backLink}
            textStyle={styles.backLinkText}
          />
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
  secondaryButton: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
  },
  secondaryButtonText: {
    color: '#3498db',
  },
  backLink: {
    backgroundColor: 'transparent',
    shadowColor: 'transparent',
    elevation: 0,
    alignSelf: 'center',
    marginTop: 20,
  },
  backLinkText: {
    color: '#3498db',
    fontWeight: '500',
  },
});

export default RecuperarSenha;