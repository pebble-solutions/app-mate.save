import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import AddVariableModal from './addVariableModal';

const AddVar = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des variables</Text>
      </View>
      
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes variables</Text>
       <AddVariableModal></AddVariableModal>
      </View>
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
    backgroundColor: '#1F1F1F', // Fond de l'entête
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

export default AddVar;
