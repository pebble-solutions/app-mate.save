import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const DayCard = ({ date, morningCheckIn, morningBreak, afternoonCheckIn, afternoonBreak, workedHours, overtimeHours, overtimeRate }) => {
    const overtimePay = overtimeHours * overtimeRate; // Calculer le paiement des heures supplémentaires

    return (
        <View style={styles.cardContainer}>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>{date}</Text>
                <Text style={styles.textWhite}>Check-in matin : {morningCheckIn}</Text>
                <Text style={styles.textWhite}>Pause matin : {morningBreak}</Text>
                <Text style={styles.textWhite}>Check-in après-midi : {afternoonCheckIn}</Text>
                <Text style={styles.textWhite}>Pause après-midi : {afternoonBreak}</Text>
                <Text style={styles.textWhite}>Heures travaillées : {workedHours}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Informations et variables de paie :</Text>
                <Text style={styles.textWhite}>Salaire de base : $2000</Text>
                <Text style={styles.textWhite}>Heures supplémentaires : {overtimeHours} heures</Text>
                <Text style={styles.textWhite}>Taux horaire des heures supplémentaires : ${overtimeRate}/h</Text>
                <Text style={styles.textWhite}>Total des heures supplémentaires : ${overtimePay}</Text>
                {/* Ajoutez d'autres variables de paie fictives ici */}
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Commentaires</Text>
                <Text style={styles.textWhite}>• Ceci est un commentaire sur cette journée.</Text>
                <Text style={styles.textWhite}>• Un autre commentaire fictif.</Text>
                {/* Ajoutez d'autres commentaires fictifs ici */}
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Pieces jointes</Text>
                <Text style={styles.textWhite}>• Ceci est une piece jointe sur cette journée.</Text>
                <Text style={styles.textWhite}>• Ceci est une piece jointe sur cette journée.</Text>
                <Text style={styles.textWhite}>• Ceci est une piece jointe sur cette journée.</Text>
        
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        // Style pour le conteneur global des cartes
    },
    card: {
        backgroundColor: 'rgba(37,39,66,255)', // Fond bleu foncé
        marginHorizontal: 10,
        marginVertical: 7,
        padding: 15,
        borderRadius: 10,
        color: '#ffffff', // Texte blanc
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
