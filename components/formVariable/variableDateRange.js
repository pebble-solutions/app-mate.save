import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import styleTunnel from './styleTunnel';

const ResponseDateRange = ({ onDateRangeChange, varDateRange }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  const handleStartDateChange = (date) => {
    if (Platform.OS === 'android') {
      setShowStartDatePicker(false);
    }

    if (date !== undefined) {
      setStartDate(date);
      onDateRangeChange(startDate, date);
    }
  };

  const handleEndDateChange = (date) => {
    if (Platform.OS === 'android') {
      setShowEndDatePicker(false);
    }

    if (date !== undefined) {
      setEndDate(date);
      onDateRangeChange(startDate, date);
    }
  };

  const showStartDatepicker = () => {
    setShowStartDatePicker(true);
  };

  const showEndDatepicker = () => {
    setShowEndDatePicker(true);
  };

  return (
    <View>
      <Text>{varDateRange.question}</Text>
      <View style={styleTunnel.input}>
        <Text style={styleTunnel.dateInputLabel}>
          Sélectionnez une date de début :
        </Text>
        <TouchableOpacity onPress={showStartDatepicker}>
          <Text style={styleTunnel.dateText}>
            {startDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {showStartDatePicker && (
          <DateTimePicker
            value={startDate}
            mode="date"
            display="spinner"
            onChange={handleStartDateChange}
          />
        )}

        <Text style={styleTunnel.dateInputLabel}>
          Sélectionnez une date de fin :
        </Text>
        <TouchableOpacity onPress={showEndDatepicker}>
          <Text style={styleTunnel.dateText}>
            {endDate.toLocaleDateString('fr-FR', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </Text>
        </TouchableOpacity>

        {showEndDatePicker && (
          <DateTimePicker
            value={endDate}
            mode="date"
            display="spinner"
            onChange={handleEndDateChange}
          />
        )}
      </View>
    </View>
  );
};

export default ResponseDateRange;
