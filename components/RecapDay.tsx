import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const RecapDay = () =>  {
	return(
		<View>
			{/* La carte avec les détails de la journée */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Vendredi 23 Septembre 2023</Text>
				<Text style={styles.textWhite}>Pointage du matin : 8h00</Text>
				<Text style={styles.textWhite}>Pointage de l'après-midi : 13h30</Text>
				<Text style={styles.textWhite}>Heures travaillées : 7 heures</Text>
			{/* Ajoutez d'autres informations sur les pointages et les heures ici */}
			</View>
			<View style={styles.card}>
					<Text style={styles.cardTitle}>Informations et variables</Text>
					
					<Text style={styles.textWhite}>Covoiturage : x1</Text>
					<Text style={styles.textWhite}>Hébergement Hôtel : x1</Text>
					<Text style={styles.textWhite}>Prime Panier : x1</Text>
					<Text style={styles.textWhite}>Trajet Voiture : 55 km</Text>
					<Text style={styles.textWhite}>Prime de salissure : x1</Text>
				{/* Ajoutez d'autres variables de paie fictives ici */}
				</View>
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Commentaires</Text>
				<Text style={styles.textWhite}>• Ceci est un commentaire sur cette journée.</Text>
				<Text style={styles.textWhite}>• Un autre commentaire fictif.</Text>
			{/* Ajoutez d'autres commentaires fictifs ici */}
			</View>
		</View>
	)}


const styles = StyleSheet.create({
	
	
	
	content: {
		// Styles pour le contenu scrollable
	},
	
    card: {
		backgroundColor: 'rgba(37,39,66,255)', // Fond bleu foncé transparent à 30%
		margin: 10,
		padding: 15,
		borderRadius: 15,
		// Autres styles pour les cartes
	},


	cardTitle: {
		fontWeight: 'bold',
		textAlign: 'center',
		fontSize: 16,
		color: '#ffffff', // Texte blanc
		marginBottom: 10,
		// Autres styles pour le titre de la carte
	},
	comment: {
		color: '#ffffff', // Texte blanc
		// Autres styles pour les commentaires
	},

	textWhite: {
		color: '#ffffff', // Texte blanc
		fontWeight: '300'
	},

});




export default RecapDay;