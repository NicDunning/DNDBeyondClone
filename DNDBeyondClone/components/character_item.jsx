import { View, Text, StyleSheet, Image, FlatList, TouchableOpacity } from 'react-native'
import { Tabs, useNavigation } from 'expo-router'
import { useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'
import { HoldItem } from 'react-native-hold-menu'
// import { navigationInstance } from './tab_bar';
import { DeleteCharacter, AddCharacter } from './character_data';
import useCharacterContext from '../hooks/useCharacterContext';

const CharacterItem = ({index, characterData, listSize}) => {

    const {
        characters,
        setCharacters
    } = useCharacterContext()

    const navigation = useNavigation()

    const MenuItems = [
        { text: 'Actions', icon: 'title', isTitle: true, onPress: () => {} },
        { text: 'Select', icon: 'edit', onPress: () => {navigation.navigate("sheet", {index: index, data: characterData})} },
        { text: 'Clone', icon: 'map-pin', withSeparator: true, onPress: async () => {
            console.log("Clone: ", characterData)
            // const result = await AddCharacter(characterData)
            // setCharacters(result)
        } },
        { text: 'Delete', icon: 'trash', isDestructive: true, onPress: async () => {
            const result = await DeleteCharacter(index)
            setCharacters(result)
        } },
    ];

    return (
        <HoldItem items={MenuItems}>
            <View style={[styles.container, index == 0 ? styles.containerTop : index == listSize -1 ? styles.containerBottom : styles.container]}>
                <Image style={styles.characterIcon} source={require("../assets/images/icon.png")}/>
                <View style={{backgroundColor:'red', flex: 1, padding: 5}}>
                    <Text style={styles.classDetails} >{characterData.name ? characterData.name : "No Name"}</Text>
                    <Text style={styles.classDetails} >Lv. {characterData.totalLevel ? characterData.totalLevel : 0} | {characterData.subrace ? characterData.subrace : characterData.race ? characterData.race : "No Race"}</Text>
                    <View style={styles.grid}>
                        <Text style={[styles.gridItem]} >Class(es):</Text>
                        {
                            characterData.classes.map((c, i , a) => {
                                return <Text key={i} style={[styles.gridItem]}>{c.name ? c.name : 'No Class'}{ c.subclass ? ` • ${c.subclass.name}` : ''}</Text>
                            })
                        }
                    </View>
                </View>
            </View>
        </HoldItem>
    )
}

const styles = StyleSheet.create({
    containerTop: {
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
    },
    containerBottom: {
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    container: {
        backgroundColor: 'orange',
        borderColor: 'black',
        borderWidth:2,
        marginTop: 5,
        marginHorizontal: 10,
        padding: 10,
        height: 100,
        justifyContent: 'center',
        flexDirection: 'row',
    },
    characterIcon: {
        maxWidth: 50,
        maxHeight: 50,
        margin: "auto"
    },
    classDetails: {
        fontSize: 10
    },
    grid: {
        flexWrap: 'wrap',
        flexDirection: 'row',
        // borderWidth: 1
    },
    gridItem: {
        width: '100%',
        fontSize: 10,
        textAlign: 'Left'
    },
    // gridTop: {
    //     borderBottomWidth: 1
    // },
    // gridLeft: {
    //     borderRightWidth: 1
    // }
})

export default CharacterItem