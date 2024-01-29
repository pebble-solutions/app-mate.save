import React, { useState } from "react";
import { View, Text, TextInput } from 'react-native';
import styleTunnel from "./styleTunnel";

const ResponseNumber = ({ varNumber }) => {
  console.log(varNumber, 'varNumber')
  const [numericValue, setNumericValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (text) => {
    if (/^\d+$/.test(text) || text === "") {
      setNumericValue(text);
      onValueChange(text);
      setErrorMessage(""); 
    } else {
      setErrorMessage("Veuillez saisir un nombre valide.");
    }
  };

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
        value={numericValue}
        onChangeText={handleInputChange}
      />
      {errorMessage !== "" && (
        <Text style={styleTunnel.errorMessage}>{errorMessage}</Text>
      )}
    </View>
  );
}

export default ResponseNumber;
