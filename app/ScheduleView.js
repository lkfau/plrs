import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Svg, Circle, Text as SvgText, Line } from 'react-native-svg';
import Ionicons from '@expo/vector-icons/Ionicons';
import { stylesScheduleview } from './Styles';

const daysOfWeek = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const itemColors = ['#012F66','#CD0000', '#000000', '#719510', '#5A483E', '#9F966E']
const ScheduleView = ({ schedule, onPress, onDelete }) => {

  return (
    <View key={schedule.id}>
      <TouchableWithoutFeedback onPress={() => onPress(schedule)}>
        <View style={stylesScheduleview.schedule}>
        <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={stylesScheduleview.title}>{schedule.name}</Text>
          <TouchableOpacity style={stylesScheduleview.deleteButton} onPress={onDelete}>
            <Text style={stylesScheduleview.deleteButtonText}><Ionicons name="close" size={16}/></Text>
          </TouchableOpacity>
        </View>
        <Graph scheduleItems={schedule.items} />
        </View>
      </TouchableWithoutFeedback>

    </View>
  );
};

const Graph = ({ scheduleItems }) => {
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    return `${parseInt(hours) && parseInt(hours) != 12 ? parseInt(hours) % 12 : 12
      }:${minutes.toString().padStart(2, '0')
      } ${hours >= 12 ? 'PM' : 'AM'
      }`
  }

  const points = [];
  let minTime = Infinity;
  let maxTime = -Infinity;

  scheduleItems.forEach(scheduleItem => {
    scheduleItem.arrival_weekdays.forEach(day => {
      const time = parseInt(scheduleItem.arrival_time) * 60 + parseInt(scheduleItem.arrival_time.substring(3));
      if (time < minTime) minTime = time;
      if (time > maxTime) maxTime = time;
    });
  });

  const timeRange = maxTime - minTime;

  // Decide on the interval based on the range
  let interval;
  if (timeRange <= 90) interval = 15;
  else if (timeRange <= 240) interval = 30;
  else if (timeRange <= 480) interval = 60; 
  else interval = 120;

  // Adjusted min and max times with a buffer
  const adjustedMinTime = minTime - (minTime % interval);
  const adjustedMaxTime = (maxTime + interval) - (maxTime % interval);
  const adjustedTimeRange = adjustedMaxTime - adjustedMinTime

  const svgWidth = 300;
  const svgHeight = 250;
  const displayTop = 20, displayBottom = svgHeight - 25, displayHeight = displayBottom - displayTop;
  const displayLeft = 75, displayRight = svgWidth - 15, displayWidth = displayRight - displayLeft;

  scheduleItems.forEach((scheduleItem, index) => {
    scheduleItem.arrival_weekdays.forEach(day => {
      const time = parseInt(scheduleItem.arrival_time) * 60 + parseInt(scheduleItem.arrival_time.substring(3));
      points.push({
        x: displayLeft + (displayWidth * (day / 6)),
        y: displayBottom - (displayHeight * ((time - adjustedMinTime) / (adjustedTimeRange))),
        itemIndex: index
      });
    });
  });

  // Generate arrival times based on the new interval
  const arrivalTimes = [];
  for (let i = adjustedMinTime; i <= adjustedMaxTime; i += interval) {
    const hours = Math.floor(i / 60) % 24; // Wrap around 24 hours
    const minutes = i % 60;
    const time = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    arrivalTimes.push(formatTime(time));
  }

  const xOffset = 50; // Adjusted x-coordinate for the x-axis labels

  return (
    <Svg height={svgHeight} width={svgWidth} >
      {/* Draw y-axis labels (arrival times) */}
      {arrivalTimes.map((time, index) => {
        // Calculate y-coordinate for the y-axis labels
        const y = displayBottom - (index * (displayHeight / (arrivalTimes.length - 1)))
        // Draw horizontal lines
        return (
          <React.Fragment key={index}>
            <SvgText 
              x={xOffset} y={y + 4} 
              fontSize="12" fill="#999" textAnchor="end"
            >
              {time} 
            </SvgText>
            <Line x1={xOffset + 5} y1={y} x2={svgWidth} y2={y} stroke="#ddd" strokeWidth="1" />          
          </React.Fragment>
        );
      })}

      {/* Draw x-axis labels (days of the week) */}
      {daysOfWeek.map((day, index) => {
        const x = displayLeft + (displayWidth * (index / 6))
        return (
          <SvgText key={index} x={x - 6} y={svgHeight} fontSize="14"  fill="#999"
            >
              {day}
            </SvgText>
        );
      })}

      {/* Draw circles for points */}
      {points.map((point, index) => (
        <Circle key={index} cx={point.x} cy={point.y} r="5" fill={itemColors[point.itemIndex]} />
      ))}
    </Svg>
  );
};

export default ScheduleView;