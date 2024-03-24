import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Svg, Circle, Text as SvgText, Line } from 'react-native-svg';

const daysOfWeek = ['S', 'M', 'Tu', 'W', 'Th', 'F', 'Sa'];

const ScheduleView = ({ schedule, onPress, onDelete }) => {
  const renderScheduleItems = () => {
    return (
      <View>
        <Graph scheduleItems={schedule.items} />
      </View>
    );
  };

  return (
    <View key={schedule.id}>
      <TouchableOpacity style={styles.schedule} onPress={() => onPress(schedule)}>
        <Text style={styles.title}>{schedule.name}</Text>
        {renderScheduleItems()}
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(schedule.schedule_id)}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

const Graph = ({ scheduleItems }) => {
  const points = [];
  let minTime = Infinity;
  let maxTime = -Infinity;

  scheduleItems.forEach(scheduleItem => {
    scheduleItem.arrival_weekdays.forEach(day => {
      const timeParts = scheduleItem.arrival_time.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const time = hours * 60 + minutes;
      if (time < minTime) {
        minTime = time;
      }
      if (time > maxTime) {
        maxTime = time;
      }
    });
  });

  const timeRange = maxTime - minTime;

  // Decide on the interval based on the range
  let interval;
  if (timeRange <= 720) { // 12 hours or less
    interval = 60; // 1 hour
  } else if (timeRange <= 1440) { // 24 hours or less
    interval = 120; // 2 hours
  } else {
    interval = 180; // 3 hours
  }

  // Adjusted min and max times with a buffer
  const adjustedMinTime = minTime - interval;
  const adjustedMaxTime = maxTime + interval;

  scheduleItems.forEach(scheduleItem => {
    scheduleItem.arrival_weekdays.forEach(day => {
      const x = day + 0.5; // x-coordinate is the weekday
      const timeParts = scheduleItem.arrival_time.split(':');
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);
      const time = hours * 60 + minutes;
      const y = 1 - (time - adjustedMinTime) / (adjustedMaxTime - adjustedMinTime + 5); // Invert y-coordinate
      points.push({ x, y });
    });
  });

  const svgWidth = 200;
  const svgHeight = 250;

  // Generate arrival times based on the new interval
  const arrivalTimes = [];
  for (let i = adjustedMinTime; i <= adjustedMaxTime; i += interval) {
    const hours = Math.floor(i / 60) % 24; // Wrap around 24 hours
    const minutes = i % 60;
    const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
    arrivalTimes.push(formattedTime);
  }

  const sundayX = (7 * (svgWidth / 8)) - 15;
  const xOffset = 30; // Adjusted x-coordinate for the x-axis labels

  return (
    <Svg height={svgHeight} width={svgWidth}>
      {/* Draw y-axis labels (arrival times) */}
      {arrivalTimes.map((time, index) => {
        // Calculate y-coordinate for the y-axis labels
        const y = svgHeight - ((index * (svgHeight - 20)) / (arrivalTimes.length - 1));
        // Draw horizontal lines
        return (
          <React.Fragment key={index}>
            <SvgText x={xOffset} y={y - 5} fontSize="10" fill="black" textAnchor="end">
              {time}
            </SvgText>
            {index !== 0 && (
              <Line x1={xOffset} y1={y - 10} x2={svgWidth} y2={y - 10} stroke="rgba(128,128,128,0.5)" strokeWidth="1" />
            )}
          </React.Fragment>
        );
      })}

      {/* Draw x-axis labels (days of the week) */}
      {daysOfWeek.map((day, index) => {
        const x = index === 6 ? sundayX : (index + 1) * (svgWidth / 8) - 10;
        return (
                      <SvgText key={index} x={x + 20} y={svgHeight - 5} fontSize="10" fill="black">
              {day}
            </SvgText>
        );
      })}

      {/* Draw circles for points */}
      {points.map((point, index) => (
        <Circle key={index} cx={(point.x + 1) * (svgWidth / 8)} cy={point.y * (svgHeight - 10)} r="3" fill="red" />
      ))}
    </Svg>
  );
};

const styles = StyleSheet.create({
  schedule: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    width: 230,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    alignSelf: 'center',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 5,
    alignSelf: 'center',
    marginTop: -5,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default ScheduleView;
