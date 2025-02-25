import { View, Text, StyleSheet, ScrollView, FlatList, TouchableOpacity, Button } from 'react-native'
import CharacterItem from "../components/character_item"
import { React, useState, useEffect } from 'react'
import CreateModal from '../components/create_modal'
import useCharacterContext from '../hooks/useCharacterContext'
import { LoadCharacters } from '../components/character_data'
import { ClearFile } from '../components/file_system'

const Characters = () => {

    const { characters, setCharacters } = useCharacterContext()
    const { data, setData } = useState()

    useEffect(() => {
        async () => {
            const c = await LoadCharacters()
            setCharacters(c)
        }
    }, [])

    const [isModalVisible, setIsModalVisible] = useState(false)

    const ToggleModal = () => {
        setIsModalVisible(!isModalVisible)
    }

    return (
        <View style={styles.container}>
                <ScrollView style={styles.scrollView}>
                    {
                        Array.isArray(characters) && characters.map((c, i, characters) => {
                            return (
                                Object.keys(c).length > 0 ? <CharacterItem key={i} index={i} characterData={c} listSize={characters.length} /> : <View key={i}></View>
                            )
                        })
                    }
                </ScrollView>
                <TouchableOpacity style={styles.btnCreate} onPress={ToggleModal}><Text>Create New</Text></TouchableOpacity>
                <CreateModal isModalVisible={isModalVisible} ToggleModal={ToggleModal}/>
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
        backgroundColor: 'red',
        paddingHorizontal: 5,
        paddingVertical: 15,
    },
    scrollView: {
        overflow: 'hidden',
        // borderLeftWidth: 1,
        // borderRightWidth: 1
    },
    btnCreate: {
        marginTop: 10,
        marginHorizontal: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderBottomStartRadius: 15,
        borderBottomEndRadius: 15,
        borderColor: 'black',
        backgroundColor: 'green',
    }
})

export default Characters