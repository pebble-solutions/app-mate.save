import React from 'react';  // Importe la librairie React
import { StyleSheet, Text, TouchableOpacity } from 'react-native';  // Importe des composants React Native (View, Text, TouchableOpacity, ScrollView)

const ChangeView = () => {
    console.log('Le bouton a été pressé , faut changer la couleur et la route!', styles.RecapButton.backgroundColor);
    
  }

interface RecapButtonProps {
    buttonLabel: string;
    focused?: boolean;
  }

  const RecapButton: React.FC<RecapButtonProps> = ({ buttonLabel }) => (
    <TouchableOpacity key={buttonLabel} style={styles.RecapButton} onPress={ChangeView}>
      <Text style={styles.RecapButtonText}>{buttonLabel.toUpperCase()}</Text>
    </TouchableOpacity>
  );
  const styles = StyleSheet.create({
    RecapButton: {
      backgroundColor: '#9155fd',
      borderRadius: 17,
      padding: 10,
      margin: 5,
    },
  
    RecapButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      textAlign: 'center',
    },
  });

export default RecapButton;
    