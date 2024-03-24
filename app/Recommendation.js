import { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeedbackModal from './FeedbackModal';
import { stylesRecommendation } from './Styles';

const initialRegion = {
  latitude: 26.371449,
  longitude: -80.102117,
  latitudeDelta: 0.024,
  longitudeDelta: 0.024
}; // Set initial region to a random location

const fullnessOptions = [
  { text: 'Vacant', color: 'green', threshold: 0.25},
  { text: 'Most likely vacant', color: 'gold', threshold: 0.5},
  { text: 'Most likely full', color: 'orange', threshold: 0.75},
  { text: 'Full', color: 'red', threshold: 1},
];

const Recommendation = ({ recommendation }) => {


  const [showModal, setShowModal] = useState(false);

  const destination = useMemo(() => ({
    latitude: parseFloat(recommendation.latitude),
    longitude: parseFloat(recommendation.longitude),
    latitudeDelta: 0.024,
    longitudeDelta: 0.024
  }), [recommendation.latitude, recommendation.longitude]);

  const openMapHandler = () => {
    // Open Apple Maps with directions from current location to the destination
    let destinationURL = null;
    if (Platform.OS == 'ios') {
      destinationURL = `http://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}`;
    } else if (Platform.OS === 'android') {
      destinationURL = `https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`;
    }
    if (destinationURL) Linking.openURL(destinationURL);
  };
  console.log(recommendation)
  const fullnessOption = useMemo(() => fullnessOptions.find(option => recommendation.fullness < option.threshold), [recommendation.fullness]);

  return (
    <>
      <View style={styles.recommendationContent}>
        <Text style={styles.lotText}>{recommendation.lot_name}</Text>
        <View style={styles.mapContainer}>
          <MapView style={{ flex: 1 }} initialRegion={initialRegion}>      
            <Marker coordinate={destination} title={recommendation.lot_name} />        
          </MapView>
        </View>
        <Text style={[styles.statusText, {color: fullnessOption.color}]}>{fullnessOption.text}</Text>
        <TouchableOpacity style={styles.button} onPress={openMapHandler}>
          <Text style={styles.buttonText}>Get Directions</Text>
        </TouchableOpacity>    
        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
          <Text style={styles.iparkedButton}>I Parked</Text>
        </TouchableOpacity>    
      </View>
      <FeedbackModal lot_id={recommendation.lot_id} visible={showModal} onHide={() => setShowModal(false)} />
    </>
  );
}

const styles = StyleSheet.create({
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
    textAlign: 'center',
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
  }
});

export default Recommendation;