import React, { useState } from 'react';
import { Text, View, TouchableOpacity, TextInput, StyleSheet, } from 'react-native';

const ActivityModal = ({ onClose, onCreated }) => {
  const [activityName, setActivityName] = useState('');
  const [activityDescrition, setActivityDescription] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);

  const colorOptions = [
    '#b53d35',
    '#b77856',
    '#afa47a',
    '#2fa580',
    '#057a9a',
    '#3f74a8',
    '#7062c8',
    '#8759a4'
  ];

  const createActivity = async () => {
    try {
      // Votre URL API
      const apiUrl = 'https://api.pebble.solutions/v5/activity/';

      // Données de l'activité à envoyer
      const activityData = {
        label: activityName,
        description: activityDescrition,
        start: new Date().toISOString(), // Utilisez ISO format pour la date
        end: null,
        color: selectedColor,
        sync: false,
        variables: []
      };

      // Options de la requête POST
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activityData),
      };

      // Envoie la requête POST à l'API
      const response = await fetch(apiUrl, requestOptions);

      if (response.ok) {
        const responseData = await response.json(); // Convertir la réponse en JSON
        console.log('Activité créée avec succès:', responseData);
        onCreated({ ...activityData, _id: responseData._id })
      } else {
        console.error('Erreur lors de la création de l\'activité. Statut de réponse:', response.status);
      }
      onClose();
    } catch (error) {
      console.error('Erreur lors de la création de l\'activité :', error);
    }
  };

  return (
    <View style={styles.modalContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={styles.modalContent}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>x</Text>
        </TouchableOpacity>
        <Text style={styles.modalTitle}>Créer une activité</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder={activityName ? activityName : 'Nom de l\'activité'}
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            value={activityName}
            onChangeText={text => setActivityName(text)}
          />

          <TextInput
            style={styles.input}
            placeholder="Description de l'activité"
            placeholderTextColor={'rgba(255, 255, 255, 0.7)'}
            value={activityDescrition}
            onChangeText={text => setActivityDescription(text)}
          />

        </View>
        <Text style={styles.colorLabel}>Choisissez une couleur :</Text>
        <View style={styles.colorOptionsContainer}>
          {colorOptions.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.colorOption,
                { backgroundColor: color, borderColor: selectedColor === color ? 'white' : 'transparent' },
              ]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.createButton} onPress={createActivity}>
          <Text style={styles.createButtonText}>Créer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)', // Fond sombre
  },
  modalContent: {
    backgroundColor: '#1F1F1F', // Fond sombre pour la modal
    padding: 20,
    borderRadius: 10,
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#ffffff', // Texte blanc
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // Texte blanc
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    color: '#ffffff', // Texte blanc
  },
  radioLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // Texte blanc
  },
  createButton: {
    backgroundColor: '#9155fd', // Fond orange pour le bouton "Créer"
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  createButtonText: {
    color: '#ffffff', // Texte blanc
    fontSize: 18,
    fontWeight: 'bold',
  },
  colorLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#ffffff', // Texte blanc
  },
  colorOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  colorOption: {
    width: 30,
    height: 30,
    borderRadius: 20,
    borderWidth: 3,
  },
});

export default ActivityModal;