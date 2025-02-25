import { View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useEffect, useState } from 'react'
import { useSwipe } from '../../hooks/useSwipe'

const CalculateModifier = (score) => {
    let mod = (score - 10) / 2
    return Math.floor(mod)
}

const AddSymbol = (number) => {return number >= 0 ? `+${number}` : `${number}`}

const getProficiencyBonus = (level) => {
    return Math.floor( level / 4 ) + 1
}

const Inventory = (params) => {
    if(!params.character.abilityScores) return (<View style={styles.container}/>)

    const { onTouchStart, onTouchEnd } = useSwipe(onSwipeLeft, onSwipeRight, 6)

    function onSwipeLeft(){
        params.state.navigate.navigate(params.state.index + 1)
    }

    function onSwipeRight(){
        params.state.navigate.navigate(params.state.index - 1)
    }

    const abilities = params.character.abilityScores
    const abilityHeaders = ['strength', 'dexterity', 'intelligence', 'wisdom', 'charisma']
    const skillProficiencies = params['character']['proficiencies']['skill']
    const characterLevel = params['character']['totalLevel']

    const equipment = [
        {
            id: 0,
            name: 'Greatclub',
            category: 'Weapon',
            subCategory: 'Greatclub',
            weight: 10,
            quantity: 1,
            cost: {
                amount: 2,
                currency: 'Silver'
            },
            modifiers: [
                {kind: 'weapon', modifier: 'addition', details: 'Greatclub'},
                {kind: 'hit', modifier: 'increase', details: 1},
                {kind: 'damage', modifier: 'increase', details: 1}
            ],
            description: '',
            equipped: false
        },
        {
            id: 0,
            name: 'Greatclub',
            category: 'Weapon',
            subCategory: 'Greatclub',
            weight: 10,
            quantity: 1,
            cost: {
                amount: 2,
                currency: 'Silver'
            },
            modifiers: [
                {kind: 'weapon', modifier: 'addition', details: 'Greatclub'},
                {kind: 'hit', modifier: 'increase', details: 1},
                {kind: 'damage', modifier: 'increase', details: 1}
            ],
            description: '',
            equipped: false
        },{
            id: 0,
            name: 'Greatclub',
            category: 'Weapon',
            subCategory: 'Greatclub',
            weight: 10,
            quantity: 1,
            cost: {
                amount: 2,
                currency: 'Silver'
            },
            modifiers: [
                {kind: 'weapon', modifier: 'addition', details: 'Greatclub'},
                {kind: 'hit', modifier: 'increase', details: 1},
                {kind: 'damage', modifier: 'increase', details: 1}
            ],
            description: '',
            equipped: false
        },{
            id: 0,
            name: 'Greatclub',
            category: 'Weapon',
            subCategory: 'Greatclub',
            weight: 10,
            quantity: 1,
            cost: {
                amount: 2,
                currency: 'Silver'
            },
            modifiers: [
                {kind: 'weapon', modifier: 'addition', details: 'Greatclub'},
                {kind: 'hit', modifier: 'increase', details: 1},
                {kind: 'damage', modifier: 'increase', details: 1}
            ],
            description: '',
            equipped: false
        },{
            id: 0,
            name: 'Greatclub',
            category: 'Weapon',
            subCategory: 'Greatclub',
            weight: 10,
            quantity: 1,
            cost: {
                amount: 2,
                currency: 'Silver'
            },
            modifiers: [
                {kind: 'weapon', modifier: 'addition', details: 'Greatclub'},
                {kind: 'hit', modifier: 'increase', details: 1},
                {kind: 'damage', modifier: 'increase', details: 1}
            ],
            description: '',
            equipped: false
        },{
            id: 0,
            name: 'Greatclub',
            category: 'Weapon',
            subCategory: 'Greatclub',
            weight: 10,
            quantity: 1,
            cost: {
                amount: 2,
                currency: 'Silver'
            },
            modifiers: [
                {kind: 'weapon', modifier: 'addition', details: 'Greatclub'},
                {kind: 'hit', modifier: 'increase', details: 1},
                {kind: 'damage', modifier: 'increase', details: 1}
            ],
            description: '',
            equipped: false
        },{
            id: 0,
            name: 'Greatclub',
            category: 'Weapon',
            subCategory: 'Greatclub',
            weight: 10,
            quantity: 1,
            cost: {
                amount: 2,
                currency: 'Silver'
            },
            modifiers: [
                {kind: 'weapon', modifier: 'addition', details: 'Greatclub'},
                {kind: 'hit', modifier: 'increase', details: 1},
                {kind: 'damage', modifier: 'increase', details: 1}
            ],
            description: '',
            equipped: false
        },
    ]

    const backpack = [
        {
            id: 1,
            name: 'Breast Plate',
            category: 'Armor',
            subCategory: 'Breast Plate',
            weight: 20,
            quantity: 1,
            cost: {
                amount: 400,
                currency: 'Gold'
            },
            modifiers: [
                {kind: 'armor', modifier: 'override', details: '14+dex'},
            ],
            description: '',
            equipped: false
        },
    ]

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <TouchableOpacity style={{width: '40%', justifyContent: 'center', borderWidth: 1, borderRadius: 2, marginTop: 10}}>
                    <Text style={{textAlign: 'center'}}>Edit Inventory</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={{borderEndEndRadius: 25, borderStartEndRadius: 25, padding: 10}} onScrollBeginDrag={onTouchStart} onScrollEndDrag={onTouchEnd}>
                {
                    equipment.length > 0 ? equipment.map((equip, index, array) => {
                        return (
                            <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 15, paddingRight: 5}}>
                                <BouncyCheckbox iconStyle={{borderRadius: 5}} innerIconStyle={{borderRadius: 5}} style={{width: '20%', padding: '5%'}}></BouncyCheckbox>
                                <View style={{backgroundColor: 'white', width: '80%', padding: 5}}>
                                    <View  style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                        <Text style={styles.spellTitle}>
                                            {equip.name}
                                        </Text>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <View><Text style={{textAlign: 'center', fontSize: 8}}>Category</Text><Text style={{textAlign: 'center', fontSize: 12}}>{equip.category}</Text></View>
                                        <View><Text style={{textAlign: 'center', fontSize: 8}}>weight</Text><Text style={{textAlign: 'center', fontSize: 12}}>{equip.weight}</Text></View>
                                        <View><Text style={{textAlign: 'center', fontSize: 8}}>Quantity</Text><Text style={{textAlign: 'center', fontSize: 12}}>{equip.quantity}</Text></View>
                                        <View><Text style={{textAlign: 'center', fontSize: 8}}>Cost</Text><Text style={{textAlign: 'center', fontSize: 12}}>{equip.cost.amount}{equip.cost.currency[0].toLowerCase()}</Text></View>
                                    </View>
                                </View>
                            </View>
                        )
                    }) : null
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        borderEndEndRadius: 25,
        borderStartEndRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center',
        paddingBottom: 10
    },
    spell: {
        height: 'auto',
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 10
    },
    spellHeader: {
        textAlign: 'left', 
        margin: 10, 
        fontSize: 20, 
        fontWeight: 800, 
        // borderBottomWidth: 2
    },
    spellTitle: {
        textAlign: 'left', 
        margin: 10, 
        fontSize: 16, 
        fontWeight: 800
    },
    spellDetails: {
        textAlign: 'left', 
        paddingHorizontal: 20, 
        paddingBottom: 20, 
        fontSize: 12, 
        backgroundColor: 'orange'
    }
})

export default Inventory