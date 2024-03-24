import { StyleSheet } from "react-native";

// Reusable styles
export const paragraph = {
  textAlign: 'left',
  fontSize: 15.5
}



export const pageContainer = {
  flex: 1,
  alignItems: 'center',
  justifyContent: 'center',
  paddingHorizontal: 20
}

export const pageHeader = {
  fontSize: 24,
  color: '#ffffff',
  fontWeight: 'bold',
  textAlign: 'center',
  marginBottom: 30
}

export const button = {
  containerOutline: {
    backgroundColor: '#0073ef',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 10
  },
  container: {
    backgroundColor: '#0073ef',
    width: '100%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 20,
    alignItems: 'center',
    borderRadius: 10
  },
  title: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  description: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5
  }
}

export const buttonDelete =  {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: '#f44',
    color: '#fff'
  },
  icon: {
    color: '#fff'
  }
}

export const textInput = {
  borderWidth: 1,
  borderColor: 'rgba(0, 0, 0, 0.5)',
  color: '#000',
  borderRadius: 5,
  padding: 10,
  marginBottom: 10,
}

// Page-specific styles

// About
export const teamMember = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
    marginBottom: 20
  },
  portrait: {
    width: 80,
    height: 80,
    resizeMode: 'stretch',
    borderRadius: 100,
  }
}

//My account (change email modal)

export const changeEmail = {
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  container: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  }
}

//to be replaced

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
    txt: {
      textAlign: 'center', 
      padding: 25,
      color: '#ffffff',
      fontWeight: 'bold',
    },
    button: {
      backgroundColor: '#0073ef',
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginTop: 20,
      borderWidth: 1,
      borderColor: "#ffffff",
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    selectedButton: {
      backgroundColor: '#00f'
    },
    container: {
      flexDirection: 'row', // to arrange elements horizontally
      justifyContent: 'space-between', // to space the elements evenly
      paddingHorizontal: 20, // optional: adds padding to the sides
    },
    buttonRecommend: {
      backgroundColor: '#007bff',
      width: '100%',
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginTop: 40
    },
    buttonDisabled: {
      backgroundColor: '#55abff'
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
    txt: {
      textAlign: 'center', 
      padding: 25, 
      color: '#ffffff',
      fontWeight: 'bold',
    },
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
    txt: {
    textAlign: 'center', 
    padding: 25, 
    color: '#ffffff',
    fontWeight: 'bold',
    },
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
      borderWidth: 1,
      borderColor: '#284b85',
      padding: 16,
      marginTop: 8,
      marginBottom: 8,
      width: 350,
    },
    title: {
      textAlign: 'center',
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: 'black'
    },
    body: {
      alignItems: 'center',
    },
});
  
