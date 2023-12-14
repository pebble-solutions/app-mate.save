import React, { useState} from 'react';
import { StyleSheet, Text, TouchableHighlight, Alert, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const DeleteActivityButton = ({title, id}) => {

	const [activity, setActivity] = useState(0);
	const [onDeleteSucces, setOnDeleteSucces] = useState(false);
	const AlertConfirm = () =>
    Alert.alert('ATTENTION', 'Souhaitez-vous supprimer cette activité: '+title+' ?', [
		{
		text: 'Annuler',
		// onPress: () => console.log('Cancel Pressed'),
		style: 'cancel',
		},
		{text: 'OK',
		onPress: () => onPressButton(),
		},
    ]);
	
	const onPressButton = () => {

		    const deleteActivity = async () => {
				let activity = {
					id: id,
				}
				try{
					const response = await fetch('https://api.pebble.solutions/v5/activity/'+activity.id, {
						method: 'DELETE',
						headers: {
							'Content-Type': 'application/json',
						},
					});
	
                    if (response.status == 202) {
                        Alert.alert('Suppression effectuée');
                        setOnDeleteSucces(true) // Appel de onDeleteSuccess lorsque la suppression réussit
                      } 	else if (response.status == 400 ||
						response.status == 403 ||
						response.status == 404 || 
						response.status == 429 ||
						response.status == 422 ||
						response.status == 500){	
					Alert.alert('suppression impossible');
					}
				}
				catch(error){
                    console.log(error);
                }
			}	

			deleteActivity();
        

	}
	return (
		<View style={styles.container}>
			<TouchableHighlight onPress={AlertConfirm}>
				<View style={styles.button}>
					<Text style={styles.text}>{title}</Text>
					<MaterialCommunityIcons name="trash-can" color={'white'} size={25} />
				</View>
			</TouchableHighlight>
		</View>
);
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'start',
		
	},
	button: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		backgroundColor: '#d46363',
		padding: 10,
		borderRadius: 15,
	},
	
	text: {
		color: 'white',
	},
});

export default DeleteActivityButton;