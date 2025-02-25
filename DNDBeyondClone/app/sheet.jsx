import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react'
import SheetTabBar from '../components/sheet_tab_bar';
import Abilities from './sheet_pages/abilities';
import Actions from './sheet_pages/actions';
import Skills from './sheet_pages/skills';
import Spells from './sheet_pages/spells';
import Features from './sheet_pages/features';
import { useSwipe } from '../hooks/useSwipe'
import Inventory from './sheet_pages/inventory';

let data = {}
let idx = -1

const Sheet = () => {
    const [character, setCharacter] = useState({})
    const [index, setIndex] = useState(0)
    const [sheetIndex, setSheetIndex] = useState(0)
    const route = useRoute()

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

    function onSwipeLeft(){
        sheetNavigation.navigate(state.index + 1)
    }

    function onSwipeRight(){
        sheetNavigation.navigate(state.index - 1)
    }

    const sheetNavigation = {
        navigate: (index) => {
            index = index < 0 ? state.routes.length - 1 : index > state.routes.length - 1 ? 0 : index
            setSheetIndex(index)
        }
    }

    const state = {routes: [{name: 'abilities'}, {name: 'skills'}, {name: 'actions'}, {name: 'spells'}, {name: 'features'}, {name: 'inventory'}], index: sheetIndex, navigate: sheetNavigation}
    

    const sheetLookup = {
        abilities: <Abilities character={character} state={state}/>,
        actions: <Actions character={character} state={state}/>, 
        skills: <Skills character={character} state={state}/>,
        spells: <Spells character={character} state={state}/>,
        features: <Features character={character} state={state}/>,
        inventory: <Inventory character={character} state={state}/>
    }

    useEffect(() => {
        if(route.params){
            data = route.params.data
            idx = route.params.idx
            setCharacter(route.params.data)
            setIndex(route.params.index)
        }
        else{
            setCharacter(data)
            setIndex(idx)
        }
    }, [route])

    if(!route){
        setCharacter(data)
        setIndex(idx)
    }

    // console.log(character)


    
    return (
        <View style={styles.container}>
            <View style={styles.topContainer}>
                <Text>TOP</Text>
            </View>
            <SheetTabBar state={state}/>
            <View style={[styles.bottomContainer]}>
                <ScrollView contentContainerStyle={{flex: 1}} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
                {
                    sheetLookup[state.routes[state.index].name]
                }
                </ScrollView>
            </View>
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
        backgroundColor: 'orange'
    },
    topContainer: {
        height: '30%',
        backgroundColor: 'red',
        opacity: 0.5,
        borderEndStartRadius: 25,
        borderStartStartRadius: 25
    },
    tabBar: {
        height: '10%',
        backgroundColor: 'green',
        opacity: 0.5
    },
    bottomContainer: {
        height: '60%',
    },
    inactiveContainer: {
        display:'none'
    }
})

export default Sheet