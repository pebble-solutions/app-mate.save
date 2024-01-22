

//you need to add android:supportsRtl="true" to AndroidManifest.xml

{/* <application
...
android:supportsRtl="true"> */}


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import DeleteActivityButton from '../components/deleteActivityButton';
import { Picker } from '@react-native-picker/picker';

const FullActivityInfos = ({ activity, onClose, onDelete }) => {
  const selectedItem = activity;
  const openSettingsModal = () => {
    console.log('Ouverture des réglages');
  };
  const [variables, setVariables] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState({ label: '', _id: '' });
  const [activityVariables, setActivityVariables] = useState([]);
 
  const fetchVariables = async () => {
    try {
      const response = await fetch('https://api.pebble.solutions/v5/metric/variable/');
      const data = await response.json();
      setVariables(data);
    } catch (error) {
      console.error('Erreur lors de la récupération des données :', error);
    }
  };


  useEffect(() => {
    fetchVariables();
    setActivityVariables(activity.variables);
  }, [activity]);

 const addVariableToActivity = async () => {
    if (selectedVariable._id) {
      const variableId = selectedVariable._id;
      const activityId = activity._id;
      const postData = {
        variable_id: variableId,
        mandatory: false,
        order: 1
      };

      try {
        const response = await fetch(`https://api.pebble.solutions/v5/activity/${activity._id}/metric/variable`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(postData)
        });

        if (response.ok) {
          console.log('Variable ajoutée à l\'activité avec succès');
          const newData = await response.json();
          setActivityVariables(prevVariables => [...prevVariables, newData]);
          setSelectedVariable({ label: '', _id: '' });
          fetchVariables();
        } else {
          console.error('Erreur lors de l\'ajout de la variable à l\'activité');
        }
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la variable à l\'activité :', error);
      }
    } else {
      console.warn('Veuillez sélectionner une variable avant de l\'ajouter à l\'activité.');
    }
  };


  const renderGreenRectangles = () => {
    const rectangles = [];
    const numRows = 4;
    const numCols = 4;

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
            {/* Zone inférieure pour "Prénom" et "Nom" sur des lignes distinctes */}
            <Text style={styles.greenRectangleName}>Prénom</Text>
            <Text style={styles.greenRectangleName}>Nom</Text>
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
      <View style={styles.header}>
        <TouchableOpacity onPress={openSettingsModal} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Réglages</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <Text style={styles.closeButtonText}>Fermer</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.activityContent}>
        <Text style={styles.activityName}>{activity.label}</Text>
        <Text style={styles.activityDate}>Créé le {moment(activity.start).format('DD.MM.YYYY')}</Text>
        <Text style={styles.activityDate}>{activity.description}</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.infoContainer}>
          <Text style={styles.infoSectionTitle}>Variables liées</Text>

          {activity.variables.map(variable => (
            <Text key={variable._id} style={styles.infoSectionContent}>
              - {variable.label}
            </Text>
          ))}
          <Text style={styles.infoSectionTitle}>Autres variables disponibles</Text>
          <Picker
            selectedValue={selectedVariable.label}
            onValueChange={(itemValue) => {
              const matchingVariable = variables.find(variable => variable.label === itemValue);
              setSelectedVariable(matchingVariable || { label: '', _id: '' });
            }}
          >
            <Picker.Item label="Sélectionnez une variable" value="" />
            {variables.map((variable, index) => (
              <Picker.Item key={index} label={variable.label} value={variable.label} />
            ))}
          </Picker>
          <TouchableOpacity onPress={addVariableToActivity} style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Ajouter cette variable à l'activité</Text>
          </TouchableOpacity>

          {/* <Text>1   {selectedVariable.label}</Text>
          <Text>2   {selectedVariable._id}</Text>
          <Text>3   {activity._id}</Text> */}

        </View>
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
        </View>
        <DeleteActivityButton
          title={selectedItem.label}
          id={selectedItem._id}
        />
      </ScrollView>

      <View />
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 25,
  },
  settingsButton: {
    backgroundColor: '#007bff', // Bleu classique pour les boutons
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  settingsButtonText: {
    color: 'white', // Texte blanc pour une meilleure visibilité
    fontWeight: 'bold',
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
    paddingBottom: 20,
    marginBottom: 12,
  },
  infoSectionTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 20,
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
