import React, { useState } from 'react';
import { Modal, Text, View, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const ActivityModal = ({ visible, onClose }) => {
    const [activityName, setActivityName] = useState('');
    const [selectedColor, setSelectedColor] = useState(null);

    const colorOptions = [
        '#ff6961',
        '#ffb480',
        '#f8f38d',
        '#42d6a4',
        '#08cad1',
        '#59adf6',
        '#9d94ff',
        '#c780e8'
      ];

    const createActivity = () => {
        // Vous pouvez mettre ici la logique pour créer une activité avec le nom et la couleur sélectionnée.
        // Par exemple, vous pouvez envoyer ces données à une API ou les traiter localement.

        // Après avoir traité les données, vous pouvez fermer la modale.
        onClose();
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
                        <Text style={styles.closeButtonText}>X</Text>
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
                                    { backgroundColor: color, borderColor: selectedColor === color ? 'black' : 'transparent' },
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
        fontWeight: 'bold',
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
        backgroundColor: 'orange', // Fond orange pour le bouton "Créer"
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
        borderRadius: 15,
        borderWidth: 2,
      },

});

export default ActivityModal;