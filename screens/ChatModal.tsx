import React from 'react';
import {
    Modal,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    KeyboardAvoidingView,
    Image,
    Platform
} from 'react-native';

type Props = {
    visible: boolean;
    onClose: () => void;
    conversation: {
        id: string;
        sender: string;
        message: string;
        time: string;
    };
};

const ChatModal: React.FC<Props> = ({ visible, onClose, conversation }) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            onRequestClose={onClose}
            transparent={false}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={styles.flexOne}
            >
                <View style={styles.modalContainer}>
                    <Text style={styles.modalTitle}>{conversation.sender}</Text>
                    {/* Ici, vous pouvez ajouter une ScrollView pour afficher les messages */}
                </View>

                <View style={styles.footer}>
                    <TextInput style={styles.input} placeholder="Tapez votre message..." />
                    <TouchableOpacity onPress={() => { /* Logique d'envoi de message */ }} style={styles.sendButton}>
                        <Image source={require('../assets/img/paperPlane.png')} style={styles.sendIcon} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>

            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text>Fermer</Text>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    flexOne: {
        flex: 1,
    },
    modalContainer: {
        flex: 1,
        paddingTop: 40,
        paddingHorizontal: 20,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 20,
        position: 'absolute',
        bottom: Platform.OS === "ios" ? 20 : 10,
        left: 0,
        right: 0,
        backgroundColor: '#FFF', // Vous pouvez changer la couleur de fond si nécessaire
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'gray',
        padding: 10,
        borderRadius: 10,
        marginRight: 0,
        backgroundColor: 'white',
    },

    sendButton: {
        backgroundColor: '#7B1FA2', // Fond violet pour le bouton d'envoi
        padding: 8,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 10,
    },

    sendIcon: {
        width: 24,
        height: 24,

        // Vous pouvez ajuster la taille si nécessaire
    },
    closeButton: {
        position: 'absolute',
        right: 20,
        top: 40,
    },
    // Ajoutez des styles supplémentaires si nécessaire
});

export default ChatModal;
