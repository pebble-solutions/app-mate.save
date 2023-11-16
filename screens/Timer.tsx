import React from 'react';
import { View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const Timer = () => {
  return (
    <LinearGradient
      colors={['#020716', '#1C4D69', '#EC8F7B', '#FF493E']}
      style={{
        width: 390,
        height: 844,
      }}
    >
      {/* Le dégradé est défini avec LinearGradient */}
    </LinearGradient>
  );
};

export default Timer;