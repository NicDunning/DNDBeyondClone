import { useContext } from "react";
import CharacterContext from "../components/character_context";

const useCharacterContext = () => {
    return useContext(CharacterContext)
}

export default useCharacterContext