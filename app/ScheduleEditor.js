import { useEffect, useMemo, useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ScheduleItem from './ScheduleItem';

const ScheduleEditor = ({ schedule, onNameChange }) => {
  const [scheduleName, setScheduleName] = useState(schedule?.name || "");
  const [scheduleItems, setScheduleItems] = useState(schedule?.items || []);
  
  const newItem = useMemo(() => ({
    building_id: 1,
    arrival_weekdays: [1],
    arrival_time: "07:00:00"
  }), []);

  const changeNameHandler = (newName) => {
    setScheduleName(newName);
    onNameChange(newName);
  }

  const changeItemHandler = (itemFunction, index) => {
    setScheduleItems(prevItems => {
      let newItems = [...prevItems];
      newItems[index] = itemFunction(newItems[index]);
      return newItems;
    });
  }

  const addItemHandler = () => {
    setScheduleItems(prevItems => [
      ...prevItems,
      { ...newItem }
    ])
  }

  const deleteItemHandler = (index) => {
    setScheduleItems(prevItems => {
      let newItems = [...prevItems]
      newItems.splice(index, 1);
      return newItems;
    });
  }

  useEffect(() => {
    setScheduleName(schedule?.name || "");
    setScheduleItems(schedule?.items || []);
  }, [schedule]);

  if (schedule) {
    return (
      <View style={styles.container}>
          <Text style={styles.label}>Schedule Name</Text>
          <TextInput
            style={styles.titleInput}
            placeholder="Enter title"
            value={scheduleName}
            onChangeText={changeNameHandler}
          />
          <Text style={styles.label}>Places</Text>
          {scheduleItems.map((item, index) => (
            <ScheduleItem key={index} item={item} onChange={itemFunction => changeItemHandler(itemFunction, index)} onDelete={() => deleteItemHandler(index)} />
          ))}         
          <TouchableOpacity
            style={styles.addButton}
            onPress={addItemHandler}
          >
            <Text style={styles.addButtonText}>Add place</Text> 
          </TouchableOpacity>
      
      </View>
    );
  } else {
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  label: {
    marginBottom: 8,
    marginLeft: 8,
    fontSize: 15
  },
  titleInput: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'gray',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 32,
  },
  addButton: {
    alignItems: 'center',
    margin: 8,
    padding: 12,
    borderRadius: 8,
    backgroundColor: 'green'
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16
  }
});

export default ScheduleEditor;