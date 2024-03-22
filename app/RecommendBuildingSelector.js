import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { stylesRecommendbuildingselector } from './Styles';
import { LinearGradient } from 'expo-linear-gradient';


const RecommendBuildingSelector = ({ buildings, onSelect }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const selectBuildingHandler = (building_id) => {
    setSelectedBuilding(building_id);
    onSelect(building_id);
  }

  return (
    <View>
      <View>
        <LinearGradient
            colors={['#ae3b54', '#284b85']}
            style={StyleSheet.absoluteFill}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          />
        <Text style={stylesRecommendbuildingselector.txt}>Select saved building</Text>
      </View>
      <Dropdown
        style={stylesRecommendbuildingselector.select}
        placeholderStyle={stylesRecommendbuildingselector.dropdownText}
        selectedTextStyle={stylesRecommendbuildingselector.dropdownText}
        inputSearchStyle={stylesRecommendbuildingselector.dropdownText}
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
  );
};
  
export default RecommendBuildingSelector
