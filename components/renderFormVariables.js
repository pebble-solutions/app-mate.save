import React from "react";
import { StyleSheet, Text, View, TextInput } from "react-native";
import ResponseText from "./formVariable/variableText";
import ResponseNumber from "./formVariable/variableNumber";
import ResponseBoolean from "./formVariable/variableBoolean";
import ResponseTextArea from "./formVariable/variableTextArea";
import ResponseDate from "./formVariable/variableDate";
import ResponseTime from "./formVariable/variableTime";
import ResponseDateTime from "./formVariable/variableDateTime";
import ResponseDateRange from "./formVariable/variableDateRange";



const RenderForm = ({item}, {type}) => {
    // const [inputValueText, setInputValueText] = React.useState("");
    // const handleChangeValue = (text) => {
    //     setInputValueText(text);
    // }

    console.log(type, ' type')
    console.log(item, ' item')
    if(item.type === 'text'){
        return (
            <View>
                <ResponseText  varText={item}/>
{/* 
                <ResponseText  getValue={handleChangeValue}  varText={item}/>
                <Text> value in parent: {inputValueText} </Text> */}
            </View>
        )
    }
    else if(item.type === 'textarea'){
        return (
            <ResponseTextArea  varTextArea={item}/>
        )
    }
    else if(item.type === 'number'){
        return (
            <ResponseNumber varNumber={item}/>
        )
    }
    else if(item.type === 'boolean'){
        return (
         
        <ResponseBoolean varBoolean={item} />
      
        )
    }
    else if(item.type === 'date'){
        return (
      
            <ResponseDate varDate={item}/>
        )
    }
    else if(item.type === 'time'){
        return (
      
            <ResponseTime varTime={item}/>
        )
    }
    else if(item.type === 'dateTime'){
        return (
      
            <ResponseDateTime varDateTime={item}/>
        )
    }
    else if(item.type === 'dateRange'){
        return (
      
            <ResponseDateRange varDateRange={item}/>
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