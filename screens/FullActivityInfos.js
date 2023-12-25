import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import DeleteActivityButton from '../components/deleteActivityButton';

const FullActivityInfos = ({ activity, onClose, onDelete }) => {
  const selectedItem = activity;
  const openSettingsModal = () => {
    console.log('Ouverture des réglages');
  };

  // Fonction pour générer les carrés verts
  const renderGreenSquares = () => {
    const squares = [];
    for (let i = 0; i < 16; i++) {
      squares.push(
        <View key={i} style={styles.greenSquare}>
          {/* Contenu des carrés, par exemple, un numéro */}
          <Text style={styles.greenSquareText}>{i + 1}</Text>
        </View>
      );
    }
    return squares;
  };

  return (
    <View style={{ ...styles.container, backgroundColor: selectedItem.color }}>
      {/* Barre supérieure avec bouton de fermeture */}
      <View style={styles.header}>
        {/* Bouton "Réglages" pour ouvrir la BottomSheet */}
        <TouchableOpacity onPress={openSettingsModal} style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Réglages</Text>
        </TouchableOpacity>
        {/* Bouton de suppression */}
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

      <ScrollView style={styles.scrollView}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoSectionTitle}>Variables liées</Text>
          <Text style={styles.infoSectionContent}>- variable 1</Text>
          <Text style={styles.infoSectionContent}>- variable 2</Text>
          <Text style={styles.infoSectionContent}>- variable 3</Text>
        </View>
        {/* Contenu de la première section */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoSectionTitle}>Collaborateurs</Text>
          <Text style={styles.infoSectionContent}>- colab 1</Text>
          <Text style={styles.infoSectionContent}>- colab 2</Text>
          <Text style={styles.infoSectionContent}>- colab 3</Text>
          {/* Contenu de la deuxième section */}
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoSectionTitle}>Autres</Text>
          {/* Affichage des carrés verts */}
          <View style={styles.greenSquaresContainer}>{renderGreenSquares()}</View>
        </View>
        {/* Contenu de la troisième section */}
        <DeleteActivityButton
          title={selectedItem.label}
          id={selectedItem._id}
        />
      </ScrollView>

      {/* Cette View garantit que le ScrollView termine à 10% du bas de l'écran */}
      <View style={{ height: '10%' }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 14,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  activityContent: {
    alignItems: 'center',
    marginTop: 20,
  },
  activityName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
  },
  activityDate: {
    color: 'white',
    fontSize: 16,
  },
  scrollView: {
    marginTop: 20,
  },
  infoContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 12,
  },
  infoSectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  infoSectionContent: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  greenSquaresContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  greenSquare: {
    width: '48%',
    height: 80,
    backgroundColor: 'green',
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greenSquareText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default FullActivityInfos;
