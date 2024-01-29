import React, { useState } from "react";
import { Switch as RNSwitch, View, Text } from 'react-native';
import styleTunnel from "./styleTunnel";

const ResponseBoolean = ({ onSwitchChange, isRequired, varBoolean }) => {
  console.log(varBoolean, 'varBoolean')
  const [isEnabled, setIsEnabled] = useState(isRequired);
  const [displayText, setDisplayText] = useState("Non");

  const toggleSwitch = () => {
    setIsEnabled(!isEnabled);
    onSwitchChange(!isEnabled);
    setDisplayText(isEnabled ? "Non" : "Oui");
  };

  return (
    <View>
      <Text>
        {varBoolean.question}
      </Text>
      <View style={styleTunnel.switchContainer}>
        <Text style={styleTunnel.switchLabel}>{displayText}</Text>
        <RNSwitch
          trackColor={{false: '#767577', true: '	#90EE90'}}
          thumbColor={isEnabled ? '#7FFF00' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>
    </View>
  );
}

export default ResponseBoolean;