import { View, Text, StyleSheet } from 'react-native'
import { Tabs } from 'expo-router'
import { React, useEffect } from 'react'
import { LoadCharacters } from '../components/character_data'
import useCharacterContext from '../hooks/useCharacterContext'
import { ClearFile } from '../components/file_system'

const Home = () => {

    const {
        selected,
        setSelected,
        characters,
        setCharacters
    } = useCharacterContext()

    useEffect(() => {
        async () => {
            ClearFile('characters.json')
            setCharacters(await LoadCharacters())
        }
    }, [])

    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 15,
        marginBottom: 95,
        flex: 1,
        borderRadius: 25,
        borderCurve: 'continuous',
        shadowColor: 'black',
        shadowOffset: {width: 0, height: 10},
        shadowRadius: 10,
        shadowOpacity: 0.1,
        backgroundColor: 'green'
    }
})

export default Home