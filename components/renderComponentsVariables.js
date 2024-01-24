import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import RenderForm from './renderFormVariables';



const RenderComponentsVariables = ({tabVariables}) => {
    const [formVisible, setFormVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    const handlePress = (item) => {
        setSelectedItem(item);
    }
    const renderFormItem = () => {

        if(!selectedItem) return null;
        else{
            console.log('handlepress', selectedItem)
            return (
                <View>
                    <RenderForm item={selectedItem} />
                </View>
            )   

        }

        
    }


    // const RenderForm = ({variable, id}) => {
    //     console.log(variable, id, 'variable')
    //     switch (variable.type) {
    //         case 'text':
    //             console.log('text', variable.question)
    //             return (
    //                 <TextInput style={styles.contentName}
    //                 placeholder={variable.type}>Text</TextInput>
    //             )
    //         case 'textarea':
    //             console.log('textarea', variable.question)
    //             return (
    //                 <Text>textarea </Text>
    //             )
    //         case 'date':
    //             console.log('date', variable.question)
    //             return (
    //                 <Text>date</Text>
    //             )
    //         case 'number':
    //             console.log('number', variable.question)
    //             return (
    //                 <Text>number</Text>
    //             )
    //         case 'boolean':
    //             console.log('boolean', variable.question)
    //             return (
    //                 <Text>booleen</Text>
    //             )
    //     }
    // }

    const renderVariables = () => { 
        if(!tabVariables) return null;
        else{
            return tabVariables.map((item) => {
                return (
                    <View style={styles.contentVariable} key={item._id}>
                        <TouchableHighlight onPress={() => handlePress(item)}>
                            <Text style ={styles.contentName}>{item.question}</Text>    
                        </TouchableHighlight>
                    </View>
                )
            })
            
            
        }
    }    
    return (    
        <View>
            {renderVariables()}
            {renderFormItem()}
        </View>
    )


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