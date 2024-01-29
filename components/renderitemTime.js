import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { transformToPostTimes } from "../js/changeTab";

// Fonction pour formater une date
const formatDate = (date) => {
    const options = {  hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
};

const RenderItemTimes = ({tabTimes}) => {
    sessionWork = transformToPostTimes(tabTimes);
    console.log(sessionWork)
            
    if(sessionWork.length > 0  ) {

        return sessionWork.map((item) => {
                const Time = new Date(item.time)
                return (
                    <View key={item.index} style={styles.contentItem}>
                        <Text style={styles.contentName}>{item.label}:</Text>
                        <Text style={styles.contentName}>{formatDate(Time)}</Text>
                    </View>
                )
            }
        )
        
    }
    else {
        return (
            <Text style={styles.contentName}>Pas de temps enregistré</Text>
        )
    }
}

const styles = StyleSheet.create({
    label: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 10,
        marginBottom: 10,
        marginLeft: 10,
    },
    inputField: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        padding: 5,
        margin: 5,
    },
    contentItem: {
        flexDirection: 'raw',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentName: {
        color: 'white',
        fontSize: 12
    },

})
export default RenderItemTimes;