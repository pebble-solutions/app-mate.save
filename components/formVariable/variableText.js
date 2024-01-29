import React from "react";
import { View, TextInput,Text } from 'react-native';
import styleTunnel from './styleTunnel';

const ResponseText = ({ varText }) => {
    const[response, setResponse] = React.useState({'id': varText._id, 'label': varText.label, 'value': ''  })   
    console.log(varText, ' varText')
    console.log(response, ' response')
    
    
  return (
    <View>
     
        <Text>
            {varText.question}
        </Text>
        <Text>{response.value}</Text>
        <TextInput
          style={styleTunnel.input}
          placeholder="Saisissez votre réponse ici "
          placeholderTextColor={styleTunnel.placeholderTextColor}
    
          value={response.value}
          onChangeText={(text) => setResponse(prev => ({...prev, value: text}))} 
        />
      
    </View>
  );
}

export default ResponseText;

