import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import ScheduleItem from './ScheduleItem';
import { stylesScheduleeditor } from './Styles';

const ScheduleEditor = ({ schedule, setSchedule }) => {

  const changeNameHandler = (newName) => {
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      name: newName
    }));
  }

  const changeItemHandler = (itemFunction, index) => {
    setSchedule(prevSchedule => {
      let newItems = [...prevSchedule.items];
      newItems[index] = itemFunction(newItems[index]);

      return {
        ...prevSchedule,
        items: newItems
      }
    })
  }

  const addItemHandler = () => {
    setSchedule(prevSchedule => ({
      ...prevSchedule,
      items: [...prevSchedule.items, {
        building_id: 1,
        arrival_weekdays: [1],
        arrival_time: "07:00:00"
      }]
    }))
  }

  const deleteItemHandler = (index) => {
    setSchedule(prevSchedule => {
      let newItems = [...prevSchedule.items];
      newItems.splice(index, 1);
      return {
        ...prevSchedule,
        items: newItems
      }
    });
  }

  if (schedule) {
    return (
      <View style={stylesScheduleeditor.container}>
          <Text style={stylesScheduleeditor.label}>Schedule Name</Text>
          <TextInput
            style={stylesScheduleeditor.titleInput}
            placeholder="Enter title"
            value={schedule.name}
            onChangeText={changeNameHandler}
          />
          <Text style={stylesScheduleeditor.label}>Places</Text>
          {schedule.items.map((item, index) => (
            <ScheduleItem key={index} item={item} onChange={itemFunction => changeItemHandler(itemFunction, index)} onDelete={() => deleteItemHandler(index)} />
          ))}         
          <TouchableOpacity
            style={stylesScheduleeditor.addButton}
            onPress={addItemHandler}
          >
            <Text style={stylesScheduleeditor.addButtonText}>Add place</Text> 
          </TouchableOpacity>
      
      </View>
    );
  } else {
    return null;
  }
};

export default ScheduleEditor;