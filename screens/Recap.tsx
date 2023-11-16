import React from 'react';
import { StyleSheet, View, Text, ScrollView, SafeAreaView } from 'react-native';
import RecapButton from '../components/RecapButton';
import RecapDay from '../components/RecapDay';
import RecapWeek from '../components/RecapWeek';


const Recap = () => {
	return (
		<SafeAreaView style={styles.container}>

			<ScrollView stickyHeaderIndices={[0]}>
				<View style={styles.container}>
					<View style={styles.header}>
						<Text style={styles.title}>Récapitulatif</Text>
						<Text style={styles.subtitle}>John Doe</Text>
						<View style={styles.buttonGroup}>
						{['jour', 'semaine', 'mois', 'periode'].map((type) => (
							<RecapButton buttonLabel= {type}/>
						))}
						</View>
					</View>
				</View>
				<View style={styles.container}>
					<RecapDay/>
					<RecapWeek/>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#121212', // Fond gris foncé
	},
	header: {
		paddingHorizontal: 20,
		paddingTop: 50,
		paddingBottom: 20,
		// Autres styles pour le header
	},
	title: {
		fontSize:20,
		textAlign: 'center',
		paddingBottom: 10,
		color: '#ffffff', // Texte blanc
		fontWeight: 'bold',
		// Autres styles pour le titre
	},
	subtitle: {
		fontSize: 18,
		paddingBottom: 20,
		color: '#ffffff', // Texte blanc
		textAlign: 'center',
		// Autres styles pour le sous-titre
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 20,
		// Autres styles pour le groupe de boutons
	},
	button: {
		backgroundColor: '#9155fd', // Boutons violets
		padding: 10,
		borderRadius: 20,
		// Autres styles pour les boutons
	},
	buttonText: {
		color: '#ffffff', // Texte blanc
		// Autres styles pour le texte du bouton
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




export default Recap;
