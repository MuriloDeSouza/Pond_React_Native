import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importações das telas
import Login from './telas/Login';
import Cadastro from './telas/Cadastro';
// import RecuperarSenha from './telas/RecuperarSenha';
import Home from './telas/Home';
// import Perfil from './telas/Perfil';
// import ProductDetail from './telas/ProductDetail';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <StatusBar style="auto" />
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right', // Animação suave entre telas
          }}
        >
          {/* Telas de autenticação */}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Cadastro" component={Cadastro} />
          {/* <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} /> */}

          {/* Telas principais do app */}
          <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{ 
              gestureEnabled: false // Impede voltar para o Login com gesto
            }}
          />
          
          {/* <Stack.Screen name="Perfil" component={Perfil} />
          
          <Stack.Screen 
            name="ProductDetail" 
            component={ProductDetail}
            options={{ 
              title: 'Detalhes do Produto',
              headerShown: true, // Mostra header apenas nesta tela
              headerBackTitle: 'Voltar' // Texto do botão de voltar (iOS)
            }}
          /> */}
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});


// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import Login from './components/Login';
// import Cadastro from './components/Cadastro';
// import RecuperarSenha from './components/RecuperarSenha';
// import Home from './components/Home';
// import Perfil from './components/Perfil';
// import ProductDetail from './components/ProductDetail';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator
//         initialRouteName="Login"
//         screenOptions={{
//           headerShown: false
//         }}
//       >
//         <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Cadastro" component={Cadastro} />
//         <Stack.Screen name="RecuperarSenha" component={RecuperarSenha} />
//         <Stack.Screen name="Home" component={Home} options={{ 
//           headerShown: false,
//           gestureEnabled: false // Impede voltar para o Login com gesto
//           }}
//         />
//         <Stack.Screen name="Perfil" component={Perfil} />
//         <Stack.Screen 
//           name="ProductDetail" 
//           component={ProductDetail}
//           options={{ title: 'Detalhes do Produto' }}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
// });