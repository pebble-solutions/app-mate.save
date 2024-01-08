import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DayCard = ({ date, morningCheckIn, afternoonCheckIn, workedHours }) => {
    return (
        <View style={styles.card}>
            <Text style={styles.cardTitle}>{date}</Text>
            {/* Affichez les autres propriétés pour tester */}
            <Text style={styles.textWhite}>{morningCheckIn}</Text>
            <Text style={styles.textWhite}>{afternoonCheckIn}</Text>
            <Text style={styles.textWhite}>{workedHours}</Text>
        </View>
    );
};

const styles = StyleSheet.create({

    card: {
        backgroundColor: 'rgba(37,39,66,255)', // Fond bleu foncé transparent à 30%
        margin: 10,
        padding: 15,
        borderRadius: 15,
        color: '#ffffff', // Texte blanc
        // Autres styles pour les cartes
    },
    cardTitle: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 16,
        color: '#ffffff', // Texte blanc
        marginBottom: 10,
    },
    textWhite: {
        color: '#ffffff', // Texte blanc
    },


});
export default DayCard;
