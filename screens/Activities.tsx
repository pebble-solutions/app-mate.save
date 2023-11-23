import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import ActivityModal from './modals/ActivityModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const App = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [activities, setActivities] = useState([]);

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

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Gestion des activités</Text>
      </View>

      {/* Liste des activités dans la partie "section" */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Mes activités</Text>
        <ScrollView style={styles.activityList} contentContainerStyle={styles.activityListContent}>
          {activities.map((activity, index) => (
            <View
              key={index}
              style={{ backgroundColor: activity.color, ...styles.activityItem }}
            >
              <Text style={styles.activityName}>{activity.name}</Text>
            </View>
          ))}
        </ScrollView>
        <TouchableOpacity style={styles.addButton} onPress={openModal}>
          <Text style={styles.addButtonText}>+</Text>
          <Text style={styles.addButtonText}>Ajouter une activité</Text>
        </TouchableOpacity>
      </View>


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
    paddingTop: 60,
    paddingBottom: 20,
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
    backgroundColor: '#1F1F1F',
    width: '100%',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
    borderRadius: 20,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
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
    width: '48%', // 2 activités par ligne (50% de la largeur avec un petit espace entre)
    marginBottom: 10,
    padding: 10,
    borderRadius: 10,
  },
  activityName: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default App;
