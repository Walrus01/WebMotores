import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity, Dimensions, Alert, Modal, Platform } from 'react-native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Feather';

// Definindo o tipo para o carro
interface Carro {
  _id: string;
  marca: string;
  modelo: string;
  ano: number;
  cor: string;
  tipo_combustivel: string;
  quilometragem: number;
  foto_url: string;
  preco: number;
}

export default function TabOneScreen() {
  // Estado para armazenar os dados da API
  const [carros, setCarros] = useState<Carro[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [carroIdToRemove, setCarroIdToRemove] = useState<string | null>(null);

  // Função para buscar os dados da API
  const fetchCarros = async () => {
    try {
      const response = await axios.get('https://webimotores.onrender.com/carros');
      setCarros(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Função para remover um carro
  const removeCarro = async (id: string) => {
    if (Platform.OS === 'web') {
      setShowModal(true);
      setCarroIdToRemove(id);
    } else {
      Alert.alert(
        'Remover Carro',
        'Tem certeza de que deseja remover este carro?',
        [
          { text: 'Cancelar', style: 'cancel' },
          {
            text: 'Confirmar', onPress: async () => {
              await axios.delete(`https://webimotores.onrender.com/carros/${id}`);
              setCarros(prevCarros => prevCarros.filter(carro => carro._id !== id));
            }
          }
        ]
      );
    }
  };

  const handleConfirm = async () => {
    if (carroIdToRemove) {
      await axios.delete(`https://webimotores.onrender.com/carros/${carroIdToRemove}`);
      setCarros(prevCarros => prevCarros.filter(carro => carro._id !== carroIdToRemove));
      setShowModal(false);
    }
  };

  // Buscar os dados assim que o componente for montado
  useEffect(() => {
    fetchCarros();
  }, []);

  // Detecta a largura da tela para ajustar o número de colunas
  const { width } = Dimensions.get('window');
  const numColumns = width > 1024 ? 3 : width > 600 ? 2 : 1;

  // Função para renderizar cada item
  const renderItem = ({ item }: { item: Carro }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.foto_url }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.marca} {item.modelo}</Text>
      <Text style={styles.cardDescription}>{item.ano} | {item.tipo_combustivel}</Text>
      <Text style={styles.cardPrice}>R$ {item.preco.toLocaleString('pt-BR')}</Text>
      <Text style={styles.cardLocation}>Quilometragem: {item.quilometragem} km</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Comprar</Text>
      </TouchableOpacity>
      {/* Ícone de lixeira para remover o carro */}
      <TouchableOpacity onPress={() => removeCarro(item._id)} style={styles.trashButton}>
        <Icon name="trash" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>WebMotores</Text>
        <Text style={styles.subHeaderText}>{carros.length} carros encontrados</Text>
      </View>

      {/* Product List */}
      <FlatList
        data={carros}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={numColumns}
        contentContainerStyle={styles.list}
      />

      {/* Modal para confirmação de remoção na web */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>Tem certeza de que deseja remover este carro?</Text>
            <View style={styles.modalActions}>
              <TouchableOpacity onPress={() => setShowModal(false)} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleConfirm} style={styles.modalButton}>
                <Text style={styles.modalButtonText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  subHeaderText: {
    fontSize: 14,
    color: '#bbb',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1f1f1f',
    borderRadius: 15,
    padding: 15,
    margin: 10,
    flex: 1,
    elevation: 5,
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
    width: '100%',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ccc',
    marginBottom: 5,
  },
  cardPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e60000',
    marginVertical: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e60000',
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  trashButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e60000',
    borderRadius: 50,
    padding: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  modalText: {
    fontSize: 16,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    backgroundColor: '#e60000',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
  },
  modalButtonText: {
    color: '#fff',
    textAlign: 'center',
  },
});
