import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './components/Login';
import Cadastro from './components/Cadastro';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator 
        initialRouteName="Login"
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Cadastro" component={Cadastro} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

// export default function App() {
//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <StatusBar style="auto" />
      
//       {/* Opção 1: Usar apenas o Login */}
//       <Login onLogin={(credentials) => console.log('Credenciais:', credentials)} />
      
//       {/* Opção 2: Usar junto com o ProfileImage (se necessário) */}
//       {/* 
//       <ProfileImage image={require('./assets/ronaldinho.png')} />
//       <Login onLogin={(credentials) => console.log('Credenciais:', credentials)} />
//       */}
//     </SafeAreaView>
//   );
// }

// export default function App() {
//   return (
//     <SafeAreaView style={{flex:1.0}}>
//        {/* <ProfileImage image={require('./assets/ronaldinho.png')}></ProfileImage> caso queira mudar a imagem e atualizar mais rápido a umagem como variável */}
//        <ProfileImage></ProfileImage>  
//     </SafeAreaView>
//   );
// }
