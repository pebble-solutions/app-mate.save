import React from "react";
import { TouchableOpacity, Text } from 'react-native';
import styleTunnel from "./styleTunnel";

const ButtonPrevNext = ({ onPress, buttonName }) => {
  return (
    <TouchableOpacity style={styleTunnel.button} onPress={onPress}>
      <Text style={styleTunnel.buttonText}>{buttonName}</Text>
    </TouchableOpacity>
  );
}

export default ButtonPrevNext;



