import { useState } from 'react';
import React from 'react';

const DataContext = React.createContext({
    buildings: null,
    setBuildlings: () => {}
});

export const DataContextProvider = (props) => {
    const [buildings, setBuildings] = useState(null);

    return (
        <DataContext.Provider
            value={{buildings,setBuildings}}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContext;