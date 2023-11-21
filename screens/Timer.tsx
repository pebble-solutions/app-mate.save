import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgSun from './SVG/SvgSun';
import SvgMountains from './SVG/SvgMountains';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timer: FC = () => {
  const [pressTimes, setPressTimes] = useState<Date[]>([]);

  useEffect(() => {
    const loadPressTimes = async () => {
      try {
        const storedPressTimes = await AsyncStorage.getItem('pressTimes');
        if (storedPressTimes) {
          const times = JSON.parse(storedPressTimes).map((time: string) => new Date(time));
          setPressTimes(times);
        }
      } catch (error) {
        console.error("Erreur lors du chargement des heures depuis AsyncStorage :", error);
      }
    };
    loadPressTimes();
  }, []);

  const onPressSun = async () => {
    const currentTime = new Date();
    const updatedPressTimes = [...pressTimes, currentTime];
    try {
      const timesToStore = JSON.stringify(updatedPressTimes.map(time => time.toISOString()));
      await AsyncStorage.setItem('pressTimes', timesToStore);
      setPressTimes(updatedPressTimes);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des heures dans AsyncStorage :", error);
    }
  };

  const clearPressTimes = async () => {
    try {
      await AsyncStorage.removeItem('pressTimes');
      setPressTimes([]);
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);
    }
  };

  const onValidatePress = () => {
    // Votre logique ici
  };

  const renderItem = ({ item, index }: { item: Date; index: number }) => (
    <Text style={styles.lastPressTimeText}>
      Clic {index + 1} : {item.toLocaleTimeString()}
    </Text>
  );

  return (
    <LinearGradient
      colors={['#020716', '#1C4D69', '#EC8F7B', '#FF493E']}
      style={styles.container}
    >
      <View style={styles.mountainsContainer}>
        <SvgMountains />
      </View>
      <TouchableOpacity
        onPress={onPressSun}
        style={styles.circleContainer}
      >
        <SvgSun />
      </TouchableOpacity>
      
      {/* Utilisation de FlatList pour afficher la liste des clics */}
      <FlatList
        data={pressTimes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
      />

       {/* Bouton "Valider" */}
       <TouchableOpacity
        onPress={onValidatePress}
        style={[styles.button, styles.validateButton]}
      >
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>

      {/* Votre bouton "Annuler" existant */}
      <TouchableOpacity
        onPress={clearPressTimes}
        style={[styles.button, styles.clearButton]}
      >
        <Text style={styles.buttonText}>Annuler</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mountainsContainer: {
    position: 'absolute',
    bottom: -3,
    width: '100%',
  },
  circleContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    top: '29%',
  },
  listContainer: {
    position: 'absolute',
    top: 100,
    left: 20,
    right: 20,
    maxHeight: '100%', // Ajustez la hauteur maximale si nécessaire
    padding: 10,
  },
  lastPressTimeText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  button: {
    position: 'relative',
    padding: 10,
    borderRadius: 20,
    width: 80,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  clearButton: {
    right: 135, // Positionnement sur le côté opposé
    top: 270, // Positionnement en haut
    backgroundColor: '#FF0000', // Couleur rouge pour le bouton "Annuler"
  
  },
  validateButton: {
    right: -135, // Positionnement sur le côté opposé
    top: 307, // Positionnement en haut
    backgroundColor: '#0000FF', // Couleur bleue pour le bouton "Valider"
  },
});

export default Timer;
