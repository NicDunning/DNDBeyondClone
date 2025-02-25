import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import useFormContext from '../hooks/useFormContext'
import React from 'react'

const clampNumber = (number, max = 20, min = 0) => {
    return number > max ? max : number < min ? min : number
}

const AbilityScoreForm = () => {

    const { data, handleChange } = useFormContext()

    return (
        <View style={styles.form}>
            <View style={styles.abilityScoreGroup}>
                <View style={styles.abilityScoreContainer}>
                    <Text>Strength</Text>
                    <View style={styles.abilityScore}>
                        <View style={{alignItems: 'center'}}>
                            <Text>Score</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='strengthRoll' value={data.abilityScoreRolls[0]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                        <Text> + </Text>
                        <View style={{alignItems: 'center'}}>
                            <Text>Bonus</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='strengthIncrease' value={data.abilityScoreIncreases[0]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.abilityScoreContainer}>
                    <Text>Dexterity</Text>
                    <View style={styles.abilityScore}>
                        <View style={{alignItems: 'center'}}>
                            <Text>Score</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='dexterityRoll' value={data.abilityScoreRolls[1]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                        <Text> + </Text>
                        <View style={{alignItems: 'center'}}>
                            <Text>Bonus</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='dexterityIncrease' value={data.abilityScoreIncreases[1]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.abilityScoreGroup}>
                <View style={styles.abilityScoreContainer}>
                    <Text>Intelligence</Text>
                    <View style={styles.abilityScore}>
                        <View style={{alignItems: 'center'}}>
                            <Text>Score</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='intelligenceRoll' value={data.abilityScoreRolls[2]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                        <Text> + </Text>
                        <View style={{alignItems: 'center'}}>
                            <Text>Bonus</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='intelligenceIncrease' value={data.abilityScoreIncreases[2]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.abilityScoreContainer}>
                    <Text>Wisdom</Text>
                    <View style={styles.abilityScore}>
                        <View style={{alignItems: 'center'}}>
                            <Text>Score</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='wisdomRoll' value={data.abilityScoreRolls[3]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                        <Text> + </Text>
                        <View style={{alignItems: 'center'}}>
                            <Text>Bonus</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='wisdomIncrease' value={data.abilityScoreIncreases[3]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.abilityScoreGroup}>
                <View style={styles.abilityScoreContainer}>
                    <Text>Constitution</Text>
                    <View style={styles.abilityScore}>
                        <View style={{alignItems: 'center'}}>
                            <Text>Score</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='constitutionRoll' value={data.abilityScoreRolls[4]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                        <Text> + </Text>
                        <View style={{alignItems: 'center'}}>
                            <Text>Bonus</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='constitutionIncrease' value={data.abilityScoreIncreases[4]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                    </View>
                </View>
                <View style={styles.abilityScoreContainer}>
                    <Text>Charisma</Text>
                    <View style={styles.abilityScore}>
                        <View style={{alignItems: 'center'}}>
                            <Text>Score</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='charismaRoll' value={data.abilityScoreRolls[5]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                        <Text> + </Text>
                        <View style={{alignItems: 'center'}}>
                            <Text>Bonus</Text>
                            <TextInput keyboardType='numeric' style={styles.textInput} id='charismaIncrease' value={data.abilityScoreIncreases[5]} onChange={(e) => {handleChange(e)}}/>
                        </View>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles= StyleSheet.create({
    form: {
        padding: 10,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    dropdown: {
        backgroundColor:'rgba(0,0,0,0.1)',
        paddingHorizontal: 5,
        borderWidth: 2,
        marginVertical: 5
    },
    dropdownItem: {
        textAlign: 'center',
        backgroundColor: 'black',
        color:'white'
    },
    textInput: {
        width: 25,
        backgroundColor: 'rgba(0,0,0,0.15)',
        textAlign: 'center',
        borderBottomWidth: 1,
        // fontSize: 20
    },
    abilityScore: {
        flexDirection: 'row', 
        justifyContent: 'space-evenly', 
        borderWidth: 1, 
        padding: 2,
        width: 100,
        alignItems: 'flex-end'
    },
    abilityScoreContainer: {
        alignItems: 'center',
    },
    abilityScoreGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
        marginVertical: 5
    }
})

export default AbilityScoreForm