import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { stylesRecommendbuildingselector } from './Styles';
import { stylesScheduleselector } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';

const RecommendBuildingSelector = ({ buildings, onSelect }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const selectBuildingHandler = (building_id) => {
    setSelectedBuilding(building_id);
    onSelect(building_id);
  }

  return (
    <LinearGradient
      colors={['#ae3b54', '#284b85']}
      style={stylesScheduleselector.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={stylesScheduleselector.dropdownContainer}>
        <Text style={stylesScheduleselector.txt}>Select saved building</Text>
        <Dropdown
          style={stylesScheduleselector.select}
          placeholderStyle={stylesScheduleselector.dropdownText}
          selectedTextStyle={stylesScheduleselector.dropdownText}
          inputSearchStyle={stylesScheduleselector.dropdownText}
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