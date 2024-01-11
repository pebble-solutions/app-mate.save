import React from 'react';
import Carousel from 'react-native-snap-carousel';
import WeekCard from '../cards/WeekCard';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 1;

const WeekCarousel = () => {
  // Tableau de jeux de données de semaines
  const weekDataArray = [
    {
      startDate: 'Lundi 9',
      endDate: 'Dimanche 15',
      totalWorkedHours: '24h15',
      totalOvertimeHours: '4h30',
      baseSalary: '$2000',
      numberOfTR: 7,
      overtimeRate: '20€/h',
    },
    {
      startDate: 'Lundi 16',
      endDate: 'Dimanche 22',
      totalWorkedHours: '27h45',
      totalOvertimeHours: '5h15',
      baseSalary: '$2100',
      numberOfTR: 6,
      overtimeRate: '22€/h',
    },
    {
      startDate: 'Lundi 23',
      endDate: 'Dimanche 29',
      totalWorkedHours: '26h30',
      totalOvertimeHours: '3h45',
      baseSalary: '$2150',
      numberOfTR: 8,
      overtimeRate: '21€/h',
    },
    {
      startDate: 'Lundi 30',
      endDate: 'Dimanche 5',
      totalWorkedHours: '28h00',
      totalOvertimeHours: '6h00',
      baseSalary: '$2200',
      numberOfTR: 5,
      overtimeRate: '23€/h',
    },
    {
      startDate: 'Lundi 6',
      endDate: 'Dimanche 12',
      totalWorkedHours: '29h15',
      totalOvertimeHours: '7h30',
      baseSalary: '$2250',
      numberOfTR: 7,
      overtimeRate: '25€/h',
    },
    // Ajoutez d'autres semaines de données ici...
  ];

    // Inverser l'ordre des données pour afficher la semaine la plus récente en premier
    const reversedData = [...weekDataArray];

    // Définir l'index initial sur la dernière semaine
    const initialIndex = weekDataArray.length - 1;

    const renderItem = ({ item }) => <WeekCard {...item} />;

    return (
        <Carousel
            data={reversedData} // Utilisez les données triées dans l'ordre inverse
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={itemWidth}
            firstItem={initialIndex} // Définir l'index initial sur la dernière semaine
        />
    );
};

export default WeekCarousel;