import React, { useState } from 'react';
import { View, Text, StyleSheet, useWindowDimensions, TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const WeekCard = ({ totalWorkedHours, totalOvertimeHours, baseSalary, numberOfTR, overtimeRate }) => {
    const totalOvertimePay = totalOvertimeHours * overtimeRate;
    const windowWidth = useWindowDimensions().width;

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const [datesValidated, setDatesValidated] = useState(false);

    const handleValidate = () => {
        if (selectedStartDate && selectedEndDate) {
            setDatesValidated(true);
        } else {
            // Gérer la validation échouée, par exemple en affichant un message d'erreur
        }
    };

    return (
        <View style={styles.cardContainer}>
            <View style={styles.dateSelection}>
                <DateTimePicker
                    value={selectedStartDate ? new Date(selectedStartDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            setSelectedStartDate(selectedDate.toISOString());
                        }
                    }}
                    textColor="#ffffff" // Couleur du texte en blanc
                    titleTextColor="#ffffff" // Couleur du titre en blanc
                />
                <DateTimePicker
                    value={selectedEndDate ? new Date(selectedEndDate) : new Date()}
                    mode="date"
                    display="default"
                    onChange={(event, selectedDate) => {
                        if (selectedDate) {
                            setSelectedEndDate(selectedDate.toISOString());
                        }
                    }}
                    theme={{
                        textColor: '#ffffff', // Couleur du texte en blanc
                        calendarBackground: 'transparent', // Fond transparent
                        backgroundColor: 'transparent', // Fond transparent
                    }}
                />
                <TouchableOpacity style={styles.validateButton} onPress={handleValidate}>
                    <Text style={styles.buttonText}>Valider</Text>
                </TouchableOpacity>
            </View>

            {datesValidated && (
                <>
                    <View style={styles.card}>


                        <Text style={styles.cardTitle}>Periode du {format(new Date(selectedStartDate), 'dd/MM/yyyy')} au {format(new Date(selectedEndDate), 'dd/MM/yyyy')}</Text>

                    </View>
                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Statistiques</Text>
                        <View style={{ marginLeft: -40 }}>
                            <LineChart
                                data={{
                                    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'], // Remplacez par les jours réels
                                    datasets: [
                                        {
                                            data: [6.6, 8, 7, 7, 7.6], // Remplacez ces données par les statistiques réelles
                                        },
                                    ],
                                }}
                                width={windowWidth - 20}
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
                </>
            )}
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
    dateSelection: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 10,
        marginBottom: 10,
    },
    dateInput: {
        flex: 1,
        backgroundColor: '#ffffff',
        marginRight: 10,
        borderRadius: 5,
        padding: 5,
    },
    validateButton: {
        backgroundColor: 'rgba(37,39,66,255)',
        padding: 10,
        borderRadius: 5,
    },
    buttonText: {
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default WeekCard;
