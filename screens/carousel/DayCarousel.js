import React from 'react';
import Carousel from 'react-native-snap-carousel';
import DayCard from '../cards/DayCard';
import { Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const itemWidth = screenWidth * 1;



const convertTimeToMinutes = (time) => {
    const [hours, minutes] = time.split('h').map(Number);
    return hours * 60 + minutes;
};

const calculateDuration = (startTime, endTime) => {
    return endTime - startTime;
};

const calculateWorkedHours = (morningCheckIn, morningBreak, afternoonBreak, afternoonCheckIn) => {
    // Convertir les heures en minutes
    const morningCheckInMinutes = convertTimeToMinutes(morningCheckIn);
    const [morningBreakStart, morningBreakEnd] = morningBreak.split(' - ').map(convertTimeToMinutes);
    const [afternoonBreakStart, afternoonBreakEnd] = afternoonBreak.split(' - ').map(convertTimeToMinutes);
    const afternoonCheckInMinutes = convertTimeToMinutes(afternoonCheckIn);

    // Calculer la durée travaillée le matin et l'après-midi
    const morningWorkDuration = calculateDuration(morningCheckInMinutes, morningBreakStart);
    const morningBreakDuration = calculateDuration(morningBreakStart, morningBreakEnd);
    const afternoonWorkDuration = calculateDuration(afternoonBreakEnd, afternoonCheckInMinutes);
    const afternoonBreakDuration = calculateDuration(afternoonBreakStart, afternoonBreakEnd);

    // Calculer le total
    const totalMinutesWorked = morningWorkDuration + afternoonWorkDuration - morningBreakDuration - afternoonBreakDuration;

    // Convertir le total en heures et minutes
    const hours = Math.floor(totalMinutesWorked / 60);
    const minutes = totalMinutesWorked % 60;

    return `${hours}h${minutes}`;
};

const DayCarousel = () => {
    // Données fictives avec des pauses
    const testDaysData = [
        {
            date: 'Lundi 9',
            morningCheckIn: '8h30',
            morningBreak: '10h30 - 10h45', // Pause du matin
            afternoonCheckIn: '14h00',
            afternoonBreak: '16h00 - 16h15', // Pause de l'après-midi
            workedHours: '5h30',
        },
        {
            date: 'Mardi 10',
            morningCheckIn: '9h00',
            morningBreak: '11h00 - 11h15',
            afternoonCheckIn: '13h00',
            afternoonBreak: '15h00 - 15h15',
            workedHours: '4h00',
        },
        {
            date: 'Mercredi 11',
            morningCheckIn: '9h15',
            morningBreak: '11h15 - 11h30',
            afternoonCheckIn: '13h30',
            afternoonBreak: '15h30 - 15h45',
            workedHours: '4h15',
        },
        // Vous pouvez ajouter d'autres enregistrements ici...
    ];
 // Inverser l'ordre des données pour afficher la carte la plus récente en premier
 const reversedData = [...testDaysData];

 // Calculer les heures travaillées pour chaque jour
 reversedData.forEach(day => {
     day.workedHours = calculateWorkedHours(
         day.morningCheckIn, day.morningBreak, day.afternoonBreak, day.afternoonCheckIn
     );
 });

 // Définir l'index initial sur la dernière carte
 const initialIndex = testDaysData.length - 1;

 const renderItem = ({ item }) => <DayCard {...item} />;

 return (
     <Carousel
         data={reversedData} // Utilisez les données inversées
         renderItem={renderItem}
         sliderWidth={screenWidth}
         itemWidth={itemWidth}
         firstItem={initialIndex} // Définir l'index initial sur la dernière carte
     />
 );
};

export default DayCarousel;