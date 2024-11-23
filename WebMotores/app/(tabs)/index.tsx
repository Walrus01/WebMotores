import React, { useState, useEffect } from 'react';
import { StyleSheet, FlatList, Text, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';  // Importando o axios

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
  const [carros, setCarros] = useState<Carro[]>([]); // Tipando o estado como uma lista de carros

  // Função para buscar os dados da API
  const fetchCarros = async () => {
    try {
      const response = await axios.get('https://webimotores.onrender.com/carros');
      setCarros(response.data); // Atualiza o estado com os dados da API
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  // Buscar os dados assim que o componente for montado
  useEffect(() => {
    fetchCarros();
  }, []);

  // Função para renderizar cada item
  const renderItem = ({ item }: { item: Carro }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.foto_url }} style={styles.image} />
      <Text style={styles.cardTitle}>{item.marca} {item.modelo}</Text>
      <Text style={styles.cardDescription}>{item.ano} | {item.tipo_combustivel}</Text>
      <Text style={styles.cardPrice}>R$ {item.preco.toLocaleString('pt-BR')}</Text>
      <Text style={styles.cardLocation}>Quilometragem: {item.quilometragem} km</Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Ver parcelas</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Carros novos em São Paulo</Text>
        <Text style={styles.subHeaderText}>{carros.length} carros encontrados</Text>
      </View>

      {/* Filters */}
      <View style={styles.filters}>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>SÃO PAULO</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterText}>NOVOS</Text>
        </TouchableOpacity>
      </View>

      {/* Product List */}
      <FlatList
        data={carros}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        numColumns={2}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fundo escuro para um visual moderno
    paddingHorizontal: 15,
  },
  header: {
    marginTop: 20,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff', // Cor branca para contraste
  },
  subHeaderText: {
    fontSize: 14,
    color: '#bbb',
  },
  filters: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'space-between', // Alinha os botões de filtro de forma mais limpa
  },
  filterButton: {
    backgroundColor: '#e60000', // Cor vermelha vibrante
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 25,
  },
  filterText: {
    color: '#fff',
    fontSize: 14,
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#1f1f1f', // Cor de fundo mais escura para cada card
    borderRadius: 15,
    padding: 15,
    margin: 10,
    flex: 1,
    elevation: 5, // Adicionando sombra para um efeito de profundidade
  },
  image: {
    height: 150,
    borderRadius: 10,
    marginBottom: 12,
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
    color: '#e60000', // Usando o vermelho para destacar o preço
    marginVertical: 5,
  },
  cardLocation: {
    fontSize: 12,
    color: '#888',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e60000', // Cor do botão em vermelho
    borderRadius: 25,
    paddingVertical: 10,
    marginTop: 12,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
