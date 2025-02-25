import { createContext, useState, useEffect } from "react";
import { LoadCharacters } from "./character_data";

const CharacterContext = createContext({})

export const CharacterProvider = ({children}) => {

    const [selected, setSelected] = useState({})
    const [characters, setCharacters] = useState([])

    return (
        <CharacterContext.Provider value={{selected, setSelected, characters, setCharacters}}>
            {children}
        </CharacterContext.Provider>
    )
}

export default CharacterContext
