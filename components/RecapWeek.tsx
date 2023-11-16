import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const RecapDay = () =>  {
	return(
		<View>
			{/* La carte avec les détails de la journée */}
			<View style={styles.card}>
				<Text style={styles.cardTitle}>18 sept. - 25 sept 2023</Text>

				<Text style={styles.textWhite}>Temps de travail: 36h12</Text>
				<Text style={styles.textWhite}>Temps de pause : 5h11</Text>
				<Text style={styles.textWhite}>Nombre de pauses: 9</Text>
				<Text style={styles.textWhite}>Nombre d'anomalies: 9</Text>
				<Text style={styles.textWhite}>Jour d'activité: 5</Text>


			{/* Ajoutez d'autres informations sur les pointages et les heures ici */}
			</View>
			<View style={styles.card}>
				<Text style={styles.cardTitle}>Informations et variables</Text>
				
				<Text style={styles.textWhite}>Covoiturage : x4</Text>
				<Text style={styles.textWhite}>Hébergement Hôtel : x4</Text>
				<Text style={styles.textWhite}>Prime Panier : x4</Text>
				<Text style={styles.textWhite}>Trajet Voiture : 55 km</Text>
				<Text style={styles.textWhite}>Covoiturage : x1</Text>
				<Text style={styles.textWhite}>Prime de salissure : x5</Text>
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