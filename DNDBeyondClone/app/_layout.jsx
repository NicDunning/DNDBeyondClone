import { View, Text } from 'react-native'
import { Tabs } from 'expo-router'
import React from 'react'
import TabBar from '../components/tab_bar'

const _layout = () => {
    return (
        <Tabs tabBar={props => <TabBar {...props}/>} screenOptions={{headerShown: false}}>
            <Tabs.Screen name='index'/>
            <Tabs.Screen name='characters'/>
            <Tabs.Screen name='explore'/>
            <Tabs.Screen name='profile'/>
        </Tabs>
    )
}

export default _layout