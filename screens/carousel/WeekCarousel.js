import React from 'react';
import Carousel from 'react-native-snap-carousel';
import WeekCard from '../cards/WeekCard'; // Importez le composant WeekCard au lieu de DayCard
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 1;

const WeekCarousel = () => {
  // Jeu de données pour la première semaine
  const weekData1 = {
    startDate: 'Lundi 9',
    endDate: 'Dimanche 15',
    totalWorkedHours: '24h15',
    totalOvertimeHours: '4h30',
    baseSalary: '$2000',
    numberOfTR: 7,
    overtimeRate: '20€/h',
  };

  // Jeu de données pour la deuxième semaine
  const weekData2 = {
    startDate: 'Lundi 16',
    endDate: 'Dimanche 22',
    totalWorkedHours: '27h45',
    totalOvertimeHours: '5h15',
    baseSalary: '$2100',
    numberOfTR: 6,
    overtimeRate: '22€/h',
  };

  // Tableau de jeux de données de semaine
  const testWeekData = [weekData1, weekData2];

  const renderItem = ({ item }) => <WeekCard {...item} />; // Utilisez WeekCard au lieu de DayCard

  return (
    <Carousel
      data={testWeekData}
      renderItem={renderItem}
      sliderWidth={screenWidth}
      itemWidth={itemWidth}
    />
  );
};

export default WeekCarousel;
