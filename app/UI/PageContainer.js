import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaView, StyleSheet } from "react-native";
import { pageContainer } from "../Styles";

const PageContainer = ({ style, gradient = false, children }) => {
  let containerStyle = [styles.container]
  if (style) {
    if (Array.isArray(style)) 
      containerStyle.push(...style);
    else if (typeof style === 'object')
      containerStyle.push(style); 
  }

  return <SafeAreaView style={containerStyle}>
    {gradient && <LinearGradient
      colors={['#ae3b54', '#284b85']}
      style={StyleSheet.absoluteFill}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    />}
    {children}
  </SafeAreaView>
}

const styles = StyleSheet.create({container: pageContainer})

export default PageContainer;