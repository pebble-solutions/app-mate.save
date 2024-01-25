
//you need to add android:supportsRtl="true" to AndroidManifest.xml
{/* <application
...
android:supportsRtl="true"> */}
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import moment from 'moment';
import RNPickerSelect from 'react-native-picker-select';
import { ScaleDecorator } from 'react-native-draggable-flatlist';
import { NestableScrollContainer, NestableDraggableFlatList } from "react-native-draggable-flatlist"
import Color from 'color';
import { faTrashCan, faCircleExclamation, faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'

const FullActivityInfos = ({ activity, onClose, onDelete }) => {
  const backgroundColor = activity ? Color(activity.color).darken(0.1).hex() : '';
  const selectedItem = activity;
  const openSettingsModal = () => {
    console.log('Ouverture des réglages');
  };
  const [variables, setVariables] = useState([]);
  const [selectedVariable, setSelectedVariable] = useState({ label: '', _id: '', mandatory: false });
  const [activityVariables, setActivityVariables] = useState([]);
  const [isDragging, setIsDragging] = useState(false);

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
        order: 1,
      };

      try {
        const response = await fetch(`https://api.pebble.solutions/v5/activity/${activity._id}/metric/variable`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(postData),
        });

        if (response.ok) {
          console.log('Variable ajoutée à l\'activité avec succès');
          const newData = { label: selectedVariable.label, _id: selectedVariable._id };
          setActivityVariables([...activityVariables, newData]);
          setSelectedVariable({ label: '', _id: '' });
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

  const deleteActivity = async () => {
    try {
      const response = await fetch(`https://api.pebble.solutions/v5/activity/${activity._id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 202) {
        onDelete();
        Alert.alert('Suppression effectuée');
      } else if ([400, 403, 404, 429, 422, 500].includes(response.status)) {
        Alert.alert('Suppression impossible');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const AlertConfirm = () =>
    Alert.alert('ATTENTION', 'Souhaitez-vous supprimer cette activité: ' + selectedItem.label + ' ?', [
      {
        text: 'Annuler',
        style: 'cancel',
      },
      {
        text: 'Supprimer',
        onPress: deleteActivity,
      },
    ]);

    const handleDeleteVariable = async (variable) => {
      try {
        const response = await fetch(`https://api.pebble.solutions/v5/activity/${activity._id}/metric/variable/${variable._id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
    
        if (response.status === 200) {
          const updatedVariables = activityVariables.filter((item) => item._id !== variable._id);
          setActivityVariables(updatedVariables);
        } else {
          console.error('Erreur lors de la suppression de la variable de l\'activité');
        }
      } catch (error) {
        console.error('Erreur lors de la suppression de la variable de l\'activité :', error);
      }
    };

    const confirmDeleteVariable = (variable) => {
      Alert.alert(
        'Confirmation',
        `Voulez-vous vraiment supprimer la variable : ${variable.label} ?`,
        [
          {
            text: 'Annuler',
            style: 'cancel',
          },
          {
            text: 'Supprimer',
            onPress: () => handleDeleteVariable(variable),
            style: 'destructive', // Utilisez le style 'destructive' pour indiquer une action de suppression
          },
        ]
      );
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

      <NestableScrollContainer style={styles.scrollView}>
        <View style={styles.activityContent}>
          <Text style={styles.activityName}>{activity.label}</Text>
          <Text style={styles.activityDate}>Créé le {moment(activity.start).format('DD.MM.YYYY')}</Text>
          <Text style={styles.activityDate}>{activity.description}</Text>
        </View>

        <Text style={styles.infoSectionTitle}>Variables liées :</Text>

        <NestableDraggableFlatList
          data={activityVariables}
          renderItem={({ item, drag }) => (
            <ScaleDecorator>
              <TouchableOpacity
                onLongPress={() => {
                  setIsDragging(true);
                  drag();
                }}
                disabled={isDragging}
                style={[
                  styles.infoSectionContentContainer,
                  {
                    backgroundColor: isDragging ? 'transparent' : backgroundColor,
                    borderRadius: 7,
                    paddingVertical: 10,
                    marginVertical: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                    position: 'relative',
                  },
                ]}
              >
                {/* Texte centré avec retour à la ligne si nécessaire */}
                {/* Texte centré avec retour à la ligne si nécessaire */}
                <View style={{ flex: 1, alignItems: 'center' }}>
                  <Text style={[styles.infoSectionContent, { flexWrap: 'wrap', textAlign: 'center' }]}>
                    {item.label.length > 25 ? item.label.substring(0, 25) + '...' : item.label}
                  </Text>
                </View>


                {/* Icônes à droite en position absolue */}
                <View style={{ position: 'absolute', right: 10, flexDirection: 'row' }}>
                <TouchableOpacity onPress={() => confirmDeleteVariable(item)} style={styles.iconContainer}>
  <FontAwesomeIcon icon={faTrashCan} color='white' />
</TouchableOpacity>

                  <TouchableOpacity onPress={() => handleEditVariable(item)} style={styles.iconContainer}>
                    <FontAwesomeIcon icon={faPenToSquare} color='white' />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={() => handleToggleMandatory(item)} style={styles.iconContainer}>
                    {item.mandatory ? (
                      <FontAwesomeIcon icon={faCircleExclamation} color='white' />
                    ) : (
                      <FontAwesomeIcon icon={faCircleExclamation} color='grey' />
                    )}
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            </ScaleDecorator>
          )}
          keyExtractor={(item) => item._id}
          onDragEnd={({ data: newData }) => {
            setActivityVariables(newData);
            setIsDragging(false);
          }}
        />

        <Text style={styles.infoSectionTitle}>Autres Variables disponibles :</Text>
        <RNPickerSelect
          onValueChange={(itemValue) => {
            const matchingVariable = variables.find((variable) => variable.label === itemValue);
            setSelectedVariable(matchingVariable || { label: '', _id: '' });
          }}
          value={selectedVariable.label}
          placeholder={{ label: 'Selectionner une variable', value: '' }}
          items={variables.map((variable, index) => ({
            label: variable.label,
            value: variable.label,
          }))}
          style={{
            inputIOS: {
              fontSize: 16,
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 1)',
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#007bff',
              borderRadius: 4,
              marginBottom: 5,
            },
            inputAndroid: {
              fontSize: 16,
              textAlign: 'center',
              color: 'rgba(255, 255, 255, 1)',
              paddingVertical: 10,
              paddingHorizontal: 10,
              borderWidth: 1,
              borderColor: '#007bff',
              borderRadius: 4,
              marginBottom: 10,
            },
          }}
        />
        <TouchableOpacity onPress={addVariableToActivity} style={styles.settingsButton}>
          <Text style={styles.settingsButtonText}>Ajouter cette variable à l'activité</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={AlertConfirm}>
          <View style={styles.buttonDeleteActivity}>
            <Text style={styles.textDeleteActivity}>Supprimer cette activité</Text>
          </View>
        </TouchableOpacity>
      </NestableScrollContainer>

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
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 5,
  },
  settingsButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontSize: 14,
  },
  activityContent: {
    alignItems: 'center',
    marginBottom: 20,
  },
  activityName: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 10,
  },
  activityDate: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 16,
  },
  scrollView: {
    marginTop: 20,
  },
  infoSectionTitle: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  infoSectionContentContainer: {
    backgroundColor: 'transparent',
    marginBottom: 10,
  },
  infoSectionContent: {
    color: 'white',
    fontSize: 16,
  },
  iconContainer: {
    flexDirection: 'row', // Aligner les icônes horizontalement
    alignItems: 'center', // Centrer verticalement les icônes
    marginLeft: 5,
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
    marginBottom: 7,
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
  buttonDeleteActivity: {
    width: '100%',
    backgroundColor: '#d46363',
    marginTop: 10,
    padding: 10,
    borderRadius: 10,
  },
  textDeleteActivity: {
    color: 'white',
    textAlign: 'center',
  },
});

export default FullActivityInfos;
