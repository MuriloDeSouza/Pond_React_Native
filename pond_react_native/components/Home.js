import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  Image, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  TouchableOpacity, 
  Alert, 
  ActivityIndicator,
  Modal,
  TextInput 
} from 'react-native';
import Header from './Header';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

const PAGE_SIZE = 10;

const Home = ({ navigation, route }) => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [totalProducts, setTotalProducts] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newProduct, setNewProduct] = useState({
    image: null,
    name: '',
    price: '',
    brand: 'Meus Produtos',
    description: 'Produto adicionado por mim'
  });

  // Busca produtos da API
  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const skip = page * PAGE_SIZE;
      const response = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
      const data = await response.json();
      
      setProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Efeitos para mensagem de boas-vindas
  useEffect(() => {
    if (route.params?.newLogin) {
      setShowWelcome(true);
      setTimeout(() => setShowWelcome(false), 5000);
    }
  }, [route.params]);

  useEffect(() => {
    if (showWelcome) {
      Alert.alert('Bem-vindo!', 'Você está dentro do app, olha os novos produtos e fique atento às promoções!');
    }
  }, [showWelcome]);

  // Carrega produtos
  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  // Funções de navegação
  const goToNextPage = () => {
    if ((currentPage + 1) * PAGE_SIZE < totalProducts) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Funções da câmera/galeria
  const abrirCamera = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permissão necessária', 'Permissão para acessar a câmera negada.');

    const resultado = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setNewProduct({
        ...newProduct,
        image: resultado.assets[0].uri
      });
      setIsModalVisible(true);
    }
  };

  const abrirGaleria = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') return Alert.alert('Permissão necessária', 'Permissão para acessar a galeria negada.');

    const resultado = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!resultado.canceled) {
      setNewProduct({
        ...newProduct,
        image: resultado.assets[0].uri
      });
      setIsModalVisible(true);
    }
  };

  // Adiciona novo produto
  const adicionarProduto = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const novoProduto = {
      id: Date.now().toString(), // ID único
      title: newProduct.name,
      price: parseFloat(newProduct.price),
      brand: newProduct.brand,
      description: newProduct.description,
      thumbnail: newProduct.image
    };

    setProducts([novoProduto, ...products]);
    setNewProduct({
      image: null,
      name: '',
      price: '',
      brand: 'Meus Produtos',
      description: 'Produto adicionado por mim'
    });
    setIsModalVisible(false);
    Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
  };

  // Renderiza cada produto
  const renderProduct = ({ item }) => (
    <TouchableOpacity 
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductDetail', { product: item })}
    >
      <Image 
        source={{ uri: item.thumbnail }} 
        style={styles.productImage} 
        defaultSource={require('../assets/logo.png')}
      />
      <Text style={styles.productName}>{item.title}</Text>
      <Text style={styles.productPrice}>R$ {item.price.toFixed(2)}</Text>
      <Text style={styles.productBrand}>{item.brand}</Text>
      <Text style={styles.itemDescription} numberOfLines={2}>
        {item.description.length > 50 
          ? `${item.description.substring(0, 50)}...` 
          : item.description}
      </Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header navigation={navigation} />
      
      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#3498db" />
        </View>
      ) : (
        <>
          <FlatList
            data={products}
            renderItem={renderProduct}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          
          <View style={styles.pagination}>
            <TouchableOpacity 
              style={[styles.pageButton, currentPage === 0 && styles.disabledButton]}
              onPress={goToPrevPage}
              disabled={currentPage === 0}
            >
              <Ionicons name="chevron-back" size={24} color={currentPage === 0 ? '#ccc' : '#3498db'} />
            </TouchableOpacity>
            
            <Text style={styles.pageText}>
              Página {currentPage + 1} de {Math.ceil(totalProducts / PAGE_SIZE)}
            </Text>
            
            <TouchableOpacity 
              style={[styles.pageButton, (currentPage + 1) * PAGE_SIZE >= totalProducts && styles.disabledButton]}
              onPress={goToNextPage}
              disabled={(currentPage + 1) * PAGE_SIZE >= totalProducts}
            >
              <Ionicons name="chevron-forward" size={24} color={(currentPage + 1) * PAGE_SIZE >= totalProducts ? '#ccc' : '#3498db'} />
            </TouchableOpacity>
          </View>
        </>
      )}
      
      <View style={styles.actionButtonsContainer}>
        <TouchableOpacity 
          style={[styles.actionButton, styles.galleryButton]}
          onPress={abrirGaleria}
        >
          <Ionicons name="images" size={24} color="white" />
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.actionButton, styles.cameraButton]}
          onPress={abrirCamera}
        >
          <Ionicons name="camera" size={30} color="white" />
        </TouchableOpacity>
      </View>

      {/* Modal para adicionar novo produto */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {newProduct.image && (
              <Image 
                source={{ uri: newProduct.image }} 
                style={styles.modalImage}
              />
            )}
            
            <TextInput
              style={styles.modalInput}
              placeholder="Nome do produto"
              value={newProduct.name}
              onChangeText={(text) => setNewProduct({...newProduct, name: text})}
            />
            
            <TextInput
              style={styles.modalInput}
              placeholder="Preço (ex: 19.99)"
              keyboardType="numeric"
              value={newProduct.price}
              onChangeText={(text) => setNewProduct({...newProduct, price: text})}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setIsModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.modalButton, styles.confirmButton]}
                onPress={adicionarProduto}
              >
                <Text style={styles.buttonText}>Adicionar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContent: {
    padding: 8,
    paddingBottom: 120, // Espaço para os botões
  },
  productCard: {
    flex: 1,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 12,
    alignItems: 'center',
    elevation: 2,
    maxWidth: '46%',
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginBottom: 8,
    borderRadius: 5,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 16,
    color: '#2ecc71',
    fontWeight: 'bold',
    marginBottom: 2,
  },
  productBrand: {
    fontSize: 12,
    color: '#666',
    fontStyle: 'italic',
  },
  imagePreviewContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  pageButton: {
    padding: 10,
    marginHorizontal: 10,
  },
  disabledButton: {
    opacity: 0.5,
  },
  pageText: {
    fontSize: 16,
    color: '#333',
  },
  actionButtonsContainer: {
    position: 'absolute',
    bottom: 70, // Ajustado para ficar acima da paginação
    right: 20,
    flexDirection: 'column',
    alignItems: 'center',
  },
  actionButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  cameraButton: {
    backgroundColor: '#3498db',
  },
  galleryButton: {
    backgroundColor: '#9b59b6',
  },
  itemDescription: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  // Novos estilos para o Modal
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: 15,
  },
  modalInput: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    color: 'black',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    flex: 1,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Home;