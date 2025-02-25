import { LoadFile, SaveFile } from "./file_system"

const fileName = 'characters.json'

export const AddCharacter = async (characterDetails) => {
    const character = FormatCharacter(characterDetails)
    let characters = JSON.parse(await LoadFile(fileName))
    if(characters.length == 1){
        if(Object.keys(characters[0]).length < 1){
            characters.pop()
        } 
    }
    if(!Array.isArray(characters)){
        characters = [characters]
    }
    characters.push(character)
    await SaveFile(fileName, characters)
    return characters
}

export const LoadCharacter = async (id) => {
    let characters = JSON.parse(await LoadFile(fileName))
    return characters[id]
}

export const UpdateCharacter = async (characterDetails, id) => {
    let characters = JSON.parse(await LoadFile(fileName))
    characters[id] = characterDetails
    await SaveFile(fileName, characters)
    return characters
}

export const DeleteCharacter = async (id) => {
    let characters = JSON.parse(await LoadFile(fileName))
    characters.splice(id, 1);
    await SaveFile(fileName, characters)
    return characters
}

export const LoadCharacters = async (ids = []) => {
    let characters = JSON.parse(await LoadFile(fileName))
    if(ids.length > 0){
        characters = characters.map((v, i, r) => {
            return ids.includes(i)
        })
    }
    return characters
}

export const FormatCharacter = (newCharacterData) => {
    console.log("Make Ability Scores")
    let abilityScores = {}
    if(newCharacterData.abilityScoreIncreases && newCharacterData.abilityScoreRolls){
        abilityScores['strength'] = Number(newCharacterData.abilityScoreIncreases[0]) + Number(newCharacterData.abilityScoreRolls[0])
        abilityScores['dexterity'] = Number(newCharacterData.abilityScoreIncreases[1]) + Number(newCharacterData.abilityScoreRolls[1])
        abilityScores['intelligence'] = Number(newCharacterData.abilityScoreIncreases[2]) + Number(newCharacterData.abilityScoreRolls[2])
        abilityScores['wisdom'] = Number(newCharacterData.abilityScoreIncreases[3]) + Number(newCharacterData.abilityScoreRolls[3])
        abilityScores['constitution'] = Number(newCharacterData.abilityScoreIncreases[4]) + Number(newCharacterData.abilityScoreRolls[4])
        abilityScores['charisma'] = Number(newCharacterData.abilityScoreIncreases[5]) + Number(newCharacterData.abilityScoreRolls[5])
    }
    console.log("Make Skill Proficiencies")
    let skillProficiencies = []
    skillProficiencies = skillProficiencies.concat(newCharacterData.classProficiencies)
    skillProficiencies = skillProficiencies.concat(newCharacterData.backgroundProficiencies)
    
    console.log("Make Character")
    const character = {
        fullyInitialized: false,
        name: newCharacterData.characterName ? newCharacterData.characterName : "No Name",
        race: newCharacterData.characterRace ? newCharacterData.characterRace : "No Race",
        subrace: newCharacterData.characterSubRace ? newCharacterData.characterSubRace : "No Subrace",
        totalLevel: 1,
        speed: 30,
        classes: [
            { 
                name:newCharacterData.characterClass ? newCharacterData.characterClass : "No Class",
                level:1, 
                subclass: newCharacterData.characterSubClass ? { name: newCharacterData.characterSubClass } : {}}],
        abilityScores: abilityScores,
        features: [],
        proficiencies:{
            skill: skillProficiencies,
            tool: newCharacterData.toolProficiencies ? newCharacterData.toolProficiencies : [],
            armor:[],
            weapon:[],
            save: []
        },
        actions: [],
        spells: [],
        inventory: newCharacterData.startingGear
    }

    return character
}