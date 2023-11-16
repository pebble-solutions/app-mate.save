import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgSun from './SVG/SvgSun';
import SvgMountains from './SVG/SvgMountains';

const Timer = () => {
  const [isChronometerStarted, setIsChronometerStarted] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval;

    if (isChronometerStarted && !isPaused) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds + 1);

        if (seconds === 59) {
          setMinutes((prevMinutes) => prevMinutes + 1);
          setSeconds(0);

          if (minutes === 59) {
            setHours((prevHours) => prevHours + 1);
            setMinutes(0);
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isChronometerStarted, isPaused, seconds, minutes, hours]);

  const startChronometer = () => {
    if (!isChronometerStarted) {
      setIsChronometerStarted(true);
      setIsPaused(false);
      setHours(0);
      setMinutes(0);
      setSeconds(0);
    } else {
      setIsPaused(!isPaused);
    }
  };

  return (
    <LinearGradient
      colors={['#020716', '#1C4D69', '#EC8F7B', '#FF493E']}
      style={styles.container}
    >
      <View style={styles.mountainsContainer}>
        <SvgMountains />
      </View>
      <TouchableOpacity
        onPress={() => startChronometer()}
        style={styles.circleContainer}
      >
        <SvgSun />
      </TouchableOpacity>
      <View style={styles.chronometerContainer}>
        <Text style={[styles.chronometerText, isPaused ? { opacity: 0.5 } : null]}>
          {`${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 390,
    height: 844,
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
    top: 230,
    right: 8,
  },
  chronometerContainer: {
    position: 'absolute',
    top: 50,
    left: 0,
    width: '100%',
    height: 50,
    padding: 10,
  },
  chronometerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default Timer;
