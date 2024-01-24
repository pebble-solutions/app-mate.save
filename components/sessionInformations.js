import React from 'react';
import { StyleSheet } from 'react-native';  

const SessionInformations = ({session}) => {
    const [sendRawDatas, setSendRawDatas] = React.useState(false);
    const [sendRawVariables, setSendRawVariables] = React.useState(false);
    const [sendOwnerDatas, setSendOwnerDatas] = React.useState(false);
    const [sendOwner, setSendOwner] = React.useState(false);

    console.log(session, ' session')
    return (
        <View>
            <Text style={styles.label}>Session Informations</Text>
            <Text style={styles.label}>Label</Text>
            <Text style={styles.label}>Start</Text>
            <Text style={styles.label}>End</Text>
            <Text style={styles.label}>Status</Text>
            <Text style={styles.label}>Owner</Text>
            <Text style={styles.label}>Owner Datas</Text>
            <Text style={styles.label}>Raw Datas</Text>
            <Text style={styles.label}>Raw Variables</Text>
        </View>
    )
}


const postSession = {
    "_id": "01H81Z7W545XNWSP9B4JMRMODC", //pas forcément
    "type": "activity",
    "typeID": "01H81Z7W545XNWSP9B4JMRMODC",
    "label": "Pointage de Mr HELIGON",
    "comment": "Commentaire",
    "start": "2023-11-17 09:00:00",
    "end": "2023-11-17 18:00:00",
    "status": "Active",
    "owner": {
        "id": "01H81Z7W545XNWSP9B4JMRMODC",
        "firstname": "Sébastien",
        "lastname": "HELIGON",
        "matricule": "123456",
    },
    "raw_datas": [
        {
            "start": "2023-11-17 09:00:00",
            "end": "2023-11-17 12:00:00",
        },
        {
            "start": "2023-11-17 14:00:00",
            "end": "2023-11-17 18:00:00",
        },
    ],
    "raw_variables": [
        {
            "_id": "01HHYMRNEEEY7QSK83W9RN38H8",
            "label": "chantier",
            // "order": 1,
            // "mandatory": True,
            "value": "RAV Lorient",
        },
        {
            "_id": "01HHYMRNEEEY7QSK83W9RN38H9",
            "label": "Heure bureau",
            // "order": 2,
            // "mandatory": False,
            "value": 3,
        },
    ]
}