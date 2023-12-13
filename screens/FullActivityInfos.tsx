import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';

const FullActivityInfos = ({ activity, onClose, onDelete }) => {
  return (
    <View style={styles.container}>
      {/* Barre supérieure avec bouton de fermeture */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>X</Text>
        </TouchableOpacity>
      </View>

      {/* Contenu de l'activité */}
      <View style={styles.activityContent}>
        <Text style={styles.activityName}>{activity.label}</Text>
        <Text style={styles.activityDate}>Créé le {moment(activity.start).format('DD.MM.YYYY')}</Text>
        {/* Ajoutez ici les autres informations de l'activité */}
      </View>

      {/* Bouton de suppression */}
      <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Supprimer</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 24,
  },
  activityContent: {
    flex: 1,
    justifyContent: 'center',
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
