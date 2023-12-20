import React, { useRef, useState, useMemo, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import DeleteActivityButton from '../components/deleteActivityButton';
import BottomSheet from '@gorhom/bottom-sheet';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';

const FullActivityInfos = ({ activity, onClose }) => {
	const selectedItem = activity;
	const [modalVisible, setModalVisible] = useState(false);

	// variables
	const snapPoints = useMemo(() => ['25%', '50%'], []);

	// callbacks
	const handleSheetChanges = useCallback((index) => {
		console.log('handleSheetChanges', index);
	}, []);

	const openBottomSheetFunction = () => {
		setModalVisible(true);




	}

	// Fonction pour ouvrir la BottomSheet
	const openBottomSheet = () => {
		if (modalVisible) {
			return (
				<NativeViewGestureHandler disallowInterruption={true}>
					<View style={styles.container}>
						<BottomSheet
							index={1}
							snapPoints={snapPoints}
							onChange={handleSheetChanges}
						>
							<View style={styles.contentContainer}>
								<Text>Awesome 🎉</Text>
							</View>
						</BottomSheet>
					</View>
				</NativeViewGestureHandler>
			);
		}
	};

	return (
		<View style={{ ...styles.container, backgroundColor: selectedItem.color }}>
			{/* Barre supérieure avec bouton de fermeture */}
			<View style={styles.header}>
				{/* Bouton "Réglages" pour ouvrir la BottomSheet */}
				<TouchableOpacity onPress={openBottomSheetFunction} style={styles.settingsButton}>
					<Text style={styles.settingsButtonText}>Réglages</Text>
				</TouchableOpacity>

				{/* Bouton de suppression aligné à droite */}
				<TouchableOpacity onPress={onClose} style={styles.closeButton}>
					<Text style={styles.closeButtonText}>Fermer</Text>
				</TouchableOpacity>
			</View>

			{/* Contenu de l'activité */}
			<View style={styles.activityContent}>
				<Text style={styles.activityName}>{activity.label}</Text>
				<Text style={styles.activityDate}>Créé le {moment(activity.start).format('DD.MM.YYYY')}</Text>
				<Text style={styles.activityDate}>{activity.description}</Text>
				{/* Ajoutez ici les autres informations de l'activité */}
			</View>

			{/* Bouton de suppression */}
			<DeleteActivityButton
				title={selectedItem.label}
				id={selectedItem._id}
			/>
			{openBottomSheet()}
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
	},

	contentContainer: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},

	header: {
		flexDirection: 'row',
		justifyContent: 'space-between', // Pour aligner "Réglages" à gauche et "Fermer" à droite
		alignItems: 'center', // Pour centrer verticalement
		padding: 10,
	},
	leftText: {
		color: 'white',
		fontSize: 14,

	},
	closeButton: {
		padding: 10,
	},
	closeButtonText: {
		color: 'white',
		fontSize: 14,
		paddingLeft: 15,
	},
	activityContent: {
		flex: 1,
		alignItems: 'center',
	},
	activityName: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 24,
		marginBottom: 10,
	},
	activityDate: {
		color: 'white',
		fontSize: 16,
	},
	deleteButtonContainer: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		marginBottom: 20,
	},
	deleteButton: {
		backgroundColor: 'red',
		borderRadius: 10,
		paddingVertical: 10,
		alignItems: 'center',
		marginTop: 20,
	},
	deleteButtonText: {
		color: 'white',
		fontWeight: 'bold',
		fontSize: 16,
	},
	bottomSheetContent: {
		padding: 16,
		backgroundColor: 'white',
	},
});

export default FullActivityInfos;
