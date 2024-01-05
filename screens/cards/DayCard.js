
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DayCard = ({ date, morningCheckIn, afternoonCheckIn, workedHours }) => {

  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>{date}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
  },
  cardTitle: {
  },

});

export default DayCard;
