import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Switch } from 'react-native';

const Settings = () => {
  // Faux paramètres
  const settingsData = [
    {
      title: 'Notifications',
      description: 'Activer/désactiver les notifications',
      toggle: true, // Paramètre avec bascule on/off
      value: true, // État actuel de la bascule
    },
    {
      title: 'Thème',
      description: 'Changer le thème du timer de l\'application',
      toggle: false,
      value: false,
    },
    {
      title: 'Son',
      description: 'Régler le volume du son',
      toggle: true,
      value: false,
    },
    {
      title: 'Mode Nuit',
      description: 'Activer/désactiver le mode nuit',
      toggle: true,
      value: true,
    },
    {
      title: 'Synchronisation automatique',
      description: 'Activer/désactiver la synchronisation automatique',
      toggle: true,
      value: true,
    },
    // Ajoutez d'autres faux paramètres ici
  ];

  const toggleSwitch = (index: number) => {
    const updatedSettingsData = [...settingsData];
    updatedSettingsData[index].value = !updatedSettingsData[index].value;
    // Vous pouvez ajouter ici la logique pour gérer l'état du paramètre
    // par exemple, activer/désactiver les notifications, changer le thème, etc.
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>
      {settingsData.map((setting, index) => (
        <TouchableOpacity key={index} style={styles.settingCard}>
          <View>
            <Text style={styles.settingTitle}>{setting.title}</Text>
            <Text style={styles.settingDescription}>{setting.description}</Text>
          </View>
          {setting.toggle && (
            <Switch
              value={setting.value}
              onValueChange={() => toggleSwitch(index)}
            />
          )}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 80, // Décalage vers le bas
    paddingHorizontal: 20,
    backgroundColor: 'rgba(34,36,40,1)', // Fond d'écran d'origine
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Couleur du texte de l'en-tête
  },
  settingCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(50, 49, 54,1)',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white', // Couleur du texte
  },
  settingDescription: {
    fontSize: 14,
    color: '#999',
  },
});

export default Settings;
