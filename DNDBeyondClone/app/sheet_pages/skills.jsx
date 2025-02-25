import { View, Text, StyleSheet} from 'react-native'
import React from 'react'

const CalculateModifier = (score) => {
    let mod = (score - 10) / 2
    return Math.floor(mod)
}

const AddSymbol = (number) => {return number >= 0 ? `+${number}` : `${number}`}

const getProficiencyBonus = (level) => {
    return Math.floor( level / 4 ) + 1
}

const Skills = (params) => {
    if(!params.character.abilityScores) return (<View style={styles.container}/>)

    const abilities = params.character.abilityScores
    const abilityHeaders = ['strength', 'dexterity', 'intelligence', 'wisdom', 'charisma']
    const skillProficiencies = params['character']['proficiencies']['skill']
    const characterLevel = params['character']['totalLevel']


    return (
        <View style={styles.container}>
            {
                [[['Athletics'], ['Acrobatics', 'Sleight of Hand', 'Stealth'], ['Arcana', 'History', 'Investigation', 'Nature', 'Religion']], [['Animal Handling', 'Insight', 'Medicine', 'Perception', 'Survival'], ['Deception', 'Intimidation', 'Performance', 'Persuasion']]].map((outerGroup, index, array) => {
                    return (
                        <View style={styles.column} key={index}>
                            {
                                outerGroup.map((group, jndex, array) => {
                                    return (
                                        <View key={jndex} style={styles.skills}>
                                            <Text>{abilityHeaders[jndex + (index) * 3][0].toUpperCase() + abilityHeaders[jndex + (index) * 3].slice(1)}</Text>
                                            {
                                                group.map((skill, kndex, arr) => {
                                                    return (
                                                        <View style={styles.skill} key={skill}>
                                                            <Text style={styles.skillText}>{skill}</Text>
                                                            <Text style={styles.skillText}>{AddSymbol(CalculateModifier(abilities[abilityHeaders[jndex + (index) * 3]]) + (skillProficiencies.includes(skill) ? getProficiencyBonus(characterLevel) : 0))}</Text>
                                                        </View>
                                                    )
                                                })
                                            }
                                        </View>
                                    )
                                })
                            }
                        </View>
                    )
                })
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        borderEndEndRadius: 25,
        borderStartEndRadius: 25,
        backgroundColor: 'purple',
        justifyContent: 'center'
    },
    column: {
        backgroundColor: 'yellow',
        marginHorizontal: 5,
        marginVertical: 5,
        justifyContent: 'center',
        width: '45%'
    },
    skills: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 5,
        backgroundColor: 'orange'
    },
    skill: {
        backgroundColor: 'green',
        marginVertical: 5,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between'
    },
    skillText: {
        textAlign: 'center',
        paddingHorizontal: 5
    }
})

export default Skills