import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableHighlight } from 'react-native';
import RenderForm from './renderFormVariables';



const RenderComponentsVariables = ({tabVariables}) => {
    const [variablesVisibles, setVariablesVisibles] = React.useState(true);
    const   [response, setResponse] = React.useState({ response: ""});
    const [formVisible, setFormVisible] = React.useState(false);
    const [selectedItem, setSelectedItem] = React.useState(null);

    const handlePress = (item) => {
        setFormVisible(true);
        setVariablesVisibles(false);
        setSelectedItem(item);
    }
    const renderFormItem = () => {

        if(!selectedItem) return null;
        else{
            console.log('handlepress', selectedItem)
            return (
                <View style={styles.contentForm}>
                    {formVisible &&
                    <RenderForm item={selectedItem}/>
                    }
                </View>
            )   

        }

        
    }




        const renderVariables = () => { 
            if(!tabVariables ) return null;
            // else if (variablesVisibles){

            // }
                return tabVariables.map((item) => {
                
                        return (
                            <View style={styles.contentVariable} key={item._id}>
                                <TouchableHighlight onPress={() => handlePress(item)}>
                                    <View>
                                        <Text style ={styles.contentName}>{item.question}</Text> 
                                        <Text style ={styles.contentName}>{item.mandatory}</Text>
                                    
                                    </View>
                                </TouchableHighlight>
                            </View>
                        )
                    }
                    
                )
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
        alignItems: 'start',
        backgroundColor: 'transparent',
        margin: 5,
        padding: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: 'white',
    },
    contentForm: {
        flex: 1,
        
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'grey',
        margin: 5,
        padding: 20,
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