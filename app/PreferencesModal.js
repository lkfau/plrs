import React, { useContext, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import DataContext from './context/data-context';
import { button } from './Styles';

const PreferencesModal = ({ visible, onClose }) => {
  const ctx = useContext(DataContext);

  const [loading, setLoading] = useState(true);

  const [firstBuildingSelected, setFirstBuildingSelected] = useState(false);
  const [lastBuildingSelected, setLastBuildingSelected] = useState(false);

  const [lotVacancySelected, setLotVacancySelected] = useState(false);
  const [distanceSelected, setDistanceSelected] = useState(false);

  const [yesMeteredSelected, setYesMeteredSelected] = useState(false);
  const [noMeteredSelected, setNoMeteredSelected] = useState(false);

  const fetchPreferences = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/preferences`, {
        headers: {'Authorization': 'Bearer ' + ctx.getSessionID()}
    });

    let preference_results = await response.json();
    if (preference_results.first_or_last_location)
        setLastBuildingSelected(true);
    else
        setFirstBuildingSelected(true);

    if (preference_results.distance_or_vacancy == "d")
        setDistanceSelected(true)
    else
        setLotVacancySelected(true)

    if (preference_results.include_metered)
        setYesMeteredSelected(true);
    else
        setNoMeteredSelected(true);

    setLoading(false);
  }

  const savePreferences = async() => {
    const response = await fetch(`${process.env.EXPO_PUBLIC_SERVER_URL}/preferences`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + ctx.getSessionID() },
      body: JSON.stringify({
        distance_or_vacancy: distanceSelected ? 'd' : 'v',
        first_or_last_location: lastBuildingSelected,
        include_metered: yesMeteredSelected
      })
    })

    if (response.status == 200) {
      onClose();
    } else {
      console.log('preference save failed')
    }
  }

  const handleFirstBuildingSelection = () => {
    if (!firstBuildingSelected) {
      setFirstBuildingSelected(true);
      setLastBuildingSelected(false);
    }
  };

  const handleLastBuildingSelection = () => {
    if (!lastBuildingSelected) {
      setLastBuildingSelected(true);
      setFirstBuildingSelected(false);
    }
  };

  const handleLotVacancySelection = () => {
    if (!lotVacancySelected) {
      setLotVacancySelected(true);
      setDistanceSelected(false);
    }
  };

  const handleDistanceSelection = () => {
    if (!distanceSelected) {
      setDistanceSelected(true);
      setLotVacancySelected(false);
    }
  };

  const handleYesMeteredSelection = () => {
    if (!yesMeteredSelected) {
      setYesMeteredSelected(true);
      setNoMeteredSelected(false);
    }
  };

  const handleNoMeteredSelection = () => {
    if (!noMeteredSelected) {
      setNoMeteredSelected(true);
      setYesMeteredSelected(false);
    }
  };

  const handlePressOut = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    setLoading(true);
    if (visible) fetchPreferences();
  }, [visible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        }}
        activeOpacity={1}
        onPressOut={handlePressOut}
      >
        <View style={{
          backgroundColor: '#fff',
          width: 300,
          height: 520,
          padding: 20,
          borderRadius: 10,
          display: 'flex',
          justifyContent: 'space-between',
        }}>
          {!loading && <ScrollView>
            <View style={{ flexDirection: 'column', marginBottom: 20 }}>
              <Text style={{ flex: 1, textAlign: 'center', marginBottom: 15,fontWeight:'bold' }}>Select your parking lot recommendation preferences</Text>
              <Text style={{ flex: 1, textAlign: 'left' }}>Would you like lot recommendations near your first or last building location? </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 15 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRightWidth:0,
                  borderWidth: 1,
                  borderColor: firstBuildingSelected ? '#0073ef' : 'black',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRadius: 5,
                  backgroundColor: firstBuildingSelected ? '#0073ef' : 'white',
                }}
                onPress={handleFirstBuildingSelection}
              >
                <Text style={{ color: firstBuildingSelected ? 'white' : 'black' }}>First Building</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderLeftWidth:0,
                  borderWidth: 1,
                  borderColor: lastBuildingSelected ? '#0073ef' : 'black',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderRadius: 5,
                  backgroundColor: lastBuildingSelected ? '#0073ef' : 'white',
                }}
                onPress={handleLastBuildingSelection}
              >
                <Text style={{ color: lastBuildingSelected ? 'white' : 'black' }}>Last Building</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', marginBottom: 20 }}>
              <Text style={{ flex: 1, textAlign: 'left' }}>Would you like to prioritze lot vacancy or distance to building location for your lot recommendations? </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRightWidth:0,
                  borderWidth: 1,
                  borderColor: lotVacancySelected ? '#0073ef' : 'black',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRadius: 5,
                  backgroundColor: lotVacancySelected ? '#0073ef' : 'white',
                }}
                onPress={handleLotVacancySelection}
              >
                <Text style={{ color: lotVacancySelected ? 'white' : 'black' }}>Lot Vacancy</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderLeftWidth:0,
                  borderWidth: 1,
                  borderColor: distanceSelected ? '#0073ef' : 'black',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderRadius: 5,
                  backgroundColor: distanceSelected ? '#0073ef' : 'white',
                }}
                onPress={handleDistanceSelection}
              >
                <Text style={{ color: distanceSelected ? 'white' : 'black' }}>Distance</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', marginBottom: 20 }}>
              <Text style={{ flex: 1, textAlign: 'left' }}>Would you like to include metered lots for your lot recommendations? </Text>
            </View>
            <View style={{ flexDirection: 'row', marginBottom: 10 }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderRightWidth:0,
                  borderWidth: 1,
                  borderColor: yesMeteredSelected ? '#0073ef' : 'black',
                  borderTopRightRadius: 0,
                  borderBottomRightRadius: 0,
                  borderRadius: 5,
                  backgroundColor: yesMeteredSelected ? '#0073ef' : 'white',
                }}
                onPress={handleYesMeteredSelection}
              >
                <Text style={{ color: yesMeteredSelected ? 'white' : 'black' }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  flex: 1,
                  alignItems: 'center',
                  paddingVertical: 10,
                  borderLeftWidth:0,
                  borderWidth: 1,
                  borderColor: noMeteredSelected ? '#0073ef' : 'black',
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                  borderRadius: 5,
                  backgroundColor: noMeteredSelected ? '#0073ef' : 'white',
                }}
                onPress={handleNoMeteredSelection}
              >
                <Text style={{ color: noMeteredSelected ? 'white' : 'black' }}>No</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>}
          <TouchableOpacity style={{ ...button.containerOutline, marginTop: 10, borderRadius: 50 }} onPress={savePreferences}>
            <Text style={button.title}>Save Preferences</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

export default PreferencesModal;
