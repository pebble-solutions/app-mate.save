// SvgCircle.tsx
import React from 'react';
import Svg, { Circle, Defs, RadialGradient, Stop } from 'react-native-svg';

const svgSun: React.FC = () => {
  return (
    <Svg height="200" width="200">
      <Defs>
        <RadialGradient id="grad" cx="50%" cy="50%" rx="50%" ry="50%">
          <Stop offset="0%" stopColor="white" />
          <Stop offset="65%" stopColor="#FC8E58" />
          <Stop offset="100%" stopColor="#D00A0A" />
        </RadialGradient>
      </Defs>
      <Circle cx="50%" cy="50%" r="40%" fill="url(#grad)" />
    </Svg>
  );
};

export default svgSun;
