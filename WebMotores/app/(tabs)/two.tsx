import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import axios from 'axios';

export default function TabTwoScreen() {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');
  const [ano, setAno] = useState('');
  const [cor, setCor] = useState('');
  const [tipoCombustivel, setTipoCombustivel] = useState('');
  const [quilometragem, setQuilometragem] = useState('');
  const [fotoUrl, setFotoUrl] = useState('');
  const [preco, setPreco] = useState('');

  const handleCadastro = async () => {
    if (!marca || !modelo || !ano || !cor || !tipoCombustivel || !quilometragem || !fotoUrl || !preco) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const novoCarro = {
      marca,
      modelo,
      ano: parseInt(ano),
      cor,
      tipo_combustivel: tipoCombustivel,
      quilometragem: parseInt(quilometragem),
      foto_url: fotoUrl,
      preco: parseFloat(preco),
    };

    try {
      await axios.post('https://webimotores.onrender.com/carros', novoCarro);
      Alert.alert('Sucesso', 'Carro cadastrado com sucesso!');
      setMarca('');
      setModelo('');
      setAno('');
      setCor('');
      setTipoCombustivel('');
      setQuilometragem('');
      setFotoUrl('');
      setPreco('');
    } catch (error) {
      console.error('Erro ao cadastrar o carro:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao cadastrar o carro.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Cadastro de Carro</Text>

        <TextInput
          style={styles.input}
          placeholder="Marca"
          placeholderTextColor="#aaa"
          value={marca}
          onChangeText={setMarca}
        />
        <TextInput
          style={styles.input}
          placeholder="Modelo"
          placeholderTextColor="#aaa"
          value={modelo}
          onChangeText={setModelo}
        />
        <TextInput
          style={styles.input}
          placeholder="Ano"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={ano}
          onChangeText={setAno}
        />
        <TextInput
          style={styles.input}
          placeholder="Cor"
          placeholderTextColor="#aaa"
          value={cor}
          onChangeText={setCor}
        />
        <TextInput
          style={styles.input}
          placeholder="Tipo de Combustível"
          placeholderTextColor="#aaa"
          value={tipoCombustivel}
          onChangeText={setTipoCombustivel}
        />
        <TextInput
          style={styles.input}
          placeholder="Quilometragem"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={quilometragem}
          onChangeText={setQuilometragem}
        />
        <TextInput
          style={styles.input}
          placeholder="URL da Foto"
          placeholderTextColor="#aaa"
          value={fotoUrl}
          onChangeText={setFotoUrl}
        />
        <TextInput
          style={styles.input}
          placeholder="Preço"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={preco}
          onChangeText={setPreco}
        />

        <TouchableOpacity style={styles.button} onPress={handleCadastro}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    backgroundColor: '#1f1f1f',
    padding: 15,
    borderRadius: 10,
    color: '#fff',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#e60000',
    padding: 15,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
