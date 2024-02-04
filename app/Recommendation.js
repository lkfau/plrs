import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Recommendation = () => {
  const [showModal, setShowModal] = useState(false);

  const handleParkedButton = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.lotText}>Lot 1</Text>
      
      {/* Large square for map feature (Replace with your map component) */}
      <View style={styles.mapContainer}>
        {/* Your map component goes here */}
      </View>
      
      <Text style={styles.statusText}>Most Likely Full</Text>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get Directions</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Get New Recommendation</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={styles.button} onPress={handleParkedButton}>
        <Text style={styles.iparkedButton}>I Parked</Text>
      </TouchableOpacity>
      
      {/* Modal for "I Parked" button */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={styles.modalBackground}>
          {/* Pop-up screen for "I Parked" button */}
          <View style={styles.popupContainer}>
            <Text style={styles.popupText}>Is the parking lot fully occupied?</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.modalButton, styles.greenButton]}>
                <Text style={styles.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.modalButton, styles.redButton]}>
                <Text style={styles.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lotText: {
    fontSize: 24,
    marginBottom: 20,
  },
  mapContainer: {
    width: 300,
    height: 300, // Adjust according to your map component
    backgroundColor: '#ccc', // Placeholder color
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'red',
  },
  button: {
    //backgroundColor: '#007bff',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,    
  },
  iparkedButton: {
    backgroundColor: 'black',
    color: 'white',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    color: 'black',
    fontSize: 18,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  recommendationContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)', // Adjust opacity as needed
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 100,
    paddingHorizontal: 20,
  },
  popupText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButton: {
    flex: 1,
    paddingVertical: 70,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 30,
  },
  greenButton: {
    backgroundColor: '#03AC13',
  },
  redButton: {
    backgroundColor: 'red',
  },
});

export default Recommendation;