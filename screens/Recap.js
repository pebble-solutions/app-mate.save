import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import DayCarousel from './carousel/DayCarousel';

const Recap = () => {
  const [selectedButton, setSelectedButton] = useState('jour'); // Le bouton 'jour' est sélectionné par défaut

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Récapitulatif</Text>
        <Text style={styles.subtitle}>John Doe</Text>
        <View style={styles.buttonGroup}>
          {/* Les boutons 'jour', 'semaine', 'mois', et 'periode' */}
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
        <DayCarousel />
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
    paddingBottom: 20,
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
  buttonText: {
    fontWeight: 'bold',
  },
  content: {},
});

export default Recap;
