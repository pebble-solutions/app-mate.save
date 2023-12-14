import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import ActivityModal from './modals/ActivityModal';
import FullActivityInfos from './FullActivityInfos'; // Importez votre composant FullActivityInfos ici
import moment from 'moment';

const App = () => {
  // État du modal
  const [modalVisible, setModalVisible] = useState(false);
  // État de chargement
  const [loading, setLoading] = useState(true);
  // Liste des activités en ligne
  const [onlineActivities, setOnlineActivities] = useState([]);
  // Index de l'activité sélectionnée
  const [selectedActivityIndex, setSelectedActivityIndex] = useState(-1);
  const [statusBar, setStatusBar] = useState(false);

  // Fonction pour ouvrir le modal avec l'index de l'activité sélectionnée
  const openModal = (index) => {
    setSelectedActivityIndex(index);
    setModalVisible(true);
  };

  // Fonction pour fermer le modal
  const closeModal = async () => {
    await fetchOnlineActivities();
    setSelectedActivityIndex(-1);
    setModalVisible(false);
  };

  // Fonction pour récupérer les activités en ligne depuis une API
  const fetchOnlineActivities = async () => {
    try {
      const response = await fetch('https://api.pebble.solutions/v5/activity/');
      if (response.ok) {
        const data = await response.json();
        setOnlineActivities(data); // Mettre à jour le tableau des activités en ligne
      } else {
        console.error('Erreur lors de la récupération des activités :', response.status);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des activités :', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSuccess = () => {
    setSelectedActivityIndex(-1);
    setModalVisible(false);
  };

  // Utilise useEffect pour charger les activités en ligne au montage du composant
  useEffect(() => {
    fetchOnlineActivities();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des activités</Text>
      </View>

      {/* Liste des activités dans la partie "section" */}
      <ScrollView style={styles.section}>
        <Text style={styles.sectionTitle}>Mes activités : </Text>

        {loading ? (
          <Text style={styles.loadingText}>Chargement en cours...</Text>
        ) : (
          <ScrollView
            style={styles.activityList}
            contentContainerStyle={styles.activityListContent}
          >
            {onlineActivities.map((activity, index) => (
              <TouchableOpacity
                key={index}
                style={{ backgroundColor: activity.color, ...styles.activityItem }}
                onPress={() => openModal(index)}
              >
                <Text style={styles.activityName}>{activity.label}</Text>
                <Text style={styles.activityContent}>{activity.description}</Text>  
                <Text style={styles.activityContent}>Crée le {moment(activity.start).format('DD.MM.YYYY')}
                </Text>
              </TouchableOpacity>
            ))}

            {/* Ajouter une dernière carte avec un fond noir pour l'ajout */}
            <TouchableOpacity style={styles.addCard} onPress={() => openModal(-1)}>
              <Text style={styles.addCardText}>Ajouter une activité</Text>
              <Text style={styles.addCardTextPlus}>+</Text>
            </TouchableOpacity>
          </ScrollView>
        )}
      </ScrollView>

      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        {selectedActivityIndex !== -1 ? (
          <FullActivityInfos
            activity={onlineActivities[selectedActivityIndex]}
            onClose={closeModal}
            onDelete={closeModal}
            onDeleteSuccess={handleDeleteSuccess}
          />
        ) : (
          <ActivityModal visible={modalVisible} onClose={closeModal} /> 
        )}
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    paddingTop: 40,
    paddingBottom: 10,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1F1F1F',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  sectionTitle: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  section: {

    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    backgroundColor: '#303030',
    paddingVertical: 10,
    marginBottom: 20,
    borderRadius: 10,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
  activityList: {
    marginTop: 20,
    marginBottom: 110,
  },
  activityListContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityItem: {
    width: '48.5%',
    marginBottom: 10,
    height: 120,
    padding: 10,
    borderRadius: 10,
  },
  activityName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  activityContent: {
    color: '#ffffff',
    fontSize: 12,
    marginVertical: 5,
    textAlign: 'center',
  },
  clearButton: {
    backgroundColor: 'red',
    borderRadius: 10,
    paddingVertical: 7,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  clearButtonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 12,
  },

  addCard: {
    flexDirection: 'column',
    alignItems: 'center', 
    justifyContent: 'center',
    width: '48.5%',
    marginBottom: 10,
    height: 120,
    padding: 10,
    borderRadius: 10,

    borderColor: 'white', // Couleur de la bordure blanche
    borderWidth: 1, // Largeur de la bordure
    borderStyle: 'dashed', // Style de la bordure (pointillée)


  },

  addCardText: {
    marginTop: 10,
    color: '#ffffff',
    fontSize: 14,
    textAlign: 'center',
  },
  addCardTextPlus: {
    color: '#ffffff',
    fontSize: 35,
    textAlign: 'center', 
  },
  
  
  
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    textAlign: 'center',
  },

});

export default App;
