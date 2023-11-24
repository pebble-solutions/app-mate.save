import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ActivityModal = ({ visible, onClose }) => {
    const [activityName, setActivityName] = useState('');
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
          // Générer un UUID unique pour l'activité
          const uuid = Math.random().toString(36).substring(7);
      
          // Créer l'objet d'activité avec les données
          const activity = {
            id: uuid,
            name: activityName,
            description: '',
            start: (new Date()),
            end: null,
            color: selectedColor,
            sync: false,
          };
      
          // Récupérer les activités existantes depuis AsyncStorage (s'il y en a)
          const existingActivities = await AsyncStorage.getItem('activities');
          const activities = existingActivities ? JSON.parse(existingActivities) : [];
      
          // Ajouter la nouvelle activité à la liste
          activities.push(activity);
      
          // Stocker la liste mise à jour dans AsyncStorage
          await AsyncStorage.setItem('activities', JSON.stringify(activities));
      
          // Fermer la modal
          onClose();
        } catch (error) {
          console.error('Erreur lors de la création de l\'activité :', error);
        }
      };
    

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                        <Text style={styles.closeButtonText}>x</Text>
                    </TouchableOpacity>
                    <Text style={styles.modalTitle}>Créer une activité</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Nom de l'activité"
                        value={activityName}
                        onChangeText={text => setActivityName(text)}
                    />
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
        </Modal>
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