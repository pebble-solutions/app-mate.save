import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native';



const App = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Récapitulatif</Text>
        <Text style={styles.subtitle}>John Doe</Text>
        <View style={styles.buttonGroup}>
          {/* Les boutons 'jour', 'semaine', 'mois' */}
          {['jour', 'semaine', 'mois', 'periode'].map((buttonLabel) => (
            <TouchableOpacity key={buttonLabel} style={styles.button}>
              <Text style={styles.buttonText}>{buttonLabel}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* La carte avec les détails de la journée */}
        <View style={styles.card}>
    <Text style={styles.cardTitle}>Vendredi 23 Septembre 2023</Text>
    <Text style={styles.textWhite}>Pointage du matin : 8h00</Text>
    <Text style={styles.textWhite}>Pointage de l'après-midi : 13h30</Text>
    <Text style={styles.textWhite}>Heures travaillées : 7 heures</Text>
    {/* Ajoutez d'autres informations sur les pointages et les heures ici */}
  </View>
  <View style={styles.card}>
  <Text style={styles.cardTitle}>Informations et variables de paie :</Text>
  <Text style={styles.textWhite}>Salaire de base : $2000</Text>
  <Text style={styles.textWhite}>Heures supplémentaires : 5 heures</Text>
  <Text style={styles.textWhite}>Taux horaire des heures supplémentaires : $20/h</Text>
  <Text style={styles.textWhite}>Total des heures supplémentaires : $100</Text>
  {/* Ajoutez d'autres variables de paie fictives ici */}
</View>
<View style={styles.card}>
  <Text style={styles.cardTitle}>Commentaires</Text>
  <Text style={styles.textWhite}>• Ceci est un commentaire sur cette journée.</Text>
  <Text style={styles.textWhite}>• Un autre commentaire fictif.</Text>
  {/* Ajoutez d'autres commentaires fictifs ici */}
</View>
      </ScrollView>
    </View>
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




export default App;
