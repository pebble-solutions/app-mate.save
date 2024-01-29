import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';



const RenderComponentsVariables = ({tabVariables}) => {


    const RenderForm = ({variable, id}) => {
        console.log(variable, id, 'variable')
        switch (variable.type) {
            case 'text':
                console.log('text', variable.question)
                return (
                    <TextInput style={styles.contentName}
                    placeholder={variable.type}>Text</TextInput>
                )
            case 'textarea':
                console.log('textarea', variable.question)
                return (
                    <Text>textarea </Text>
                )
            case 'date':
                console.log('date', variable.question)
                return (
                    <Text>date</Text>
                )
            case 'number':
                console.log('number', variable.question)
                return (
                    <Text>number</Text>
                )
            case 'boolean':
                console.log('boolean', variable.question)
                return (
                    <Text>booleen</Text>
                )
        }
    }

        
            


    return tabVariables.map((variable, id) => {
        return (
            <View style={styles.contentVariable} key={id}>
                <TouchableOpacity onPress={() => RenderForm({variable, id})}>
                    <Text style ={styles.contentName}>{variable.question}</Text>    
                </TouchableOpacity>
                <View>
                <RenderForm style={styles.contentName} variable={variable} id={id}/>
                
                </View>
                {/* <Text style ={styles.contentName}>{variable.label}</Text>
                <Text style ={styles.contentName}>{variable.order}</Text> */}
            </View>
        )
    })
}
const styles = StyleSheet.create({
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
});
export default RenderComponentsVariables;