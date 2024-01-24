import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const RenderForm = ({variable,id}) => {
    console.log(variable, 'variable')
    switch (variable.type) {
        case 'text':
            console.log('text', variable.question)
            return (
                <TextInput style={styles.inputField}
                placeholder={variable.type}></TextInput>
            )
        case 'textarea':
            console.log('textarea', variable.question)
            return (
                <TextInput style={styles.inputField}
                placeholder={variable.type}></TextInput>
            )
        case 'date':
            console.log('date', variable.question)
            return (
                <TextInput style={styles.inputField}
                placeholder={variable.type}></TextInput>
            )
        case 'number':
            console.log('number', variable.question)
            return (
                <TextInput style={styles.inputField}
                placeholder={variable.type}></TextInput>
            )
        case 'boolean':
            console.log('boolean', variable.question)
            return (
                <TextInput style={styles.inputField}
                placeholder={variable.type}></TextInput>
            )
    }
}
const styles= StyleSheet.create({
    contentVariable: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    contentName: {
        fontSize: 15,
        color: 'white',
    },
    inputField: {
        width: 300,
        height: 40,
        backgroundColor: 'transparent',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'grey',
        margin: 5,
        padding: 5,
    }
})
export default RenderForm