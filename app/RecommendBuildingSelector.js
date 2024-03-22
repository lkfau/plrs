import React, { useState } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

const RecommendBuildingSelector = ({ buildings, onSelect }) => {
  const [selectedBuilding, setSelectedBuilding] = useState(null);

  const selectBuildingHandler = (building_id) => {
    setSelectedBuilding(building_id);
    onSelect(building_id);
  }

  return (
    <View>
      <Text style={{ textAlign: 'center', padding: 25 }}>Select saved building</Text>
      <Dropdown
        style={styles.select}
        placeholderStyle={styles.dropdownText}
        selectedTextStyle={styles.dropdownText}
        inputSearchStyle={styles.dropdownText}
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
}

const styles = StyleSheet.create({
  select: {
    borderColor: 'gray',
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 8,
    padding: 8,
  },
  dropdownText: {
    fontSize: 16,
  }
});
  
export default RecommendBuildingSelector
