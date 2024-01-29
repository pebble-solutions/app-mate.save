import {StyleSheet} from 'react-native';


const styleTunnel = StyleSheet.create({
  card: {
    backgroundColor: '#5fa2c2',
    padding: 15,
    margin: 10,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  questionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    padding:8,
    borderColor: '#ddd',
    backgroundColor: 'grey',
    borderWidth: 2,
    borderRadius : 8,
    marginTop: 15,
  },

  placeholderTextColor: 'black',

  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 15,
  },

  button: {
    backgroundColor: '#2b2d47',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  switchLabel: {
    marginRight: 10,
    fontSize: 16,
  },
  fileInputButton: {
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
    marginTop: 15,
    alignItems: 'center',
  },
  fileInputButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedFileText: {
    marginTop: 10,
    fontSize: 16,
    color: '#2ecc71', 
  },
});

export default styleTunnel;
