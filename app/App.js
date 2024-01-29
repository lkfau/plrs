import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Parking Spot{"\n"}Recommendation{"\n"}System</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#90CEFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  innerContainer: {
    margin: 30
  },

  title: {
    fontSize: 40
  }
});
