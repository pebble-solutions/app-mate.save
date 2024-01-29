import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styleTunnel from './styleTunnel';

const ResponseDate = ({ onDateChange, varDate }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (date) => {
    if (Platform.OS === 'android') {
      setShowDatePicker(false);
    }

    if (date !== undefined) {
      setSelectedDate(date);
      onDateChange(date);
    }
  };

  const showDatepicker = () => {
    setShowDatePicker(true);
  };

  return (
    <View>
        <Text>
            {varDate.question}
        </Text>
    <View style={styleTunnel.input}>
      <Text style={styleTunnel.dateInputLabel}>Sélectionnez une date :</Text>
      <TouchableOpacity onPress={showDatepicker}>
        <Text style={styleTunnel.dateText}>
          {selectedDate.toLocaleDateString('fr-FR', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
          })}
        </Text>
      </TouchableOpacity>

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="spinner"  
          onChange={handleDateChange}
        />
      )}
    </View>
    </View>
  );
};

export default ResponseDate;