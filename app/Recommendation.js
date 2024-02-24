import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

const Recommendation = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [destination, setDestination] = useState(null);
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }; // Set initial region to a random location

  const handleParkedButton = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handleReenter = () => {
    // Handle navigation to the schedules page
  };

  const handleGoToRecommendation1 = () => {
    setCurrentPage(1);
  };

  const handleGetDirections = () => {
    // Open Apple Maps with directions from current location to the destination
    const destinationURL = `http://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}`;
    Linking.openURL(destinationURL);
  };

  const getRandomLocation = () => {
    // Function to generate random latitude and longitude for destination
    const randomLatitude = 37.78825 + Math.random() * (0.1);
    const randomLongitude = -122.4324 + Math.random() * (0.1);
    return { latitude: randomLatitude, longitude: randomLongitude };
  };

  const renderRecommendationContent = () => {
    if (currentPage <= 3) {
      return (
        <View style={styles.recommendationContent}>
          <Text style={styles.lotText}>Lot {currentPage}</Text>
          <View style={styles.mapContainer}>
            <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
              {destination && (
                <Marker coordinate={destination} title="Destination" />
              )}
            </MapView>
          </View>
          <Text style={styles.statusText}>Most Likely Full</Text>
          <TouchableOpacity style={styles.button} onPress={handleNextPage}>
            <Text style={styles.buttonText}>Get New Recommendation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleParkedButton}>
            <Text style={styles.iparkedButton}>I Parked</Text>
          </TouchableOpacity>
          {destination && (
            <TouchableOpacity style={styles.button} onPress={handleGetDirections}>
              <Text style={styles.buttonText}>Get Directions from Me</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <View style={styles.recommendationContent}>
          <Text style={styles.lotText}>Sorry, we are out of recommendations.</Text>
          <TouchableOpacity style={styles.button} onPress={handleGoToRecommendation1}>
            <Text style={styles.buttonText}>Go back to recommendation 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleReenter}>
            <Text style={styles.buttonText}>Reenter</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const handleSetDestination = () => {
    setDestination(getRandomLocation());
  };

  return (
    <View style={styles.container}>
      {renderRecommendationContent()}
      {currentPage <= 3 && (
        <TouchableOpacity style={styles.arrowButton} onPress={handleNextPage}>
          <Text style={styles.arrowText}>➜</Text>
        </TouchableOpacity>
      )}
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
    backgroundColor: '#fff', // Set background color here
  },
  lotText: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  mapContainer: {
    width: 300,
    height: 300, // Adjust according to your map component
    marginBottom: 20,
  },
  statusText: {
    fontSize: 18,
    marginBottom: 10,
    color: 'red',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
    backgroundColor: 'transparent', // Remove background color
    alignSelf: 'center',
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent', // Remove background color
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
  arrowButton: {
    position: 'absolute',
    right: 20,
    top: '50%',
    transform: [{ translateY: -12 }],
  },
  arrowText: {
    fontSize: 30,
  },
});

export default Recommendation;
