import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { transformToPostTimes } from "../js/changeTab";
import { transformToSession } from "../js/changeTab";
import { dateToLiteral } from "../js/date"; 
// Fonction pour formater une date
const formatDate = (date) => {
    const options = {  hour: 'numeric', minute: 'numeric', second: 'numeric' };
    return date.toLocaleDateString('fr-FR', options);
};

const RenderSessionTimes = ({tabTimes}) => {
    sessionTime = transformToSession(tabTimes);
    console.log(sessionTime, sessionTime[0].start, sessionTime[0].end  );
    
            
    if(tabTimes && sessionTime) {
        return (
            <View>
                <Text style={styles.label}>Session</Text>
                <View style={styles.contentItem}>
                    <Text style={styles.contentName}>Début:</Text>
                    <Text style={styles.contentName}>{formatDate(new Date(sessionTime[0].start))}</Text>
                </View>
                <View style={styles.contentItem}>
                    <Text style={styles.contentName}>Fin:</Text>
                    <Text style={styles.contentName}>{formatDate(new Date(sessionTime[0].end))}</Text>
                </View>
                <Text style={styles.label}>Temps</Text>
            </View>
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
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    contentName: {
        color: 'white',
        fontSize: 12
    },

})
export default RenderSessionTimes;