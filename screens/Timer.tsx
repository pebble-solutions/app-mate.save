import React, { useState, useEffect, FC } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Modal, ScrollView } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import SvgSun from './SVG/SvgSun';
import SvgMountains from './SVG/SvgMountains';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Timer: FC = () => {
  const [pressTimes, setPressTimes] = useState<{ time: Date; label: string }[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalData, setModalData] = useState<{ time: Date; label: string }[]>([]);
  const [contentVisible, setContentVisible] = useState<boolean>(true);

  useEffect(() => {
    const loadPressTimes = async () => {
      try {
        const storedPressTimes = await AsyncStorage.getItem('pressTimes');
        if (storedPressTimes) {
          const times = JSON.parse(storedPressTimes).map(({ time, label }: { time: string; label: string }) => ({ time: new Date(time), label }));
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
    const newPressTime = { time: currentTime, label: "" , index:index};
    const updatedPressTimes = [...pressTimes, newPressTime];
    setPressTimes(updatedPressTimes);
    await savePressTimes(updatedPressTimes);  // Sauvegarde des nouvelles données
  };

  const savePressTimes = async (times: { time: Date; label: string }[]) => {
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
        return { ...item, label: "Début d'activité" };
      } else if (index % 2 === 1 && index !== array.length - 1) {
        return { ...item, label: "Pause" };
      } else if (index % 2 === 0) {
        return { ...item, label: "Reprise" };
      } else {
        return { ...item, label: "Arrêt de l'activité" };
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

  const onValidatePress = async () => {
      const currentTime = new Date();
      console.log("Validation des données");
      console.log("Heure de validation :", currentTime);
    try {
        const storedPressTimes = await AsyncStorage.getItem('pressTimes');
        if (storedPressTimes) {
            const parsedPressTimes = JSON.parse(storedPressTimes);
            console.log('Press Times in AsyncStorage:', parsedPressTimes);
             // Vous pouvez ici utiliser ces données pour une autre logique
            // Par exemple, afficher les données dans une fenêtre modale
            setModalData(parsedPressTimes); // Suppose que vous avez un state `modalData`
            setModalVisible(true); // Afficher la fenêtre modale
        } else {
            console.log('No press times stored in AsyncStorage');
        }
    } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
    }
};

const renderItem = ({ item, index }: { item: { time: Date; label: string }; index: number }) => (

    <View style={styles.listItem}>
        <View style={styles.timeline}>
        {/* Afficher verticalLine seulement si ce n'est ni le premier ni le dernier élément */}
        {index !== 0 && index !== pressTimes.length - 1 && <View style={styles.verticalLine} />}
        
        {/* Logique existante pour afficher le cercle */}
        {index === 0 ? (
            <View style={styles.largeCircleBorder}>
            
            </View>
        ) : item.label === "Arrêt de l'activité" ? (
            <View style={styles.largeCircleFilled} />
        ) : (
            <View style={styles.smallCircleFilled} />
        )}
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
    </View>
  );

  return (
    <LinearGradient
      colors={['#020716', '#1C4D69', '#EC8F7B', '#FF493E']}
      style={styles.container}
    >
      <View style={styles.mountainsContainer}>
        <SvgMountains />
      </View>
      <TouchableOpacity
        onPress={onPressSun}
        style={styles.circleContainer}
      >
        <SvgSun />
      </TouchableOpacity>

      <FlatList
        
        data={pressTimes}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.listContainer}
      />

      <TouchableOpacity
        onPress={onValidatePress}
        style={[styles.button, styles.validateButton]}
        
      >
        <Text style={styles.buttonText}>Valider</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={clearPressTimes}
        style={[styles.button, styles.clearButton]}
      >
        <Text style={styles.buttonText}>Annuler</Text>
      </TouchableOpacity>

      {/* Ajouter la fenêtre modale ici */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={styles.header}>
                    <TouchableOpacity
                    onPress={() => setModalVisible(false)}
                    style={styles.buttonCancel}
                    >
                        <Text style={styles.buttonText}>Annuler</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.contentValidation}>
                    <Text style={styles.contentName}>Activité du currentTime (date)</Text>
                </View>
                {/* <View style={styles.infoContainer}>
                    <FlatList
                        keyExtractor={(item, index) => index.toString()}
                        data={modalData}
                        renderItem={({ item }) => (
                            <View style={styles.contentValidationList}>
                                <Text style={styles.timeText}>{item.index}</Text>
                                <Text style={styles.timeText}>{item.label}</Text>

                                <Text style={styles.timeText}>{item.time}</Text>
                            </View>
                        )}
                    />
                </View> */}
                <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>Informations session</Text>
                    <View style={styles.contentValidation}>
                        <Text style={styles.contentName}>Durée activité: 8H12</Text>
                        <Text style={styles.contentName}>temps de pause session: 1H11</Text>
                        <Text style={styles.contentName}>amplitude: 9H23</Text>
                        <Text style={styles.contentName}>nombre de pauses: 3</Text>
                        <TouchableOpacity
                        onPress={() => console.log("Modifier ces informations")}
                        style={styles.buttonPatch}
                        >
                            <Text style={styles.buttonText}>Modifier ces informations</Text>
                        </TouchableOpacity>

                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>Informations et variables</Text>
                    <View style={styles.contentValidation}>
                        <Text style={styles.contentName}>Covoiturage</Text>
                        <Text style={styles.contentName}>Grand déplacement</Text>
                        <Text style={styles.contentName}>hébergement</Text>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.infoSectionTitle}>ajouter un fichier</Text>
                    <View style={styles.contentValidation}>
                        <Text style={styles.contentName}>depuis les dossiers</Text>
                        <Text style={styles.contentName}>depuis les images</Text>
                    </View>
                </View>
                
                
                <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.buttonValidate}
                >
                    <Text style={styles.buttonText}>Valider cette activité</Text>
                </TouchableOpacity>
            </View>
        </Modal>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%',

    },
    modalContainer: {
        flex: 1,
        padding:10,
        width: '100%',
        height: '100%',
        marginTop: 22,
        backgroundColor: 'rgba(0,0,0,0.5)',

    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
      },
    infoContainer: {
        flex:1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        borderRadius: 10,
        padding: 10,
        paddingBottom: 20,
        marginBottom: 12,
    },
    contentValidation: {
        alignItems: 'center',
        margin: 10,
    },
    contentValidationList: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    contentName: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
      },

    infoSectionTitle: {
        textAlign: 'center',
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 20,
    },

    

    mountainsContainer: {
        position: 'absolute',
        left: 10,
        bottom: -3,
        width: '100%',
    },
    circleContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        top: '29%',
    },
    listContainer: {
        position: 'absolute',
        top: 100,
        left: 20,
        right: 20,
        maxHeight: '100%',
        padding: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    timeline: {
        alignItems: 'center',
    },
    verticalLine: {
        width: 1,
        height: 25,
        backgroundColor: 'white',
        position: 'absolute',
        zIndex: 1,
        bottom: 3,
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
        backgroundColor: 'white', // Couleur de la ligne pour le dernier élément
        position: 'absolute',
        zIndex: 1,
        bottom: 12,
        left: 4,
    },
    largeCircleFilled: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        right: 3,
    },
    smallCircleFilled: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'white',
        left: 0,
    },
    labelContainer: {
        marginLeft: 10,
    },
    labelText: {
        color: 'white',
        fontSize: 16,
    },
    opaqueLabel: {
        opacity: 0.7,
    },
    timeContainer: {
        marginLeft: 'auto',
    },
    timeText: {
        color: 'white',
        fontSize: 16,
    },
    button: {
        position: 'relative',
        padding: 10,
        borderRadius: 20,
        width: 80,
    },
    buttonValidate: { 
        padding: 10,
        borderRadius: 20,
        width: '100%',
        backgroundColor: '#0000FF',
        
    },
    buttonPatch: { 
        padding: 10,
        marginTop: 10,
        borderRadius: 20,
        width: '100%',
        backgroundColor: 'grey',
        
    },
    buttonCancel: { 
        padding: 10,
        borderRadius: 20,
        width: '40%',
        backgroundColor: '#FF0000',
        
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        textAlign: 'center',
    },
    clearButton: {
        right: 135,
        top: 270,
        backgroundColor: '#FF0000',
    },
    validateButton: {
        right: -135,
        top: 307,
        backgroundColor: '#0000FF',
    },
});

export default Timer;
