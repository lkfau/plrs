import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { recommendButtons } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';

const RecommendBuildingSelector = ({ buildings, onSelect, invertGradient }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const selectBuildingHandler = (building_id) => {
    setSelectedBuilding(building_id);
    onSelect(building_id);
  }

  return (
    <LinearGradient
      colors={['#ae3b54', '#284b85']}
      style={recommendButtons.container}
      start={{ x: invertGradient ? 1 : 0, y: 0 }}
      end={{ x: invertGradient ? 0 : 1, y: 0 }}
    >
      <View style={recommendButtons.dropdownContainer}>
        <Text style={recommendButtons.txt}>Select saved building</Text>
        <Dropdown
          style={recommendButtons.select}
          placeholderStyle={recommendButtons.dropdownText}
          selectedTextStyle={recommendButtons.dropdownText}
          inputSearchStyle={recommendButtons.dropdownText}
          data={buildings}
          search
          maxHeight={300}
          labelField="building_name"
          valueField="building_id"
          placeholder="Select item"
          searchPlaceholder="Search..."
          value={selectedBuilding}
          onChange={item => selectBuildingHandler(item.building_id)}
        />
      </View>
    </LinearGradient>
  );
}

export default RecommendBuildingSelector;