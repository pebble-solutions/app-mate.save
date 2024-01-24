import {Heading} from '@gluestack-ui/themed';
import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal, ScrollView, Switch, TextInput, Alert } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgSun from './SVG/SvgSun';
import SvgMountains from './SVG/SvgMountains';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { calculateDiffDate } from '../js/date';
import RenderComponentsVariables from '../components/renderComponentsVariables';
import { set } from 'date-fns';

const Timer: FC = () => {
    const [pressTimes, setPressTimes] = useState<{
        time: Date;
        label: string;
    }[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [modalData, setModalData] = useState<{
        index: number;
        time: Date;
        label: string;
    }[]>([]);
    const [contentVisible, setContentVisible] = useState<boolean>(true);
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    const inputAccessoryViewID = 'uniqueID';
    const initialText = '';
    const [text, setText] = useState(initialText);
    const [selectedActivity, SetSelectedActivity ] = useState({label: 'Pebble Mate', _id:'01HMTW2SA105GFRZ88FFYYDC6G', description:'test validation session'});
    const [associatedVariables, SetAssociatedVariables] = useState([]);
    const [recap, setRecap] = useState<{totalTime: string;numberBreak: number;}[]>([{totalTime: '', numberBreak: 0}]);
    const [tabPointage, setTabPointage] = useState<{time:Date; label: string;}[]>([])


        
    
    useEffect(() => {
        const loadPressTimes = async () => {
            try {
                const storedPressTimes = await AsyncStorage.getItem('pressTimes');
                if (storedPressTimes) {
                    const times = JSON.parse(storedPressTimes).map(({
                        time,
                        label
                    }: {
                        time: string;
                        label: string;
                    }) => ({
                        time: new Date(time),
                        label
                    }));
                    setPressTimes(times);
                }
            } catch (error) {
                console.error("Erreur lors du chargement des heures depuis AsyncStorage :", error);
            }
        };
        loadPressTimes();
    }, []);
    const onPressSun = async () => {
        const currentTime = new Date();
        const index = pressTimes.length + 1;
        const newPressTime = {
            time: currentTime,
            label: "",
            index: index
        };
        const updatedPressTimes = [...pressTimes, newPressTime];
        setPressTimes(updatedPressTimes);
        await savePressTimes(updatedPressTimes); // Sauvegarde des nouvelles données
    };
    
    const savePressTimes = async (times: {
        time: Date;
        label: string;
    }[]) => {
        try {
            const timesToStore = JSON.stringify(times);
            await AsyncStorage.setItem('pressTimes', timesToStore);
        } catch (error) {
            console.error("Erreur lors de la sauvegarde des heures dans AsyncStorage :", error);
        }
    };
    useEffect(() => {
        const updatedPressTimes = pressTimes.map((item, index, array) => {
            if (index === 0) {
                return {
                    ...item,
                    label: "Début d'activité"
                };
            } else if (index % 2 === 1 && index !== array.length - 1) {
                return {
                    ...item,
                    label: "Pause"
                };
            } else if (index % 2 === 0) {
                return {
                    ...item,
                    label: "Reprise"
                };
            } else {
                return {
                    ...item,
                    label: "Arrêt de l'activité"
                };
            }
        });
        if (updatedPressTimes.some((item, index) => item.label !== pressTimes[index]?.label)) {
            setPressTimes(updatedPressTimes);
        }
    }, [pressTimes]);
    const clearPressTimes = async () => {
        try {
            await AsyncStorage.removeItem('pressTimes');
            setPressTimes([]);
        } catch (error) {
            console.error("Erreur lors de la suppression des données :", error);
        }
    };

    // const fetchSelectedActivity = async () => {
    //     try {
    //         const response = await fetch(`https://api.pebble.solutions/api/v5/activity/${selectedActivity._id}/metric/variable`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     });
    //     if (response.status == 200) {
    //         console.log('Activity selected');
    //         const associatedVariables = await response.json();
    //     }
    //     } catch (error) {
    //         console.error('Error fetching selected activity:', error);
    //     }
    // };
    
    
    const onValidatePress = async () => {
        const fetchSelectedActivity = async () => {
            try {
                const response = await fetch(`https://api.pebble.solutions/v5/activity/${selectedActivity._id}/metric/variable`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            if (response.status == 200) {
                const variables = await response.json();
                console.log(variables, 'associatedVariables');
                SetAssociatedVariables(variables);

            }
            } catch (error) {
                console.error('Error fetching selected activity:', error);
            }
        };
        fetchSelectedActivity();
        const currentTime = new Date();
        console.log("Validation des données");
        console.log("Heure de validation :", currentTime);
        try {
            const storedPressTimes = await AsyncStorage.getItem('pressTimes');
            if (storedPressTimes) {
                const parsedPressTimes = JSON.parse(storedPressTimes);
                if (parsedPressTimes.length > 0 && parsedPressTimes[parsedPressTimes.length - 1].index % 2 === 0) {
                    console.log('Press Times in AsyncStorage:', parsedPressTimes);
                    setModalData(parsedPressTimes); // Suppose que vous avez un state `modalData`
                    const startTime = parsedPressTimes[0].time;
                    const endTime = parsedPressTimes[parsedPressTimes.length - 1].time;
                    const endLabel = parsedPressTimes[parsedPressTimes.length - 1].label;
                    const testDiff = calculateDiffDate(startTime, endTime);
                    const startLabel = parsedPressTimes[0].label;
                    console.log(startLabel, 'startLabel');
                    console.log(endLabel, 'endLabel');
                    const formastart = new Date(startTime);
                    const foramend = new Date(endTime);
                    console.log(formastart, foramend, 'formastart et end');
                    const diff = foramend.getTime() - formastart.getTime();
                    const hours = Math.floor(diff / (1000 * 60 * 60));
                    const minutes = Math.floor(diff / (1000 * 60)) % 60;
                    const seconds = Math.floor(diff / 1000) % 60;
                    const duration = `${hours}h${minutes}m${seconds}s`;
                    const recap = {
                        totalTime: duration
                    };
                    console.log(duration, 'duration');
                    setRecap(recap => ({
                        ...recap,
                        totalTime: duration
                    }));
                    console.log(recap, 'recap');
                    const numberBreak = parsedPressTimes.filter((item: string) => item.label === "Pause").length;
                    setRecap(recap => ({
                        ...recap,
                        numberBreak: numberBreak
                    }));
                    setModalVisible(true); // Afficher la fenêtre modale
                } else {
                    console.log('vous devez arrêter l\'activité pour valider');
                    Alert.alert('vous devez arrêter l\'activité pour valider votre session');
                }
            } else {
                console.log('No press times stored in AsyncStorage');
            }
        } catch (error) {
            console.error('Error retrieving data from AsyncStorage:', error);
        }
    };
    const renderPresstimes = () => {
        console.log(modalData, 'modalData');
        modalData.map((item, index) => {
            if(modalData[index].label === "Pause" || modalData[index].label === ""){
                setTabPointage(tabPointage => [...tabPointage, item]);
                setModalData(modalData[index].label,  "end");
                
        // return modalData.map((item, index) => {
        //     return (
        //         <View key={index} style={styles.contentItemWork}>
        //             <Text style={styles.contentName}>{item.label}</Text>
        //             <Text style={styles.contentName}>{item.time.toLocaleTimeString()}</Text>
        //         </View>
        //     )
        // })
    }
        

    const validateSession = () => { 
        console.log('ValidateSession');
    }

    const ConfirmValidateSession = () => {
        Alert.alert('Confirmation', 'Voulez-vous valider cette session ?',  [
            {
                text: 'Annuler',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
                },
                { text: 'OK', onPress: () => validateSession() }
                ],
                { cancelable: false }
                );
    }
    const handlePress= () => {
        console.log('handlePress');
    }

    const renderItem = ({
        item,
        index
    }: {
        item: {
            time: Date;
            label: string;
        };
        index: number;
    }) =>   
            <View style={styles.listItem}>
                <View style={styles.timeline}>
                    {/* Afficher verticalLine seulement si ce n'est ni le premier ni le dernier élément */}
                    {index !== 0 && index !== pressTimes.length - 1 && <View style={styles.verticalLine} />}
                    
                    {/* Logique existante pour afficher le cercle */}
                    {index === 0 ? <View style={styles.largeCircleBorder}>
                
                    </View> : item.label === "Arrêt de l'activité" ? <View style={styles.largeCircleFilled} /> : <View style={styles.smallCircleFilled} />}
                </View>
                <View style={styles.labelContainer}>
                    <Text style={[styles.labelText, item.label === "Pause" || item.label === "Reprise" ? styles.opaqueLabel : null]}>
                    {item.label}
                    </Text>
                </View>
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{item.time.toLocaleTimeString()}</Text>
                </View>
                {/* Afficher lastItemLine seulement si c'est le dernier élément et la longueur de pressTimes est >= 2 */}
                {index === pressTimes.length - 1 && pressTimes.length >= 2 && <View style={styles.lastItemLine} />}
            </View>;

    return <LinearGradient colors={['#020716', '#1C4D69', '#EC8F7B', '#FF493E']} style={styles.container}>
            <View style={styles.mountainsContainer}>
                <SvgMountains />
            </View>
            <TouchableOpacity onPress={onPressSun} style={styles.circleContainer}>
                <SvgSun />
            </TouchableOpacity>
            <Heading size="3xl">{selectedActivity.label}</Heading>
            <Heading size="md">{selectedActivity.description}</Heading>
            <FlatList data={pressTimes} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} style={styles.listContainer} />
            <TouchableOpacity onPress={onValidatePress} style={[styles.button, styles.validateButton]}>
            <Text style={styles.buttonText}>Valider</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={clearPressTimes} style={[styles.button, styles.clearButton]}>
                <Text style={styles.buttonText}>Annuler</Text>
            </TouchableOpacity>
    
    {/* Ajouter la fenêtre modale de validation de la session ici */}
    <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)} onShow={() => setContentVisible(true)}>
        <View style={styles.modalContainer}>
        
            <View style={styles.header}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.buttonCancel}>
                    <Text style={styles.buttonText}>Annuler</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.contentValidation}>
                <Text style={styles.infoModalTitle}>{selectedActivity.label} - {selectedActivity.description}</Text>
                {/* <Text style={styles.infoModalTitle}>Session du {modalData[0].time}  </Text> */}
            </View>
    
            <ScrollView>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>Informations session</Text>
                    <View style={styles.contentValidation}>
                        <View style={styles.rowItemWork}>
                            {renderPresstimes() }
                        </View>
                        <View style={styles.contentItem}>
                            <Text style={styles.contentName}>Durée de la session:</Text>
                            <Text style={styles.contentName}>{recap.totalTime}</Text>
                        </View>
                        
                        <View style={styles.contentItem}>
                            <Text style={styles.contentName}>nombre de pauses:</Text>
                            <Text style={styles.contentName}>{recap.numberBreak}</Text>
                        </View>
                        <TouchableOpacity onPress={() => console.log("Modifier ces informations")} style={styles.buttonPatch}>
                            <Text style={styles.buttonText}>Modifier ces informations ?</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {/* <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>Variables associées</Text>
                    <View style={styles.contentValidation}>
                        <RenderAssociatedVariables />
                    </View>
                </View> */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>variables</Text>
                    <View style={styles.contentValidation}>
                        <RenderComponentsVariables 
                        tabVariables = {associatedVariables}
                        />
                    </View>
                    <View>
                    </View>
                </View>
                    
                {/* données en dur pour exemple affichage des diverses variables associées*/}
                {/* <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>Informations et variables</Text>
                    <View style={styles.contentValidation}>
                        <View style={styles.contentItem}>
                            <Text style={styles.contentName}>Covoiturage:</Text>
                            <Switch trackColor={{
                                false: '#767577',
                                true: '#81b0ff'
                            }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
                        </View>
                        <View style={styles.contentItem}>
                            <Text style={styles.contentName}>Grand dépalcement (300kms):</Text>
                            <Switch trackColor={{
                                false: '#767577',
                                true: '#81b0ff'
                            }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
                        </View>
                        <View style={styles.contentItem}>
                        <Text style={styles.contentName}>hébergement hötel:</Text>
                        <Switch trackColor={{
                            false: '#767577',
                            true: '#81b0ff'
                        }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
                        </View>
                        <View style={styles.contentItem}>
                            <Text style={styles.contentName}>formation:</Text>
                            <Switch trackColor={{
                                false: '#767577',
                                true: '#81b0ff'
                            }} thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'} ios_backgroundColor="#3e3e3e" onValueChange={toggleSwitch} value={isEnabled} />
                        </View>
                        <View style={styles.contentItem}>
                            <Text style={styles.contentName}>montant total des ventes journalières:</Text>
                            <TextInput style={styles.contentInput} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setText} value={text} placeholder={'?'} />
                        </View>
                        <View style={styles.contentItem}>
                            <Text style={styles.contentName}>dont nombre d'heures CSE:</Text>
                            <TextInput style={styles.contentInput} inputAccessoryViewID={inputAccessoryViewID} onChangeText={setText} value={text} placeholder={'?'} />
                        </View>
                        
                        <Text style={styles.contentName}>Commentaires:</Text>
                        <TouchableOpacity onPress={() => console.log("Ajouter un commentaire")} style={styles.buttonPatch}>
                            <Text style={styles.buttonText}>ici votre commentaire</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                {/* données en dur pour affichage "ajout d'un fichier" */}
                {/* <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>Ajouter un fichier</Text>
                    <View style={styles.contentValidation}>
                        <TouchableOpacity onPress={() => console.log("joindre fichier dossier")} style={styles.buttonPatch}>
                            <Text style={styles.buttonText}>Depuis les dossiers</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => console.log("joindre fichier image")} style={styles.buttonPatch}>
                            <Text style={styles.buttonText}>Depuis les images</Text>
                        </TouchableOpacity>
                    </View>
                </View> */}
                <TouchableOpacity onPress={(ConfirmValidateSession)} style={styles.buttonValidate}>
                    <Text style={styles.buttonText}>Valider cette session</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    </Modal>
</LinearGradient>;
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%'
    },
    modalContainer: {
        flex: 1,
        padding: 10,
        backgroundColor: '#F39D2C',
        justifyContent: 'space-around'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10
    },
    infoContainer: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        marginBottom: 10,
        marginHorizontal: 5
    },
    contentValidation: {
        margin: 10
    },
    contentValidationList: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 10
    },
    contentItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentItemWork: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    contentItemWork2: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderRadius: 10,
        margin: 10,
        padding: 10,
    },
    
    contentVariable: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentName: {
        color: 'white',
        fontSize: 12
    },
    contentInput: {
        padding: 0,
        marginRight: 10,
        color: 'white',
        fontSize: 12,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5
    },
    infoSectionTitle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5
    },
    infoModalTitle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 5,
        marginBottom: 5
    },
    mountainsContainer: {
        flex: 1,
        position: 'absolute',
        bottom: -3,
        width: '100%'
    },
    circleContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: '29%'
    },
    listContainer: {
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
        maxHeight: '100%',
        padding: 10
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10
    },
    timeline: {
        alignItems: 'center'
    },
    verticalLine: {
        width: 1,
        height: 25,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        bottom: 3
    },
    largeCircleBorder: {
        width: 16,
        height: 16,
        borderRadius: 8,
        borderWidth: 3,
        borderColor: 'white',
        right: 2
    },
    lastItemLine: {
        width: 1,
        height: 22,
        backgroundColor: 'white',
        // Couleur de la ligne pour le dernier élément
        position: 'absolute',
        zIndex: 1,
        bottom: 12,
        left: 4
    },
    largeCircleFilled: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        right: 3
    },
    smallCircleFilled: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        left: 0
    },
    labelContainer: {
        marginLeft: 10
    },
    labelText: {
        color: 'white',
        fontSize: 16
    },
    opaqueLabel: {
        opacity: 0.7
    },
    timeContainer: {
        marginLeft: 'auto'
    },
    timeText: {
        color: 'white',
        fontSize: 16
    },
    button: {
        position: 'relative',
        padding: 10,
        borderRadius: 20,
        width: 80
    },
    buttonValidate: {
        padding: 10,
        borderRadius: 20,
        width: '100%',
        backgroundColor: '#0000FF'
    },
    buttonPatch: {
        marginVertical: 5,
        paddingVertical: 5,
        borderRadius: 5,
        width: '100%',
        borderWidth: 1,
        borderColor: 'white'
    },
    buttonCancel: {
        padding: 10,
        borderRadius: 20,
        width: '40%',
        backgroundColor: '#FF0000'
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        textAlign: 'center'
    },
    clearButton: {
        right: 135,
        top: 270,
        backgroundColor: '#FF0000'
    },
    validateButton: {
        right: -135,
        top: 307,
        backgroundColor: '#0000FF'
    }
});
export default Timer;