import React from "react";
import { View, TextInput, Text } from 'react-native';
import styleTunnel from "./styleTunnel";

const ResponseTextArea = ({ varTextArea }) => {
    const [response, setResponse] = React.useState({'id': varTextArea._id, 'label': varTextArea.label, 'value': ''  })
  console.log (varTextArea, 'varTextArea')
    console.log(response, ' response')
  
  
  return (
        <View>
          <Text>
            {varTextArea.question}
          </Text>
          <TextInput
            style={styleTunnel.input}
            placeholder="Saisissez votre réponse ici"
            placeholderTextColor={styleTunnel.placeholderTextColor}
            multiline={true}
            // numberOfLines={5}
            onChangeText={(text) => setResponse(prev => ({...prev, value: text}))}
          />
        </View>
  );
}

export default ResponseTextArea;

