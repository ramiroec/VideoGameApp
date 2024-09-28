// src/components/GameForm.js
import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, Alert, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';

const apiUrl = 'http://192.168.0.107:3000/videogames'; // Cambia la URL si es necesario

const GameForm = ({ gameToEdit, onSave, onCancel }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [photo, setPhoto] = useState('');
  const [video, setVideo] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (gameToEdit) {
      setName(gameToEdit.name);
      setDescription(gameToEdit.description);
      setPhoto(gameToEdit.photo);
      setVideo(gameToEdit.video);
    } else {
      // Limpiar campos si no hay juego para editar
      setName('');
      setDescription('');
      setPhoto('');
      setVideo('');
    }
  }, [gameToEdit]);

  const validateUrl = (url) => {
    const pattern = /^(ftp|http|https):\/\/[^ "]+$/; // Expresión regular para validar URL
    return pattern.test(url);
  };

  const validateFields = () => {
    const newErrors = {};
    if (!name) newErrors.name = 'El nombre es requerido.';
    if (!description) newErrors.description = 'La descripción es requerida.';
    if (!photo || !validateUrl(photo)) newErrors.photo = 'Ingrese una URL de foto válida.';
    if (!video || !validateUrl(video)) newErrors.video = 'Ingrese una URL de video válida.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Retorna true si no hay errores
  };

  const handleSave = async () => {
    if (!validateFields()) return; // Validar campos antes de proceder

    const game = { name, description, photo, video };
    setLoading(true); // Mostrar el indicador de carga

    try {
      if (gameToEdit) {
        await axios.put(`${apiUrl}/${gameToEdit.id}`, game);
        Alert.alert('Juego actualizado correctamente.');
      } else {
        await axios.post(apiUrl, game);
        Alert.alert('Juego agregado correctamente.');
      }
      onSave();
      resetForm(); // Limpiar el formulario después de guardar
    } catch (error) {
      console.error('Error al guardar el juego:', error);
      Alert.alert('Error al guardar el juego.');
    } finally {
      setLoading(false); // Ocultar el indicador de carga
    }
  };

  const resetForm = () => {
    setName('');
    setDescription('');
    setPhoto('');
    setVideo('');
    setErrors({});
  };

  return (
    <View style={styles.form}>
      <TextInput
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      {errors.name && <Text style={styles.error}>{errors.name}</Text>}

      <TextInput
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
        style={styles.input}
      />
      {errors.description && <Text style={styles.error}>{errors.description}</Text>}

      <TextInput
        placeholder="URL de la Foto"
        value={photo}
        onChangeText={setPhoto}
        style={styles.input}
      />
      {errors.photo && <Text style={styles.error}>{errors.photo}</Text>}

      <TextInput
        placeholder="URL del Video"
        value={video}
        onChangeText={setVideo}
        style={styles.input}
      />
      {errors.video && <Text style={styles.error}>{errors.video}</Text>}

      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleSave} style={[styles.button, { backgroundColor: '#007BFF' }]} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.buttonText}>Guardar</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={onCancel} style={[styles.button, { backgroundColor: '#FF5733' }]}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
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
  error: {
    color: 'red',
    marginBottom: 10,
  },
});

export default GameForm;
