import React, { useState, useEffect } from 'react';
import { 
  View, 
  FlatList, 
  SafeAreaView, 
  ActivityIndicator,
  Alert,
  StyleSheet 
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';

// Componentes
import Header from '../components/Home/Header';
import ProductCard from '../components/Home/ProductCard';
import Pagination from '../components/Home/Pagination';
import AddProductButton from '../components/Home/AddProductButton';
import AddProductModal from '../components/Home/AddProductModal';
import ProductDetail from '../components/Home/ProductDetail';
import ProfileImage  from '../components/Home/ProfileImage';

const PAGE_SIZE = 10;

const Home = ({ navigation, route }) => {
  const [apiProducts, setApiProducts] = useState([]);
  const [localProducts, setLocalProducts] = useState([]);
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

  const combinedProducts = currentPage === 0 
    ? [...localProducts, ...apiProducts] 
    : apiProducts;

  const totalPages = Math.ceil(totalProducts / PAGE_SIZE);

  const fetchProducts = async (page) => {
    setLoading(true);
    try {
      const skip = page * PAGE_SIZE;
      const response = await fetch(`https://dummyjson.com/products?limit=${PAGE_SIZE}&skip=${skip}`);
      const data = await response.json();
      
      setApiProducts(data.products);
      setTotalProducts(data.total);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

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

  const adicionarProduto = () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return Alert.alert('Erro', 'Preencha todos os campos');
    }

    const novoProduto = {
      id: Date.now().toString(),
      title: newProduct.name,
      price: parseFloat(newProduct.price),
      brand: newProduct.brand,
      description: newProduct.description,
      thumbnail: newProduct.image
    };

    setLocalProducts([novoProduto, ...localProducts]);
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
            data={combinedProducts}
            renderItem={({ item }) => (
              <ProductCard 
                product={item} 
                onPress={() => navigation.navigate('ProductDetail', { product: item })}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
          
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalProducts={totalProducts}
            onPrev={goToPrevPage}
            onNext={goToNextPage}
          />
        </>
      )}
      
      <AddProductButton 
        onPressCamera={abrirCamera}
        onPressGallery={abrirGaleria}
      />

      <AddProductModal
        visible={isModalVisible}
        product={newProduct}
        onCancel={() => setIsModalVisible(false)}
        onConfirm={adicionarProduto}
        onChangeName={(text) => setNewProduct({...newProduct, name: text})}
        onChangePrice={(text) => setNewProduct({...newProduct, price: text.replace(',', '.')})}
      />
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
    paddingBottom: 120,
  },
});

export default Home;