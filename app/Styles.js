import { StyleSheet } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export const stylesAbout = StyleSheet.create({
    //About
    paragraph: {
      paddingLeft: 10,
      flex: 1,
      fontSize: 16,
    },
    title: {
      textAlign: 'center',
      color: '#ffffff',
      paddingTop: 25,
      paddingBottom: 25,
      fontSize: 25,
    },
    m_paragraph: {
      textAlign: 'left',
      color: '#ffffff',
      paddingBottom: 50,
      paddingLeft: 15,
      paddingRight: 15,
    },
    b_paragraph: {
      fontSize: 25,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#000000',
      paddingTop: 15,
      paddingBottom: 10,
      paddingLeft: 15,
      paddingRight: 15,
    },
    img: {
      width: 100,
      height: 100,
      resizeMode: 'stretch',
      borderWidth: 2,
      borderColor: '#ae3b54',
      borderRadius: 100,
    },
    teamMember: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 20,
    },
    reverse: {
      flexDirection: 'row-reverse',
    },
});

export const stylesHome = StyleSheet.create({
    //Home
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      innerContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
      },
      header: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: -100,
        marginBottom: 50,
      },
      button: {
        backgroundColor: '#007bff',
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: 350,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 20,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      buttonDescription: {
        color: '#fff',
        fontSize: 14,
        textAlign: 'center',
        marginTop: 5,
      },
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#007bff',
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: 350,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 20,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      section: {
        marginBottom: 20,
      },
      subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)', // Change border color to semi-transparent white
        color: '#fff', // Set text color to white
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      changeText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'center',
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay color
      },
      modalContainer: {
        width: '80%',
        backgroundColor: '#333', // Dark background color for modal
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Text color for modal title
        marginBottom: 20,
      },
      changeButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
      },
});

export const stylesMyaccount = StyleSheet.create({
      //MyAccount
      container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
      },
      button: {
        backgroundColor: '#007bff',
        paddingVertical: 20,
        paddingHorizontal: 30,
        width: 350,
        borderWidth: 1,
        borderColor: '#ffffff',
        marginTop: 20,
        alignItems: 'center',
      },
      buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
      },
      section: {
        marginBottom: 20,
      },
      subtitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      input: {
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.5)', // Change border color to semi-transparent white
        color: '#fff', // Set text color to white
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
      },
      changeText: {
        fontSize: 16,
        color: 'blue',
        textDecorationLine: 'underline',
        textAlign: 'center',
      },
      modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay color
      },
      modalContainer: {
        width: '80%',
        backgroundColor: '#333', // Dark background color for modal
        padding: 20,
        borderRadius: 10,
      },
      modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff', // Text color for modal title
        marginBottom: 20,
      },
      changeButton: {
        backgroundColor: '#007bff',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginTop: 20,
      },
});

export const stylesCreateaccount = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: 20,
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    inputContainer: {
      width: '100%',
      marginBottom: 15,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      fontSize: 16,
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 20,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
});

export const stylesLogin = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      padding: 10,
      marginVertical: 10,
      width: 200,
      color: 'black'
    },
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
    },
});

export const stylesMenubutton = StyleSheet.create({
    button: {
      marginRight: 10,
    },
    modalContainer: {
      marginTop: 40,
      backgroundColor: '#fff',
      paddingHorizontal: 30,
      paddingVertical: 10,
      elevation: 5,
    },
    option: {
      padding: 10,
    },
    optionBorder: {
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
    },
    optionText: {
      fontSize: 20
    },
    close: {
      width: 40,
      marginLeft: 'auto',
      height: 60,
      elevation: 100
    }
});

export const stylesRecommend = StyleSheet.create({
    button: {
      backgroundColor: '#007bff',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 20,
    },
    selectedButton: {
      backgroundColor: '#00f'
    },
    buttonText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
    },
    container: {
      flexDirection: 'row', // to arrange elements horizontally
      justifyContent: 'space-between', // to space the elements evenly
      paddingHorizontal: 20, // optional: adds padding to the sides
    },
});

export const stylesRecommendation = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#fff', // Set background color here
    },
    lotText: {
      fontSize: 24,
      marginBottom: 20,
      textAlign: 'center',
    },
    mapContainer: {
      width: 300,
      height: 300, // Adjust according to your map component
      marginBottom: 20,
    },
    statusText: {
      fontSize: 18,
      marginBottom: 10,
      color: 'red',
      textAlign: 'center',
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: 'transparent', // Remove background color
      alignSelf: 'center',
    },
    iparkedButton: {
      backgroundColor: 'black',
      color: 'white',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
    },
    buttonText: {
      color: 'black',
      fontSize: 18,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'flex-end',
    },
    recommendationContent: {
      paddingHorizontal: 20,
      paddingBottom: 20,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'transparent', // Remove background color
    },
    popupContainer: {
      backgroundColor: '#fff',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingVertical: 100,
      paddingHorizontal: 20,
    },
    popupText: {
      fontSize: 18,
      marginBottom: 20,
      textAlign: 'center',
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    modalButton: {
      flex: 1,
      paddingVertical: 70,
      borderRadius: 10,
      marginHorizontal: 20,
      marginBottom: 30,
    },
    greenButton: {
      backgroundColor: '#03AC13',
    },
    redButton: {
      backgroundColor: 'red',
    },
    arrowButton: {
      position: 'absolute',
      right: 20,
      top: '50%',
      transform: [{ translateY: -12 }],
    },
    arrowText: {
      fontSize: 30,
    },
});

export const stylesRecommendbuildingselector = StyleSheet.create({
    select: {
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 8,
      padding: 8,
    },
    dropdownText: {
      fontSize: 16,
    }
});

export const stylesScheduleselector = StyleSheet.create({
    select: {
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 8,
      padding: 8,
    },
    dropdownText: {
      fontSize: 16,
    }
});

export const stylesSavedschedules = StyleSheet.create({
    addButton: {
      backgroundColor: 'blue',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      width: 200,
      alignItems: 'center',
    },
    addButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    }
});

export const stylesScheduleeditor = StyleSheet.create({
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

export const stylesScheduleitem = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      backgroundColor: 'white',
      marginBottom: 12,
      padding: 12,
      borderRadius: 8,
    },
    weekdayContainer: {
      flexGrow: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    weekdayOption: {
      alignItems: 'center',
      marginHorizontal: 1
    },
    flexContainer: {
      flexDirection: "row",
      gap: 20,
    },
    deleteButton: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      right: 0,
      top: 0,
      transform: [
        { translateX: 10 },
        { translateY: -10 }
      ],
      zIndex: 1,
      width: 25,
      height: 25,
      borderRadius: 13,
      backgroundColor: '#f44',
    },
    deleteButtonText: {
      color: 'white'
    },
    select: {
      borderColor: 'gray',
      borderWidth: StyleSheet.hairlineWidth,
      borderRadius: 8,
      padding: 8,
    },
    timeSelect: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
    },
    dropdownText: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
});

export const stylesScheduleview = StyleSheet.create({
    schedule: {
      backgroundColor: '#fff',
      borderRadius: 8,
      padding: 16,
      margin: 8,
      width: 200,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'black'
    },
});
  
