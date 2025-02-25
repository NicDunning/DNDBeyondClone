import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const CalculateModifier = (score) => {
    let mod = ((score - 10) / 2)
    return Math.floor(mod)
}

const AddSymbol = (number) => {return number >= 0 ? `+${number}` : `${number}`}

const getProficiencyBonus = (level) => {
    return Math.floor( level / 4 ) + 1
}


// CalculateModifier(abilityScores[score])

const Abilities = (params) => {
    // console.log(params)
    if(!params.character.abilityScores) return (<View style={styles.container}/>)

    const abilityScores = params['character']['abilityScores']
    const saveProficiencies = params['character']['proficiencies']['save']
    const characterLevel = params['character']['totalLevel']

    return (
        <View style={styles.container}>
            {
                [['strength', 'dexterity'], ['intelligence', 'constitution'], ['charisma', 'wisdom']].map((group, index, array) => {
                    return (
                        <View key={index} style={styles.scores}>
                            {
                                group.map((score, idx, arr) => {
                                    return (
                                        <View key={score} style={styles.save}>
                                            <Text style={styles.saveText}>{score[0].toUpperCase()+score.slice(1)}</Text>
                                            <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                                                <View style={{flexDirection: 'column'}}>
                                                    <Text style={styles.saveText}>Score</Text>
                                                    <Text style={styles.saveText}>{abilityScores[score]}</Text>
                                                </View>
                                                <View style={{flexDirection: 'column'}}>
                                                    <Text style={styles.saveText}>Modifier</Text>
                                                    <Text style={styles.saveText}>{AddSymbol(CalculateModifier(abilityScores[score]))}</Text>
                                                </View>
                                                <View style={{flexDirection: 'column'}}>
                                                    <Text style={styles.saveText}>Save</Text>
                                                    <Text style={styles.saveText}>{AddSymbol(CalculateModifier(abilityScores[score]) + (saveProficiencies.includes(score) ? getProficiencyBonus(characterLevel) : 0))}</Text>
                                                </View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
            
            <View style={styles.saves}>

            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderEndEndRadius: 25,
        borderStartEndRadius: 25,
        backgroundColor: 'blue',
        justifyContent: 'center'
    },
    scores: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    save: {
        width: '50%',
        backgroundColor: 'green',
        marginHorizontal: 5
    },
    saveText: {
        textAlign: 'center',
        paddingVertical: 5
    }
})

export default Abilities