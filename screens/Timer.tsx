import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgSun from './SVG/SvgSun';
import SvgMountains from './SVG/SvgMountains';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timer: FC = () => {
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
    const newPressTime = { time: currentTime, label: "" };
    const updatedPressTimes = [...pressTimes, newPressTime];
    setPressTimes(updatedPressTimes);
    await savePressTimes(updatedPressTimes);  // Sauvegarde des nouvelles données
  };

  const savePressTimes = async (times: { time: Date; label: string }[]) => {
    try {
      const timesToStore = JSON.stringify(times);
      await AsyncStorage.setItem('pressTimes', timesToStore);
    } catch (error) {
      console.error("Erreur lors de la sauvegarde des heures dans AsyncStorage :", error);
    }
  };

  useEffect(() => {
    const updatedPressTimes = pressTimes.map((item, index, array) => {
      if (index === 0) {
        return { ...item, label: "Début d'activité" };
      } else if (index % 2 === 1 && index !== array.length - 1) {
        return { ...item, label: "Pause" };
      } else if (index % 2 === 0) {
        return { ...item, label: "Reprise" };
      } else {
        return { ...item, label: "Arrêt de l'activité" };
      }
    });

    if (updatedPressTimes.some((item, index) => item.label !== pressTimes[index]?.label)) {
      setPressTimes(updatedPressTimes);
    }
  }, [pressTimes]);

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

  const renderItem = ({ item, index }: { item: { time: Date; label: string }; index: number }) => (
    <View style={styles.listItem}>
      <View style={styles.timeline}>
        {/* Afficher verticalLine seulement si ce n'est ni le premier ni le dernier élément */}
        {index !== 0 && index !== pressTimes.length - 1 && <View style={styles.verticalLine} />}
        
        {/* Logique existante pour afficher le cercle */}
        {index === 0 ? (
          <View style={styles.largeCircleBorder}>
         
          </View>
        ) : item.label === "Arrêt de l'activité" ? (
          <View style={styles.largeCircleFilled} />
        ) : (
          <View style={styles.smallCircleFilled} />
        )}
      </View>
      <View style={styles.labelContainer}>
      <Text style={[styles.labelText, item.label === "Pause" || item.label === "Reprise" ? styles.opaqueLabel : null]}>
        {item.label}
      </Text>
    </View>
      <View style={styles.timeContainer}>
        <Text style={styles.timeText}>{item.time.toLocaleTimeString()}</Text>
      </View>
      {/* Afficher lastItemLine seulement si c'est le dernier élément et la longueur de pressTimes est >= 2 */}
      {index === pressTimes.length - 1 && pressTimes.length >= 2 && <View style={styles.lastItemLine} />}
    </View>
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

      <FlatList
        data={pressTimes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
      />

      <TouchableOpacity
        onPress={onValidatePress}
        style={[styles.button, styles.validateButton]}
      >
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>

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
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  timeline: {
    alignItems: 'center',
  },
  verticalLine: {
    width: 1,
    height: 25,
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    bottom: 3,
  },
  largeCircleBorder: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 3,
    borderColor: 'white',
    right: 2
  },
  lastItemLine: {
    width: 1,
    height: 22,
    backgroundColor: 'white', // Couleur de la ligne pour le dernier élément
    position: 'absolute',
    zIndex: 1,
    bottom: 12,
    left: 4,
  },
  largeCircleFilled: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: 'white',
    right: 3,
  },
  smallCircleFilled: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'white',
    left: 0,
  },
  labelContainer: {
    marginLeft: 10,
  },
  labelText: {
    color: 'white',
    fontSize: 16,
  },
  opaqueLabel: {
    opacity: 0.7,
  },
  timeContainer: {
    marginLeft: 'auto',
  },
  timeText: {
    color: 'white',
    fontSize: 16,
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
