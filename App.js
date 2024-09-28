// src/App.js
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, Button, StyleSheet, Text } from 'react-native';
import GameList from './components/GameList';
import GameForm from './components/GameForm';

// Crea un navegador tipo cajón
const Drawer = createDrawerNavigator();

const App = () => {
  // Estado para el juego en edición
  const [editingGame, setEditingGame] = useState(null); 
  // Estado para mostrar/ocultar el formulario
  const [showForm, setShowForm] = useState(false); 

  // Maneja la edición de un juego
  const handleEdit = (game) => {
    setEditingGame(game);
    setShowForm(true); // Muestra el formulario de edición
  };

  // Guarda los cambios y oculta el formulario
  const handleSave = () => {
    setEditingGame(null);
    setShowForm(false);
  };

  // Componente de la pantalla de la lista de juegos
  const GameListScreen = () => (
    <View style={styles.container}>
      {showForm ? (
        <GameForm 
          gameToEdit={editingGame} 
          onSave={handleSave} 
          onCancel={() => setShowForm(false)} 
        />
      ) : (
        <>
          <Text style={styles.title}>Lista de Videojuegos</Text>
          <Button 
            title="Agregar Nuevo Juego" 
            onPress={() => setShowForm(true)} 
            color="#007BFF" 
          />
          <GameList onEdit={handleEdit} />
        </>
      )}
    </View>
  );

  // Configuración de la navegación
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inicio" 
        screenOptions={{
          // Color del texto en el encabezado
          headerTintColor: '#fff', 
          // Estilo del encabezado
          headerStyle: { backgroundColor: '#007BFF' }, 
        }}
      >
        <Drawer.Screen name="Inicio" component={GameListScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
});

export default App; 
