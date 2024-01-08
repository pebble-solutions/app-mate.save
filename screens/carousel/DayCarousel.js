
import React, { useState } from 'react';
import Carousel from 'react-native-snap-carousel';
import DayCard from '../cards/DayCard';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 0.9; // Par exemple, 90% de la largeur de l'écran

const DayCarousel = () => {
    // const [daysData, setDaysData] = useState([
        
    // {
    //     date: 'Lundi 1er',
    //     morningCheckIn: '9h00',
    //     afternoonCheckIn: '13h00',
    //     workedHours: '4h00',
    //   },
    //   {
    //     date: 'Mardi 2',
    //     morningCheckIn: '9h00',
    //     afternoonCheckIn: '13h00',
    //     workedHours: '4h00',
    //   },
    //   {
    //     date: 'Mercredi 3',
    //     morningCheckIn: '9h00',
    //     afternoonCheckIn: '13h00',
    //     workedHours: '4h00',
    //   },
    //   {
    //     date: 'Jeudi 4',
    //     morningCheckIn: '9h00',
    //     afternoonCheckIn: '13h00',
    //     workedHours: '4h00',
    //   },
    //   {
    //     date: 'Vendredi 5',
    //     morningCheckIn: '9h00',
    //     afternoonCheckIn: '13h00',
    //     workedHours: '4h00',
    //   },
    //   {
    //     date: 'Samedi 6',
    //     morningCheckIn: '9h00',
    //     afternoonCheckIn: '13h00',
    //     workedHours: '4h00',
    //   },
    //   {
    //     date: 'Dimanche 7',
    //     morningCheckIn: '9h00',
    //     afternoonCheckIn: '13h00',
    //     workedHours: '4h00',
    //   },
    // ]);

    // Pour le test, utilisons un tableau avec un seul élément
    const testDaysData = [{
        date: 'DD de la session',
        morningCheckIn: 'Test Morning',
        afternoonCheckIn: 'Test Afternoon',
        workedHours: 'Test Hours',
    }];

    const renderItem = ({ item }) => <DayCard {...item} />;

    return (
        <Carousel
            data={testDaysData}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={itemWidth}
        />
    );
};

export default DayCarousel;