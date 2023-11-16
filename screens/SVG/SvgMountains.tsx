
import React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop, ClipPath, Rect } from 'react-native-svg';

const SvgMountains: React.FC = () => {
  return (
    <Svg width="395" height="240" viewBox="0 0 395 240" fill="none">
      <Defs>
        <LinearGradient id="paint0_linear_241_8960" x1="-19355" y1="0" x2="-19355" y2="23865.9">
          <Stop stopColor="#272F46" />
          <Stop offset="1" />
        </LinearGradient>
        <LinearGradient id="paint1_linear_241_8960" x1="-19298.6" y1="8290.87" x2="-35492.5" y2="30118.3">
          <Stop stopColor="#242B42" />
          <Stop offset="0.182573" stopColor="#181D2D" />
          <Stop offset="1" />
        </LinearGradient>
        <LinearGradient id="paint2_linear_241_8960" x1="19750" y1="13.9414" x2="19750" y2="22485.9">
          <Stop stopColor="#1C2337" />
          <Stop offset="0.171363" stopColor="#1C2337" />
          <Stop offset="0.174345" stopColor="#1C2337" />
          <Stop offset="1" />
        </LinearGradient>
        <LinearGradient id="paint3_linear_241_8960" x1="17979.1" y1="7661.97" x2="18568.9" y2="14151.2">
          <Stop stopColor="#080E1F" />
          <Stop offset="1" />
        </LinearGradient>
        <ClipPath id="clip0_241_8960">
          <Rect width="395" height="240" fill="white" />
        </ClipPath>
      </Defs>
      <Path fillRule="evenodd" clipRule="evenodd" d="M393.849 238.659H0V0.0248104C40.2511 14.4751 70.0148 19.2108 89.2913 14.2319C118.206 6.76344 141.816 8.40882 184.387 14.2319C226.958 20.0549 254.799 5.39812 268.431 14.2319C277.519 20.121 305.44 15.3771 352.196 0L395 25.7755L393.849 238.659Z" fill="url(#paint0_linear_241_8960)" />
      {/* Autres Path */}
    </Svg>
  );
};

export default SvgMountains;
