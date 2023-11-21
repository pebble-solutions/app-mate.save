import React, {useState} from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

const AddVarModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.section}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.container}>
          <View style={styles.section}>
            <Text style={styles.addButtonText}>Libellé</Text>
            <Pressable
              style={[styles.section]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.addButtonText}>Valider</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Pressable
        style={[styles.addButton]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Configurer une variable</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333030', // Fond gris foncé
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    paddingTop: 60, // Ajoutez plus d'espace en haut si nécessaire
    paddingBottom: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333030', // Fond de l'entête
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff', // Texte blanc
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff', // S'assure que le texte est blanc
    fontWeight: 'bold',
    marginBottom: 10,
  },

  section: {
    backgroundColor: '#1F1F1F', // Fond des sections
    width: '100%', // Prend toute la largeur de l'écran
    paddingVertical: 30, // Augmente l'espace vertical à l'intérieur de la carte
    paddingHorizontal: 20, // Espace horizontal à l'intérieur de la carte
    alignItems: 'center', // Centre les éléments horizontalement
    justifyContent: 'center', // Centre les éléments verticalement
    marginBottom: 10, // Espace entre les cartes
    borderRadius: 20, // Coins arrondis pour les cartes
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20, // Espace au-dessus du bouton
  },
  addButtonText: {
    color: '#ffffff', // Texte blanc
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10, // Espace entre le symbole '+' et le texte
  },
});

export default AddVarModal;