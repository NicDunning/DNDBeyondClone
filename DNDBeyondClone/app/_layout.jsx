import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import { React, useEffect } from 'react'
import TabBar from '../components/tab_bar'
import { HoldMenuProvider } from 'react-native-hold-menu';
import { CharacterProvider } from '../components/character_context'
import useCharacterContext from '../hooks/useCharacterContext'
import { LoadCharacters } from '../components/character_data'

const _layout = () => {

    const { characters, setCharacters } = useCharacterContext()

    return (
        <HoldMenuProvider theme="light">
            <CharacterProvider>
                <Tabs tabBar={props => <TabBar {...props}/>} screenOptions={{headerShown: false}}>
                    <Tabs.Screen name='index'/>
                    <Tabs.Screen name='characters'/>
                    <Tabs.Screen name='sheet'/>
                    <Tabs.Screen name='explore'/>
                    <Tabs.Screen name='profile'/>
                </Tabs>
            </CharacterProvider>
        </HoldMenuProvider>
    )
}

export default _layout