import React, { Children, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import ChatModal from './ChatModal';

const Chat = () => {


  const [modalVisible, setModalVisible] = useState(false);
  const [currentConversation, setCurrentConversation] = useState(null);
  // Fausses données de conversation
  const conversationData = [
    {
      id: '1',
      sender: 'Mari Lehoux',
      message: 'Salut, comment ça va ?',
      time: '10:00 AM',
    },
    {
      id: '2',
      sender: 'Toto',
      message: 'Ça va bien, merci !',
      time: '10:05 AM',
    },
    {
      id: '3',
      sender: 'Guillaume Modard',
      message: 'Quoi de neuf ?',
      time: '10:10 AM',
    },
    {
      id: '4',
      sender: 'Jules César',
      message: 'Rien de spécial, et toi ?',
      time: '10:15 AM',
    },
    {
      id: '5',
      sender: 'FER EXPERT',
      message: 'Je vais bien, merci !',
      time: '10:20 AM',
    },
    {
      id: '6',
      sender: 'Killian Kopp',
      message: 'Quoi de neuf de ton côté ?',
      time: '10:25 AM',
    },
    {
      id: '7',
      sender: 'YOGA MONTREAL',
      message: 'Je travaille sur un nouveau projet.',
      time: '10:30 AM',
    },
    {
      id: '8',
      sender: 'CHANTIER BRUZ',
      message: 'Cela semble excitant !',
      time: '10:35 AM',
    },
    {
      id: '9',
      sender: '9dot8',
      message: 'Salut à tous !',
      time: '10:40 AM',
    },
    {
      id: '10',
      sender: 'DES CHAINES TON BICLOU',
      message: 'Bonjour ! Comment ça va ?',
      time: '10:45 AM',
    },
    // Ajoutez d'autres conversations ici
  ];

  // Fonction pour ouvrir la modale
  const handleOpenModal = (conversation) => {
    setCurrentConversation(conversation);
    setModalVisible(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Chat</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 90 }}
        data={conversationData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenModal(item)}>
            <View style={styles.conversationItem}>
              <Text style={styles.sender}>{item.sender}</Text>
              <Text style={styles.message}>{item.message}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      {currentConversation && (
        <ChatModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          conversation={currentConversation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40, // Décalage vers le bas
    backgroundColor: 'rgba(34,36,40,1)', // Fond d'écran d'origine
  },
  header: {
    alignItems: 'center',
    marginVertical: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white', // Couleur du texte de l'en-tête
  },
  conversationItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  // selectionner la derniere conversation
  'conversationItem:last-child': {
    marginBottom: 200,
    border: '1px solid red',
  },

  sender: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black', // Couleur du nom de l'expéditeur
  },
  message: {
    fontSize: 14,
    color: 'black', // Couleur du message
  },
  time: {
    fontSize: 12,
    color: '#666',
  },
});

export default Chat;
