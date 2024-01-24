import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";

const RenderForm = ({item}, {type}) => {
    console.log(type, ' type')
    console.log(item, ' item')
    if(item.type === 'text'){
        return (
            <TextInput style={styles.inputField}
            placeholder={item.type}></TextInput>
        )
    }
    else if(item.type === 'textarea'){
        return (
            <TextInput style={styles.inputField}
            placeholder={item.type}></TextInput>
        )
    }
    else if(item.type === 'date'){
        return (
            <TextInput style={styles.inputField}
            placeholder={item.type}></TextInput>
        )
    }
    else if(item.type === 'number'){
        return (
            <TextInput style={styles.inputField}
            placeholder={item.type}></TextInput>
        )
    }
    else if(item.type === 'boolean'){
        return (
            <TextInput style={styles.inputField}
            placeholder={item.type}></TextInput>
        )
    }
    else{
        return null
    }
    
    // switch (item.type) {
    //     case 'text':
    //         console.log('text', item.question)
    //         return (
    //             <TextInput style={styles.inputField}
    //             placeholder={item.type}></TextInput>
    //         )
    //     case 'textarea':
    //         console.log('textarea', item.question)
    //         return (
    //             <TextInput style={styles.inputField}
    //             placeholder={item.type}></TextInput>
    //         )
    //     case 'date':
    //         console.log('date', item.question)
    //         return (
    //             <TextInput style={styles.inputField}
    //             placeholder={item.type}></TextInput>
    //         )
    //     case 'number':
    //         console.log('number', item.question)
    //         return (
    //             <TextInput style={styles.inputField}
    //             placeholder={item.type}></TextInput>
    //         )
    //     case 'boolean':
    //         console.log('boolean', item.question)
    //         return (
    //             <TextInput style={styles.inputField}
    //             placeholder={item.type}></TextInput>
    //         )
    // }
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