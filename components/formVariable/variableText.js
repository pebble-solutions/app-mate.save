import React from "react";
import { View, TextInput,Text } from 'react-native';
import styleTunnel from './styleTunnel';

const ResponseText = ({ varText }) => {
    console.log(varText, ' varText')
    const [response, setresponse]= React.useState({ id: varText._id, label: varText.label, value: ''})
//   const showFileUpload = varText.file_upload_enabled && varText.comment_enabled && varText.comment_required;
console.log(response, ' response')
  return (
    <View>
     
        <Text>
            {varText.question}
        </Text>
        <TextInput
          style={styleTunnel.input}
          placeholder="Saisissez votre réponse ici "
          placeholderTextColor={styleTunnel.placeholderTextColor}
    
          value={response.value}
          onChangeText={(text) => {setresponse({id: varText._id , label: varText.label, value: text})}}
        />
      
    </View>
  );
}

export default ResponseText;

