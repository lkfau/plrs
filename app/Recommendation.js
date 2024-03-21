import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Button, Linking } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { stylesRecommendation } from './Styles';

const Recommendation = ({ schedule_id, building_id }) => {
  console.log('schedule', schedule_id, 'building', building_id)
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [destination, setDestination] = useState(null);
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }; // Set initial region to a random location

  const navigation = useNavigation();

  const handleParkedButton = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const getNewRecommendationHandler = () => {
    navigation.navigate('GetRecommendation')
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
        <View style={stylesRecommendation.recommendationContent}>
          <Text style={stylesRecommendation.lotText}>Lot {currentPage}</Text>
          <View style={stylesRecommendation.mapContainer}>
            <MapView style={{ flex: 1 }} initialRegion={initialRegion}>
              {destination && (
                <Marker coordinate={destination} title="Destination" />
              )}
            </MapView>
          </View>
          <Text style={stylesRecommendation.statusText}>Most Likely Full</Text>
          <TouchableOpacity style={stylesRecommendation.button} onPress={handleNextPage}>
            <Text style={stylesRecommendation.buttonText}>Get New Recommendation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesRecommendation.button} onPress={handleParkedButton}>
            <Text style={stylesRecommendation.iparkedButton}>I Parked</Text>
          </TouchableOpacity>
          {destination && (
            <TouchableOpacity style={stylesRecommendation.button} onPress={handleGetDirections}>
              <Text style={stylesRecommendation.buttonText}>Get Directions from Me</Text>
            </TouchableOpacity>
          )}
        </View>
      );
    } else {
      return (
        <View style={stylesRecommendation.recommendationContent}>
          <Text style={stylesRecommendation.lotText}>Sorry, we are out of recommendations.</Text>
          <TouchableOpacity style={stylesRecommendation.button} onPress={handleGoToRecommendation1}>
            <Text style={stylesRecommendation.buttonText}>Go back to recommendation 1</Text>
          </TouchableOpacity>
          <TouchableOpacity style={stylesRecommendation.button} onPress={getNewRecommendationHandler}>
            <Text style={stylesRecommendation.buttonText}>Get new recommendations</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  const handleSetDestination = () => {
    setDestination(getRandomLocation());
  };

  return (
    <View style={stylesRecommendation.container}>
      {renderRecommendationContent()}
      {currentPage <= 3 && (
        <TouchableOpacity style={stylesRecommendation.arrowButton} onPress={handleNextPage}>
          <Text style={stylesRecommendation.arrowText}>➜</Text>
        </TouchableOpacity>
      )}
      {/* Modal for "I Parked" button */}
      <Modal visible={showModal} transparent animationType="slide">
        <View style={stylesRecommendation.modalBackground}>
          {/* Pop-up screen for "I Parked" button */}
          <View style={stylesRecommendation.popupContainer}>
            <Text style={stylesRecommendation.popupText}>Is the parking lot fully occupied?</Text>
            <View style={stylesRecommendation.buttonContainer}>
              <TouchableOpacity style={[stylesRecommendation.modalButton, stylesRecommendation.greenButton]}>
                <Text style={stylesRecommendation.buttonText}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[stylesRecommendation.modalButton, stylesRecommendation.redButton]}>
                <Text style={stylesRecommendation.buttonText}>No</Text>
              </TouchableOpacity>
            </View>
            <Button title="Close" onPress={handleCloseModal} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default Recommendation;
