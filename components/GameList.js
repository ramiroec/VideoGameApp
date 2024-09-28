// src/components/GameList.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert, Linking, Image } from 'react-native';
import axios from 'axios';

const apiUrl = 'http://192.168.0.107:3000/videogames'; // Cambia la URL si es necesario

const GameList = ({ onEdit }) => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    loadGames();
  }, []);

  const loadGames = async () => {
    try {
      const response = await axios.get(apiUrl);
      setGames(response.data);
    } catch (error) {
      console.error('Error al cargar videojuegos:', error);
      Alert.alert('Error', 'No se pudieron cargar los videojuegos.');
    }
  };

  const renderGame = ({ item }) => (
    <View style={styles.gameItem}>
      <Image source={{ uri: item.photo }} style={styles.image} />
      <Text style={styles.gameName}>{item.name}</Text>
      <Text style={styles.gameDescription}>{item.description}</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => onEdit(item)}>
          <Text style={styles.buttonText}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => deleteGame(item.id)}>
          <Text style={styles.buttonText}>Eliminar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => openVideo(item.video)}>
          <Text style={styles.buttonText}>Ver Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const deleteGame = async (id) => {
    try {
      await axios.delete(`${apiUrl}/${id}`);
      loadGames(); // Recargar videojuegos después de la eliminación
      Alert.alert('Éxito', 'Juego eliminado correctamente.');
    } catch (error) {
      console.error('Error al eliminar el juego:', error);
      Alert.alert('Error', 'No se pudo eliminar el juego.');
    }
  };

  const openVideo = (videoUrl) => {
    Linking.openURL(videoUrl).catch(err => {
      console.error('Error al abrir el video:', err);
      Alert.alert('Error', 'No se pudo abrir el enlace del video.');
    });
  };

  return (
    <FlatList
      data={games}
      renderItem={renderGame}
      keyExtractor={(item) => item.id.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingBottom: 20,
  },
  gameItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  gameName: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  gameDescription: {
    marginBottom: 10,
    color: '#666',
    fontSize: 14,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default GameList;
