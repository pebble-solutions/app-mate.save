import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import DeleteActivityButton from '../components/deleteActivityButton';

const FullActivityInfos = ({ activity, onClose, onDelete }) => {
  const selectedItem = activity;
  const openSettingsModal = () => {
    console.log('Ouverture des réglages');
  };


  // Fonction pour générer les rectangles verts (4 par ligne) avec "Prénom Nom" en dessous
const renderGreenRectangles = () => {
	const rectangles = [];
	const numRows = 4; // Nombre de lignes souhaité
	const numCols = 4; // Nombre de colonnes souhaité
  
	for (let i = 0; i < numRows; i++) {
	  const row = [];
	  for (let j = 0; j < numCols; j++) {
		row.push(
		  <View key={j} style={styles.greenRectangleContainer}>
			{/* Zone supérieure pour le carré */}
			<View style={styles.greenRectangle}>
			  {/* Contenu des rectangles, par exemple, un numéro */}
			  <Text style={styles.greenRectangleText}>LM</Text>
			</View>
			{/* Zone inférieure pour "Prénom Nom" */}
			<Text style={styles.greenRectangleName}>Prénom Nom</Text>
		  </View>
		);
	  }
	  rectangles.push(
		<View key={`row-${i}`} style={styles.rowContainer}>
		  {row}
		</View>
	  );
	}
	return rectangles;
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
          {/* Affichage des rectangles verts (4 par ligne) */}
          <View style={styles.greenRectanglesContainer}>{renderGreenRectangles()}</View>
        </View>
        {/* Contenu de la deuxième section (ancien code) */}
        <View style={styles.infoContainer}>
          <Text style={styles.infoSectionTitle}>Autres</Text>
		  <Text style={styles.infoSectionContent}>- autre 1</Text>
		  <Text style={styles.infoSectionContent}>- autre 2</Text>
		  <Text style={styles.infoSectionContent}>- autre 3</Text>

          {/* Ancien code (à réintégrer) */}
          {/* ... */}
        </View>
        {/* Contenu de la troisième section */}
        <DeleteActivityButton
          title={selectedItem.label}
          id={selectedItem._id}
        />
      </ScrollView>

      {/* Cette View garantit que le ScrollView termine à 10% du bas de l'écran */}
      <View/>
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
    padding: 10,
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
  greenRectangleContainer: {
	flex: 1,
	flexDirection: 'column',
	alignItems: 'center',
	marginBottom: 10,
  },
  greenRectangle: {
	width: 70,
	height: 70,
	backgroundColor: 'green',
	borderRadius: 10,
	marginBottom: 7, // Espacement entre le carré et le texte
	alignItems: 'center',
	justifyContent: 'center',
  },
  greenRectangleText: {
	color: 'white',
	fontSize: 16,
	fontWeight: 'bold',
  },
  greenRectangleName: {
	color: 'white',
	fontSize: 14,
	textAlign: 'center',
  },
  rowContainer: {
	flexDirection: 'row',
	justifyContent: 'space-between',
	marginBottom: 4,
  },
  
  
});

export default FullActivityInfos;
