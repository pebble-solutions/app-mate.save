import React from 'react';
import { View, Text, StyleSheet, useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const WeekCard = ({ startDate, endDate, totalWorkedHours, totalOvertimeHours, baseSalary, numberOfTR, overtimeRate }) => {
    const totalOvertimePay = totalOvertimeHours * overtimeRate;
    const windowWidth = useWindowDimensions().width;

    return (
        <View style={styles.cardContainer}>
           
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Du {startDate} au {endDate}</Text>
                <Text style={styles.textWhite}>Heures travaillées cette semaine : {totalWorkedHours}</Text>
            </View>
            <View style={styles.card}>
                <Text style={styles.cardTitle}>Statistiques</Text>
                <View style={{ marginLeft: -40 }}>
                    <LineChart
                        data={{
                            labels: ['1-7', '8-14', '15-21', '22-28', '29-31'], // Remplacez ces données par les statistiques réelles
                            datasets: [
                                {
                                    data: [0, 0, 7.2, 8.5, 6.8, 9.1, 7.4, 0, 0, 6.7, 7.9, 6.3, 8.8, 9.5, 7.1, 0, 0, 8.2, 7.6, 6.4, 9.3, 8.7, 0, 0, 6.9, 8.4, 7.7, 6.6, 9.2, 7.8, 0]

                                },
                            ],
                        }}
                        width={windowWidth - 10}
                        height={170}
                        yAxisLabel={' '}
                        chartConfig={{
                            backgroundGradientFromOpacity: 0, // Supprime le fond
                            backgroundGradientToOpacity: 0, // Supprime le fond
                            decimalPlaces: 0,
                            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                            style: {
                                borderRadius: 16,
                            },
                        }}
                    />
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Informations de paie :</Text>
                <Text style={styles.textWhite}>Salaire de base : ${baseSalary}</Text>
                <Text style={styles.textWhite}>Nombre de TR : {numberOfTR}</Text>
                <Text style={styles.textWhite}>Heures supplémentaires cette semaine : {totalOvertimeHours} heures</Text>
                <Text style={styles.textWhite}>Taux horaire des heures supplémentaires : ${overtimeRate}/h</Text>
                <Text style={styles.textWhite}>Total des heures supplémentaires : ${totalOvertimePay}</Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Commentaires :</Text>
                <Text style={styles.textWhite}>• Commentaire sur la semaine : Lorem ipsum dolor sit amet.</Text>
                <Text style={styles.textWhite}>• Un autre commentaire sur la semaine : Consectetur adipiscing elit.</Text>
            
            </View>

            <View style={styles.card}>
                <Text style={styles.cardTitle}>Pièces jointes :</Text>
                <Text style={styles.textWhite}>• Pièce jointe 1</Text>
                <Text style={styles.textWhite}>• Pièce jointe 2</Text>
                <Text style={styles.textWhite}>• Pièce jointe 3</Text>
               
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
        fontSize: 14,
        color: '#ffffff', // Texte blanc
        marginBottom: 10,
    },
    textWhite: {
        color: '#ffffff', // Texte blanc
        fontSize: 12,
    },
});

export default WeekCard;
