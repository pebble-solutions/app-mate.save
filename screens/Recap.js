import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DayCarousel from './carousel/DayCarousel';
import WeekCarousel from './carousel/WeekCarousel';
import MonthCarousel from './carousel/MonthCarousel';
import DateRangeCarousel from './carousel/DateRangeCarousel';
import FontAwesome from 'react-native-vector-icons/FontAwesome'; // Importez FontAwesome

const Recap = () => {
  const [selectedButton, setSelectedButton] = useState('jour');

  const renderCarousel = () => {
    switch (selectedButton) {
      case 'jour':
        return <DayCarousel />;
      case 'semaine':
        return <WeekCarousel />;
      case 'mois':
        return <MonthCarousel />;
      case 'periode':
        return <DateRangeCarousel />;
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.exportText}>export</Text>
        <Text style={styles.title}>Récapitulatif</Text>
        <Text style={styles.subtitle}>John Doe</Text>
        <View style={styles.buttonGroup}>
          {['jour', 'semaine', 'mois', 'periode'].map((buttonLabel) => (
            <TouchableOpacity
              key={buttonLabel}
              style={[
                styles.button,
                {
                  backgroundColor: selectedButton === buttonLabel ? '#ffffff' : '#9155fd',
                },
              ]}
              onPress={() => setSelectedButton(buttonLabel)}
            >
              <Text style={[styles.buttonText, { color: selectedButton === buttonLabel ? '#9155fd' : '#ffffff' }]}>
                {buttonLabel}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      <ScrollView style={styles.content}>
        {renderCarousel()}
        <View style={styles.addButtonContainer}>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Ajouter un commentaire</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.addButton}>
            <Text style={styles.addButtonText}>Ajouter une pièce jointe</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Fond gris foncé
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    position: 'relative',
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    paddingBottom: 10,
    color: '#ffffff', // Texte blanc
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 18,
    paddingBottom: 4,
    color: '#ffffff', // Texte blanc
    textAlign: 'center',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  exportText: {
    position: 'absolute',
    color: '#ffffff',
    fontSize: 14,
    right: 20, // Ajustez la position selon vos besoins
    top: 50, // Ajustez la position selon vos besoins
  },
  addButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
    marginVertical: 5,
    marginBottom: 100,
  },
  addButton: {
    backgroundColor: '#9155FD',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    flex: 1,
    margin: 5,
  },
  addButtonText: {
    color: '#ffffff',
    textAlign: 'center',
  },
});

export default Recap;
