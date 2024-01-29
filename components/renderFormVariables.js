import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import ResponseText from "./formVariable/variableText";
import ResponseNumber from "./formVariable/variableNumber";
import ResponseBoolean from "./formVariable/variableBoolean";


const RenderForm = ({item}, {type}) => {
    console.log(type, ' type')
    console.log(item, ' item')
    if(item.type === 'text'){
        return (
            <ResponseText varText={item}/>
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
            <ResponseNumber varNumber={item}/>
        )
    }
    else if(item.type === 'boolean'){
        return (
            // <TextInput style={styles.inputField}
            // placeholder={item.type}></TextInput>
            <ResponseBoolean varBoolean={item}/>
        )
    }
    else{
        return null
    }
    
    
}
const styles= StyleSheet.create({
    contentVariable: {
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