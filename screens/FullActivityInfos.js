import React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import moment from 'moment';
import DeleteActivityButton from '../components/deleteActivityButton';
import { Picker } from '@react-native-picker/picker';

//you need to add android:supportsRtl="true" to AndroidManifest.xml

{/* <application
...
android:supportsRtl="true"> */}

const FullActivityInfos = ({ activity, onClose, onDelete }) => {
  const selectedItem = activity;
  const openSettingsModal = () => {
    console.log('Ouverture des réglages');
  };
  const [variables, setVariables] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState('');

  useEffect(() => {
    // hook pour effectuer la requête HTTP lors du chargement du composant
    fetch('https://api.pebble.solutions/v5/metric/variable/')
      .then(response => response.json())
      .then(data => {
        // Une fois les données récupérées, extrayez les labels des variables et mettez-les à jour dans l'état
        const variableLabels = data.map(variable => variable.label);
        setVariables(variableLabels);
      })
      .catch(error => {
        console.error('Erreur lors de la récupération des données :', error);
      });
  }, []); // Le tableau vide en tant que dépendance signifie que cela ne sera exécuté qu'une seule fois lors du chargement du composant

  // Fonction pour gérer l'ajout de la variable à l'activité
const addVariableToActivity = () => {
  if (selectedVariable) {
    // Recherchez la variable correspondant au label sélectionné
    const matchingVariable = variables.find(variable => variable.label === selectedVariable);

    if (matchingVariable) {
      // Si une variable correspondante est trouvée, utilisez son ID
      const variableId = matchingVariable._id;

      // Remplacez "activity.id" par la véritable propriété d'ID de votre activité
      const activityId = activity._id;

      // Effectuez la requête POST vers l'API en utilisant variableId comme ID de variable
      const postData = {
        variable_id: variableId,
        mandatory: false,
        order: 1
      };

      fetch(`https://api.pebble.solutions/v5/activity/${activityId}/metric/variable`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
      })
        .then(response => response.json())
        .then(data => {
          // Traitement des données de réponse si nécessaire
          console.log('Variable ajoutée à l\'activité avec succès :', data);
        })
        .catch(error => {
          console.error('Erreur lors de l\'ajout de la variable à l\'activité :', error);
        });
    } else {
      console.warn('Aucune variable correspondante trouvée pour le label sélectionné.');
    }
  } else {
    console.warn('Veuillez sélectionner une variable avant de l\'ajouter à l\'activité.');
  }
};

  // Fonction pour générer les rectangles verts (4 par ligne) avec "Prénom" et "Nom" sur des lignes distinctes
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

          {activity.variables.map(variable => (
            <Text key={variable._id} style={styles.infoSectionContent}>
              - {variable.label}
            </Text>
          ))}
          <Text style={styles.infoSectionTitle}>autres variables disponibles</Text>
          <Picker
            selectedValue={selectedVariable}
            onValueChange={(itemValue) => setSelectedVariable(itemValue)}
          >
            <Picker.Item label="Sélectionnez une variable" value="" />
            {variables.map((label, index) => (
              <Picker.Item key={index} label={label} value={label} />
            ))}
          </Picker>
          <TouchableOpacity onPress={addVariableToActivity} style={styles.settingsButton}>
            <Text style={styles.settingsButtonText}>Ajouter cette variable à l'activité</Text>
          </TouchableOpacity>

          <Text> 1   {selectedVariable}</Text>
          <Text>2   {selectedVariable._id}</Text>
          <Text>3   {activity._id}</Text>
          <Text>4   {variables}</Text>


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
        </View>
        {/* Contenu de la troisième section */}
        <DeleteActivityButton
          title={selectedItem.label}
          id={selectedItem._id}
        />
      </ScrollView>

      {/* Cette View garantit que le ScrollView termine à 10% du bas de l'écran */}
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
