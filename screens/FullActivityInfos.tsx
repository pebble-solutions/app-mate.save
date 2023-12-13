import React from 'react';
import { View, Text } from 'react-native';
import moment from 'moment';

const ActivityCard = ({ activity }) => {
  return (
    <View style={{ backgroundColor: activity.color, ...styles.activityItem }}>
      <Text style={styles.activityName}>{activity.label}</Text>
      <Text style={styles.activityContent}>Créé le {moment(activity.start).format('DD.MM.YYYY')}</Text>
    </View>
  );
};

// Vous pouvez réutiliser les styles existants de votre code initial
const styles = {
  activityItem: {
    width: '48.5%', // Ajustez selon votre mise en page
    marginBottom: 10,
    height: 120,
    padding: 10,
    borderRadius: 10,
  },
  activityName: {
    color: '#ffffff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  activityContent: {
    color: '#ffffff',
    fontSize: 12,
    marginVertical: 5,
    textAlign: 'center',
  }
};

export default ActivityCard;
