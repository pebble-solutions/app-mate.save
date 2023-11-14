import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const App = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      setTimeout(() => {
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }).start();
      }, 2000);
    });
  }, [fadeAnim]);

  return (
      <View style={styles.container}>
        <LinearGradient
          colors={['#0f0c29', '#302b63']}
          style={styles.linearGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          angle={45}
          useAngle={true}
        />
        <Animated.Image
          source={require('./assets/img/MateAppLogos/rsz_1matelogowhite.png')}
          style={[
            styles.logo,
            { opacity: fadeAnim }
          ]}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  linearGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  logo: {
    width: 200,
    height: 80,
  },
});

export default App;
