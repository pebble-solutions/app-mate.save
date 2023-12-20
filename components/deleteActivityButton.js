import React, { useState } from 'react';
import { StyleSheet, Text, TouchableHighlight, Alert, View } from 'react-native';


const DeleteActivityButton = ({ title, id }) => {

	const [activity, setActivity] = useState(0);
	const [onDeleteSucces, setOnDeleteSucces] = useState(false);
	const AlertConfirm = () =>
		Alert.alert('ATTENTION', 'Souhaitez-vous supprimer cette activité: ' + title + ' ?', [
			{
				text: 'Annuler',
				// onPress: () => console.log('Cancel Pressed'),
				style: 'cancel',
			},
			{
				text: 'OK',
				onPress: () => onPressButton(),
			},
		]);

	const onPressButton = () => {



		const deleteActivity = async () => {
			let activity = {
				id: id,
			}
			try {
				const response = await fetch('https://api.pebble.solutions/v5/activity/' + activity.id, {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				});

				if (response.status == 202) {
					Alert.alert('Suppression effectuée');
					setOnDeleteSucces(true) // Appel de onDeleteSuccess lorsque la suppression réussit
				} else if (response.status == 400 ||
					response.status == 403 ||
					response.status == 404 ||
					response.status == 429 ||
					response.status == 422 ||
					response.status == 500) {
					Alert.alert('suppression impossible');
				}
			}
			catch (error) {
				console.log(error);
			}
		}

		deleteActivity();


	}
	return (
		<View style={styles.container}>
		  <TouchableHighlight onPress={AlertConfirm}>
			<View style={styles.button}>
			  <Text style={styles.text}>Supprimer cette activité</Text>
			</View>
		  </TouchableHighlight>
		</View>
	  );
}

const styles = StyleSheet.create({
	container: {
	  flex: 1,
	  justifyContent: 'flex-end', // Positionnez le contenu en bas de l'écran
	  alignItems: 'center', // Centrez horizontalement
	  marginBottom: 20, // Espacement en bas de la page
	},
	button: {
	  width: '100%', // Prend toute la largeur de l'écran
	  backgroundColor: '#d46363',
	  padding: 10,
	  borderRadius: 10,
	},
	text: {
	  color: 'white',
	  textAlign: 'center',
	},
  });

export default DeleteActivityButton;