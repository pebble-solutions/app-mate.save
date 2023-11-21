import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgSun from './SVG/SvgSun';
import SvgMountains from './SVG/SvgMountains';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timer: FC = () => {
  // Modification : stockage des temps avec leurs libellés
  const [pressTimes, setPressTimes] = useState<{ time: Date; label: string }[]>([]);

  useEffect(() => {
    const loadPressTimes = async () => {
      try {
        const storedPressTimes = await AsyncStorage.getItem('pressTimes');
        if (storedPressTimes) {
          const times = JSON.parse(storedPressTimes).map(({ time, label }: { time: string; label: string }) => ({ time: new Date(time), label }));
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
    // Ajouter le nouveau clic sans définir le libellé pour le moment
    setPressTimes([...pressTimes, { time: currentTime, label: "" }]);
  };
  
  useEffect(() => {
    // Mettre à jour les libellés une fois que pressTimes est mis à jour
    const updatedPressTimes = pressTimes.map((item, index, array) => {
      if (index === 0) {
        return { ...item, label: "Début d'activité" };
      } else if (index % 2 === 1 && index !== array.length - 1) {
        return { ...item, label: "Pause" };
    } else if (index % 2 === 0) {
        return { ...item, label: "Reprise" };
      }
      else {
        return { ...item, label: "Fin d'activité" };
      }
    });
  
    // Vérifier si la mise à jour est nécessaire
    if (updatedPressTimes.some((item, index) => item.label !== pressTimes[index]?.label)) {
      setPressTimes(updatedPressTimes);
    }
  }, [pressTimes]); // Dépend de pressTimes
  
  
  
  
  
  

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

  const renderItem = ({ item }: { item: { time: Date; label: string }; index: number }) => (
    <Text style={styles.lastPressTimeText}>
      {item.label} : {item.time.toLocaleTimeString()}
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

      {/* Bouton "Annuler" */}
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
    maxHeight: '100%',
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
    right: 135,
    top: 270,
    backgroundColor: '#FF0000',
  },
  validateButton: {
    right: -135,
    top: 307,
    backgroundColor: '#0000FF',
  },
});

export default Timer;
