import { useState } from 'react';
import React from 'react';
import * as SecureStore from 'expo-secure-store';

const DataContext = React.createContext({
    buildings: null,
    setBuildings: () => {},
    loggedIn: false,
    logIn: () => {},
    logOut: () => {},
    getSessionID: () => {}
});

export const DataContextProvider = (props) => {
    const [buildings, setBuildings] = useState(null);
    const [loggedIn, setLoggedIn] = useState(false);
    
    const logIn = (sessionID) => {
      if (!sessionID) {
        console.log('Session ID required to log in.');
      } else if (!loggedIn) {
        try {
          SecureStore.setItem('sessionID', sessionID);
          setLoggedIn(true);
          return true;
        } catch (err) {
          console.log(err);
          return false;
        }
      }
    };

    const logOut = () => {
      try {
        SecureStore.setItem('sessionID', '');
        setLoggedIn(false);
        return true;
      } catch (err) {
        console.log(err);
        return false;
      }
    };

    const getSessionID = () => {
      try {
        return SecureStore.getItem('sessionID');
      } catch (err) {
        console.log(err);
        return null;
      }
    }
    
    return (
        <DataContext.Provider
            value={{buildings, setBuildings, loggedIn, logIn, logOut, getSessionID}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContext;