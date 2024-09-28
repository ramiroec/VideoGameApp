// src/App.js
import React, { useState } from 'react'; // Importa React y el useState para gestionar el estado
import { NavigationContainer } from '@react-navigation/native'; // Importa el contenedor de navegación
import { createDrawerNavigator } from '@react-navigation/drawer'; // Importa el navegador tipo cajón (drawer)
import { View, Button, StyleSheet, Text } from 'react-native'; // Importa componentes de React Native
import GameList from './components/GameList'; // Importa el componente de lista de videojuegos
import GameForm from './components/GameForm'; // Importa el componente de formulario para agregar o editar juegos

// Crea una instancia del navegador tipo cajón
const Drawer = createDrawerNavigator();

// Componente principal de la aplicación
const App = () => {
  // Estado para gestionar el juego que se está editando
  const [editingGame, setEditingGame] = useState(null);
  // Estado para mostrar u ocultar el formulario
  const [showForm, setShowForm] = useState(false);

  // Función para manejar la edición de un juego
  const handleEdit = (game) => {
    setEditingGame(game); // Establece el juego que se va a editar
    setShowForm(true); // Muestra el formulario
  };

  // Función para manejar la acción de guardar cambios
  const handleSave = () => {
    setEditingGame(null); // Restablece el juego en edición
    setShowForm(false); // Oculta el formulario
  };

  // Componente que representa la pantalla de la lista de juegos
  const GameListScreen = () => (
    <View style={styles.container}>
      {showForm ? ( // Condición para mostrar el formulario o la lista de juegos
        <GameForm 
          gameToEdit={editingGame} // Pasa el juego que se va a editar
          onSave={handleSave} // Función a llamar al guardar
          onCancel={() => setShowForm(false)} // Función a llamar al cancelar
        />
      ) : (
        <>
          <Text style={styles.title}>Lista de Videojuegos</Text>
          <Button 
            title="Agregar Nuevo Juego" // Título del botón
            onPress={() => setShowForm(true)} // Muestra el formulario al presionar
            color="#007BFF" // Color del botón
          />
          <GameList onEdit={handleEdit} /> // Muestra la lista de juegos y permite la edición
        </>
      )}
    </View>
  );

  // Renderiza el contenedor de navegación con el navegador tipo cajón
  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Inicio" // Pantalla inicial del navegador
        screenOptions={{
          headerTintColor: '#fff', // Color del texto del encabezado
          headerStyle: { backgroundColor: '#007BFF' }, // Estilo del encabezado
        }}
      >
        <Drawer.Screen name="Inicio" component={GameListScreen} /> // Pantalla principal de la aplicación
        {/* Puedes agregar más pantallas aquí si es necesario */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

// Estilos de la aplicación
const styles = StyleSheet.create({
  container: {
    flex: 1, // Utiliza todo el espacio disponible
    padding: 20, // Espaciado interno
    backgroundColor: '#f4f4f4', // Color de fondo
  },
  title: {
    fontSize: 24, // Tamaño de fuente del título
    fontWeight: 'bold', // Peso de fuente
    marginBottom: 20, // Margen inferior
    textAlign: 'center', // Alineación de texto
    color: '#333', // Color del texto
  },
});

// Exporta el componente App para su uso en otras partes de la aplicación
export default App;
