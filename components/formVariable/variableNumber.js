import React, { useState } from "react";
import { View, Text, TextInput, Alert } from 'react-native';
import styleTunnel from "./styleTunnel";
import { set } from "date-fns";

const ResponseNumber = ({ varNumber }) => {
  console.log(varNumber, 'varNumber');
  const [response, setResponse] = React.useState({'id': varNumber._id, 'label': varNumber.label, 'value': ''  })
    console.log(response, ' response')  
handleChange = (number) => {
    if ((number >= varNumber.min_value ) && (number <= varNumber.max_value)){
        setResponse(prev => ({...prev, value: number}))
    }
    else
    Alert.alert('Veuillez saisir un nombre compris entre ' + varNumber.min_value + ' et ' + varNumber.max_value)  

    }
  

  return (
    <View style={styleTunnel.numericInputContainer}>
      <Text>
        {varNumber.question}
      </Text>
      <TextInput
        style={styleTunnel.input}
        placeholder="Saisissez un nombre"
        placeholderTextColor={styleTunnel.placeholderTextColor}
        
        keyboardType="numeric"
        inputMode="numeric"
        value={response.value}
        onChangeText={(number) => handleChange(number)}
      />
    
    </View>
  );
}

export default ResponseNumber;
