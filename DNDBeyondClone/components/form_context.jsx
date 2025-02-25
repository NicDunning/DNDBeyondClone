import { createContext, useState, useEffect } from "react";

const FormContext = createContext({})

export const FormProvider = ({children}) => {

    const titles = [
        'Character Info',
        'Background Info',
        'Class Info',
        'Ability Scores',
        'Other'
    ]

    const [page, setPage] = useState(0)

    const [data, setData] = useState({
        characterName: '',

        characterRace: '',
        characterSubRace: '',
        background: '',
        backgroundProficiencies: [],

        characterClass: '',
        characterSubClass: '',
        classProficiencies: [],
        toolProficiencies: [],
        languages: [],

        abilityScoreIncreases: [0,0,0,0,0,0],
        abilityScoreRolls: [0,0,0,0,0,0],

        startingGear: []
    }) 

    const handleChange = (e) => {
        let name = ''
        let value = ''
        // Check if component is DropDown / Multiselect OR Text
        if(!Object.keys(e).includes('_dispatchInstances')){
            name = e.key
            // If MultiSelect
            if(e.mode === 'multi'){
                // Get value (array), if no current data: store value, if value in current data: remove it, otherwise concat.
                value = e.event
                if(data[name].length == 0){
                    value = value
                }
                else if(data[name].includes(value)){
                    value = data[name].map(v => {return(v != value)})
                }
                else{
                    value.concat(data[name])
                }
            }
            else{
                value = e.event.value
            }
        }
        else {
            const type = e._dispatchInstances.type
            name = e._dispatchInstances.pendingProps.nativeID
            value = type.includes("checkbox") ? e.target.checked : e.nativeEvent.text
        }


        if(name.includes('Roll')){
            const index = ['strengthRoll', 'dexterityRoll', 'intelligenceRoll', 'wisdomRoll', 'constitutionRoll', 'charismaRoll',].findIndex(((v, i, o) => {return(v == name)}))
            const v = data['abilityScoreRolls']
            v[index] = value
            value = v
            name = 'abilityScoreRolls'
        }
        else if (name.includes("Increase")){
            const index = ['strengthIncrease', 'dexterityIncrease', 'intelligenceIncrease', 'wisdomIncrease', 'constitutionIncrease',  'charismaIncrease'].findIndex(((v, i, o) => {return(v == name)}))
            const v = data['abilityScoreIncreases']
            v[index] = value
            value = v
            name = 'abilityScoreIncreases'
        }

        setData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    const { 
        startingGear, 
        toolProficiencies, 
        characterSubClass, 
        characterSubRace, 
        ...requiredInputs } = data

    const canSubmit = [...Object.values(requiredInputs)].every(Boolean) && page === Object.keys(titles).length - 1

    return (
        <FormContext.Provider value={{titles, page, setPage, data, setData, canSubmit, handleChange}}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext