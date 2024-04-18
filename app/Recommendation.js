import React, { useState, useMemo } from 'react';
import { View, Text, TouchableOpacity, Linking, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import FeedbackModal from './FeedbackModal';
import { stylesRecommendation, button, warning } from './Styles';

const initialRegion = {
  latitude: 26.371449,
  longitude: -80.102117,
  latitudeDelta: 0.024,
  longitudeDelta: 0.024
};

const fullnessOptions = [
  { text: 'Vacant', color: 'green', threshold: 0.25 },
  { text: 'Most likely vacant', color: 'gold', threshold: 0.5 },
  { text: 'Most likely full', color: 'orange', threshold: 0.75 },
  { text: 'Full', color: 'red', threshold: 1 },
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
    let destinationURL = null;
    if (Platform.OS == 'ios') {
      destinationURL = `http://maps.apple.com/?daddr=${destination.latitude},${destination.longitude}`;
    } else if (Platform.OS === 'android') {
      destinationURL = `https://www.google.com/maps?q=${destination.latitude},${destination.longitude}`;
    }
    if (destinationURL) Linking.openURL(destinationURL);
  };

  const fullnessOption = useMemo(() => fullnessOptions.find(option => recommendation.fullness < option.threshold), [recommendation.fullness]);

  return (
    <View>
      <View style={stylesRecommendation.greaterMapContainer}>
        <Text style={stylesRecommendation.lotText}>{recommendation.lot_name}</Text>
        <View style={stylesRecommendation.mapContainer}>
          <MapView style={stylesRecommendation.map} initialRegion={initialRegion}>
            <Marker coordinate={destination} title={recommendation.lot_name} />
          </MapView>
          <TouchableOpacity style={stylesRecommendation.buttonGetDirections} onPress={openMapHandler}>
            <Text style={stylesRecommendation.buttonText}>Get Directions</Text>
          </TouchableOpacity>
        </View>
        <View style={stylesRecommendation.indicatorContainer}>
          <Text style={[stylesRecommendation.statusText, { color: fullnessOption.color }]}>{fullnessOption.text}</Text>
          <Text style={stylesRecommendation.distance}>{recommendation.feet_to_destination} ft</Text>
        </View>
      </View>
      {recommendation.payment_required == 1 && <View style={warning.container}>
        <Text style={[warning.text, {fontWeight: 'bold'}]}>Warning:</Text>
        <Text style={warning.text}> Metered parking only!</Text>
      </View>}
      <TouchableOpacity style={[button.container, { margin: 0 }]} onPress={() => setShowModal(true)}>
        <Text style={button.title}>I Parked</Text>
      </TouchableOpacity>
      <FeedbackModal lot_id={recommendation.lot_id} visible={showModal} onHide={() => setShowModal(false)} />
    </View>
  );
}

export default Recommendation;