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
    width: '90%',
    paddingVertical: 20,
    paddingHorizontal: 30,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
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
  },
  submit: {
    justifyContent: 'center'
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

export const recommendButtons = {
  txt: {
    textAlign: 'center', 
    padding: 25, 
    color: '#ffffff',
    fontWeight: 'bold',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  container: {
    flex: 1
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
  select: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
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
    marginLeft: 10
  }
}

//My account (change email modal)

export const changePermit = {
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
  },
}

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
  },
}

export const inputContLogin = {
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginTop: 80,
    borderRadius: 10,
  },
}

export const inputContCreate = {
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    padding: 20,
    borderRadius: 10,
  },
  input: {

  },
}

export const inputCreate = {
  input: {
    ...textInput,
    marginVertical: 10,
    width: 275,
    fontSize: 16,
    borderLeftWidth: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
  },
}

export const btn = {
  button: {
    ...button.container,
    backgroundColor: '#007bff',
    marginTop: 20,
    borderRadius: 50,
    width: 200,
  },
}

export const checkBox = {
  width: 25,
  height: 25,
  borderColor: '#000',
  borderWidth: 2,
  marginRight: 5
}
//to be replaced

const stylesCreateAndLogin = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 25,
    marginVertical: 250,
    borderRadius: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    height: 'auto',
    marginBottom: 10,
    paddingBottom: 5,

  },
  input: {
    ...textInput,
    fontSize: 16,
  },
  inputPass: {
    ...textInput,
    marginVertical: 10,
    width: 275,
    fontSize: 16,
    borderBottomWidth: 1,
    borderRightWidth: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  inputFocused: {
    backgroundColor: '#f9f7f6',
  },
  button: {
    ...button.container,
    backgroundColor: '#007bff',
    marginTop: 20,
    borderRadius: 50,
    width: 200,
  },
  buttonText: {
    ...button.title,
  },
});

export const stylesCreateaccount = StyleSheet.create(stylesCreateAndLogin);
export const stylesLogin = StyleSheet.create(stylesCreateAndLogin);

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
      backgroundColor: 'white',
      paddingVertical: 15,
      paddingHorizontal: 30,
      marginTop: 20,
      borderWidth: 2,
      borderRadius: 10, 
      borderColor: '#007bff'
    },
    buttonText: {
        color: '#007bff',
        fontSize: 18,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    container: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
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
    buttonSelected: {
      backgroundColor: '#0073ef',      
      borderWidth: 2,
      borderRadius: 10, 
      borderColor: 'white'
    },
    buttonTextSelected: {
      color: 'white',
    },
    recommendButtonText: {
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
      fontWeight: 'bold'
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
      marginTop: 20,
      textAlign: 'center',
      fontWeight: 'bold',
      marginBottom: 20,
    },
    buttonGetDirections: {
      position: 'absolute',
      bottom: 5,
      right: 0,
      backgroundColor: 'transparent', // Remove background color
      paddingVertical: 5,
      paddingHorizontal: 5,
    },
    mapContainer: {
      width: 300,
      height: 300,
      marginBottom: 20,
      marginLeft: 30
    },
    roundedMapContainer: {
      borderRadius: 15,
      overflow: 'hidden',
      alignContent: 'center',
      marginTop: 20
    },
    map: {
      flex: 1,
    },
    greaterMapContainer: {
      backgroundColor: 'white',
      paddingBottom: 10,
      marginBottom: 10,
      borderRadius: 20
    },
    statusText: {
      fontSize: 18,
      marginBottom: 10,
      color: 'red',
      marginLeft: 60,
      fontWeight: 'bold'
    },
    indicatorContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    distance: {
      color: 'black',
      marginLeft: 130,
      fontWeight: 'bold',
      fontSize: 18,
      marginBottom: 10
    },
    button: {
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: 'transparent', // Remove background color
      alignSelf: 'center',
    },
    buttonText: {
      color: '#0073ef',
      fontSize: 15,
      textAlign: 'center',
      textDecorationLine: 'underline',
      fontWeight: 'bold'
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
    arrowContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    recommendationContent: {
      flexGrow: 1,
      paddingVertical: 20,
      backgroundColor: 'transparent', // Remove background color
    },
    transparent: {
      opacity: 0
    },
    buttonLink: {
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      marginBottom: 10,
      backgroundColor: 'transparent', // Remove background color
      alignSelf: 'center',
    },
    buttonLinkText: {
      color: 'black',
      fontSize: 18,
      textAlign: 'center',
      textDecorationLine: 'underline',
    },
    transparent: {
      opacity: 0
    },
    recommendationContent: {
      flexGrow: 1,
      paddingVertical: 20,
      backgroundColor: 'transparent',
    },
});

export const stylesRecommendbuildingselector = StyleSheet.create({
    txt: {
      textAlign: 'center', 
      padding: 25, 
      color: 'white',
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
  container:
  {
    flex: 1
  },
  txt: {
    textAlign: 'center', 
    padding: 25, 
    color: '#ffffff',
    fontWeight: 'bold',
  },
  select: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  dropdownText: {
    fontSize: 16,
    color: '#333',
  },
  dropdownContainer: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 10,
  },
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
      backgroundColor: '#0073ef'
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
    margin: 8
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
    alignSelf: 'center',
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: buttonDelete.container,
  delete: {
    ...buttonDelete.container,
    transform: [
      { translateX: 10 },
      { translateY: -10 }
    ]
  },
  deleteIcon: buttonDelete.icon
});

export const aboutPage = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  header: pageHeader,
  paragraph: {...paragraph, color: '#fff', textAlign: 'center', paddingLeft: 10, paddingRight: 10},
  teamMember: teamMember.container,
  portrait: teamMember.portrait,
  textContainer: {
    width: '80%',
    alignSelf: 'center',
    maxHeight: 120,
    overflow: 'hidden',
  },
  textContainerStatement: {
    maxHeight: 120,
    overflow: 'hidden',
  },
  memberText: {
    width: '80%',
    color: 'white',
  },  
});

export const feedback = StyleSheet.create({
  closeButton: {
    marginLeft: 'auto'
  },
  buttonText: {
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  popupContainer: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 30,
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  popupText: {
    fontSize: 16,
    marginVertical: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 30
  },
  modalButton: {
    flex: 1,
    paddingVertical: 50,
    borderRadius: 10,
    marginBottom: 30,
  },
  greenButton: {
    backgroundColor: 'rgb(122, 245, 122)',
  },
  redButton: {
    backgroundColor: 'rgb(255, 139, 135)',
  }
});