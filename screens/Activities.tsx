import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import ActivityModal from './modals/ActivityModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import moment from 'moment';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [onlineActivities, setOnlineActivities] = useState([]);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = async () => {
    await fetchActivities();
    setModalVisible(false);
  };

  const fetchActivities = async () => {
    try {
      const storedActivities = await AsyncStorage.getItem('activities');
      if (storedActivities !== null) {
        setActivities(JSON.parse(storedActivities));
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des activités :', error);
    }
  }; 

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
  }
  const clearActivities = async () => {
    try {
      // Supprimer toutes les activités de AsyncStorage
      await AsyncStorage.removeItem('activities');
      // Mettre à jour l'état pour vider la liste d'activités
      setActivities([]);
    } catch (error) {
      console.error('Erreur lors de la suppression des activités :', error);
    }
  };

  useEffect(() => {
    fetchActivities();
    fetchOnlineActivities();
  }, [],);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des activités</Text>
        <TouchableOpacity style={styles.clearButton} onPress={clearActivities}>
          <Text style={styles.clearButtonText}>Effacer toutes les activités</Text>
        </TouchableOpacity>
      </View>

      {/* Liste des activités dans la partie "section" */}
      <ScrollView style={styles.section}>
        <Text style={styles.sectionTitle}>Mes activités</Text>
        <ScrollView style={styles.activityList} contentContainerStyle={styles.activityListContent}>
          {activities.map((activity, index) => (
            <View
              key={index}
              style={{ backgroundColor: activity.color, ...styles.activityItem }}
            >
              <Text style={styles.activityName}>{activity.label}</Text>
              <Text style={styles.activityContent}>Crée le {moment(activity.start).format('DD.MM.YYYY')}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>+</Text>
          <Text style={styles.addButtonText}>Ajouter une activité</Text>
        </TouchableOpacity>
      
         {/* Liste des activités en ligne */}
       <Text style={styles.sectionTitle}>autres activités en ligne</Text>
        {loading ? (
         <Text style={styles.loadingText}>Chargement en cours...</Text>
         ) : (
           <ScrollView style={styles.activityList} contentContainerStyle={styles.activityListContent}>
             {onlineActivities.map((activity, index) => (
               <View
                 key={index}
                 style={{ backgroundColor: activity.color, ...styles.activityItem }}
               >
                 <Text style={styles.activityName}>{activity.label}</Text>
                 <Text style={styles.activityContent}>Crée le {moment(activity.start).format('DD.MM.YYYY')}</Text>
               </View>
             ))}
           </ScrollView>
         )}
           <Text style={{ color: 'white' }}>
       {JSON.stringify(activities)}
        </Text>

      </ScrollView>

      



      {/* Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <ActivityModal visible={modalVisible} onClose={closeModal} />
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
  },
  activityListContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  activityItem: {
    width: '48.5%', // 2 activités par ligne (50% de la largeur avec un petit espace entre)
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
    borderRadius: 10, // Pour rendre le bouton rond
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

});

export default App;
