import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

import useFormContext from '../hooks/useFormContext'

const CharacterForm = () => {
    const { data, handleChange } = useFormContext()
    return (
        <View style={styles.form}>
            <TextInput style={styles.textInput} placeholder='Character Name' id='characterName' caretHidden value={data.characterName} onChange={(e) => {handleChange(e)}}/>
        </View>
    )
}

const styles= StyleSheet.create({
    form: {
        padding: 10
    },
    textInput: {
        backgroundColor: 'rgba(0,0,0,0.15)',
        textAlign: 'center',
        borderBottomWidth: 1,
        // fontSize: 20
    }
})

export default CharacterForm