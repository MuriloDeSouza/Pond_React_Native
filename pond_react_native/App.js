import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import { ProfileImage } from './components/ProfileImage';
import Login from './components/Login'; // Importe o componente Login

export default function App() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar style="auto" />
      
      {/* Opção 1: Usar apenas o Login */}
      <Login onLogin={(credentials) => console.log('Credenciais:', credentials)} />
      
      {/* Opção 2: Usar junto com o ProfileImage (se necessário) */}
      {/* 
      <ProfileImage image={require('./assets/ronaldinho.png')} />
      <Login onLogin={(credentials) => console.log('Credenciais:', credentials)} />
      */}
    </SafeAreaView>
  );
}

// export default function App() {
//   return (
//     <SafeAreaView style={{flex:1.0}}>
//        {/* <ProfileImage image={require('./assets/ronaldinho.png')}></ProfileImage> caso queira mudar a imagem e atualizar mais rápido a umagem como variável */}
//        <ProfileImage></ProfileImage>  
//     </SafeAreaView>
//   );
// }
