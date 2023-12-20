import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import DeleteActivityButton from '../components/deleteActivityButton';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'; // Importez l'icône

const FullActivityInfos = ({ activity, onClose }) => {
  const selectedItem = activity;

  return (
    <View style={{ ...styles.container, backgroundColor: selectedItem.color }}>
      {/* Barre supérieure avec bouton de fermeture */}
      <View style={styles.header}>
        {/* Texte "Réglages" aligné à gauche */}
        <Text style={styles.leftText}>Réglages</Text>
        
        {/* Bouton de suppression aligné à droite */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu de l'activité */}
      <View style={styles.activityContent}>
        <Text style={styles.activityName}>{activity.label}</Text>
        <Text style={styles.activityDate}>Créé le {moment(activity.start).format('DD.MM.YYYY')}</Text>
        <Text style={styles.activityDate}>{activity.description}</Text>
        {/* Ajoutez ici les autres informations de l'activité */}
      </View>  

      {/* Bouton de suppression */}
      <DeleteActivityButton
        title={selectedItem.label}
        id={selectedItem._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Pour aligner "Réglages" à gauche et "Fermer" à droite
    alignItems: 'center', // Pour centrer verticalement
    padding: 10,
  },
  leftText: {
    color: 'white',
    fontSize: 14,

  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
    paddingLeft: 15,
  },
  activityContent: {
    flex: 1,
    alignItems: 'center',
  },
  activityName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  activityDate: {
    color: 'white',
    fontSize: 16,
  },
  deleteButtonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default FullActivityInfos;
