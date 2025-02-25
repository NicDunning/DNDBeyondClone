import { View, Text, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native'
import BouncyCheckbox from 'react-native-bouncy-checkbox'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React, { useState } from 'react'
import { useSwipe } from '../../hooks/useSwipe'

const CalculateModifier = (score) => {
    let mod = (score - 10) / 2
    return Math.floor(mod)
}

const AddSymbol = (number) => {return number >= 0 ? `+${number}` : `${number}`}

const getProficiencyBonus = (level) => {
    return Math.floor( level / 4 ) + 1
}

const Spells = (params) => {
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
    const cantrips = [
        {name: 'Eldritch Blast', castTime: '1 Action', range: '120ft', hitDC: '', damage: {amount: 1, size: 10, type: 'Force'}, isConcentration: false, isRitual: false},
        {name: 'Guidance', castTime: '1 Action', range: 'Touch', hitDC: '1d4', damage: {amount: 0, size: 0, type: ''}, isConcentration: true, isRitual: false},
        {name: 'Hand of Radiance', castTime: '1 Action', range: '5ft', hitDC: 'Con', damage: {amount: 1, size: 6, type: 'Radiant'}, isConcentration: false, isRitual: false},
    ]
    const levelOne = [
        {name: 'Detect Magic', castTime: '1 Action', range: 'Self/ 30ft', hitDC: '', damage: {amount: 0, size: 0, type: ''}, isConcentration: true, isRitual: true},
        {name: 'Color Spray', castTime: '1 Action', range: 'Self/ 30ft Cone', hitDC: '', damage: {amount: 6, size: 6, type: ''}, isConcentration: false, isRitual: false},
    ]
    const levelTwo = [
        {name: 'Branding Smite', castTime: '1 Bonus Action', range: 'Self', hitDC: '', damage: {amount: 2, size: 6, type: ''}, isConcentration: true, isRitual: false},
    ]
    const levelThree = [
        {name: 'Clairvoyance', castTime: '10 Minutes', range: '1 Mile', hitDC: '', damage: {amount: 0, size: 0, type: ''}, isConcentration: false, isRitual: true},
    ]
    // const levelFour = [{name: 'Long-Sword', castTime: '', range: '', hitDC: '', damage: {amount: 1, size: 6, type: ''}, isConcentration: false, isRitual: false},]

    const spellLabels = ['Cantrip', 'Level 1', 'Level 2', 'Level 3', 'Level 4']
    const allSpells = [cantrips].concat([levelOne], [levelTwo], [levelThree]) //, [levelFour])
    const [ avaiableSpellSlots, setAvailableSpellSlots ] = useState({
        0: 0,
        1: 3,
        2: 2,
        3: 2,
        4: 1,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
        9: 0,
    })

    return (
        <View style={styles.container}>
            <ScrollView style={{borderEndEndRadius: 25, borderStartEndRadius: 25, paddingHorizontal: 10, marginBottom: 10}} onScrollBeginDrag={onTouchStart} onScrollEndDrag={onTouchEnd}>
                {
                    allSpells.map((spellVariety, index, array) => {
                        // console.log(avaiableSpellSlots[index])
                        const [ spellsUsed, setSpellsUsed ] = useState(0)
                        return (
                            <View key={spellLabels[index]} style={{paddingBottom: 10}}>
                                <View style={{borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
                                    <Text style={styles.spellHeader}>{spellLabels[index]}</Text>
                                    <View style={{flexDirection: 'row'}}>
                                        <BouncyCheckbox fillColor='red' isChecked={spellsUsed>0} disabled style={avaiableSpellSlots[index] > 0 ? {} : {display: 'none'}}/>
                                        <BouncyCheckbox fillColor='red' isChecked={spellsUsed>1} disabled style={avaiableSpellSlots[index] > 1 ? {} : {display: 'none'}}/>
                                        <BouncyCheckbox fillColor='red' isChecked={spellsUsed>2} disabled style={avaiableSpellSlots[index] > 2 ? {} : {display: 'none'}}/>
                                        <BouncyCheckbox fillColor='red' isChecked={spellsUsed>3} disabled style={avaiableSpellSlots[index] > 3 ? {} : {display: 'none'}}/>
                                        <BouncyCheckbox fillColor='red' isChecked={spellsUsed>4} disabled style={avaiableSpellSlots[index] > 4 ? {} : {display: 'none'}}/>
                                    </View>
                                </View>
                                {
                                    spellVariety.length > 0 ? spellVariety.map((spell, jndex, array) => {
                                        const spellAdditions = [spell.isConcentration, spell.isRitual].map((add, i , arr) => {
                                            if(add){
                                                return ['Concetration', 'Ritual'][i]
                                            }
                                        })
                                        return (
                                            <View key={jndex + (index * 3)} style={{}}>
                                                
                                                <View  style={{justifyContent: 'space-between', alignItems: 'center', flexDirection: 'row'}}>
                                                    <Text style={styles.spellTitle}>
                                                        {spell.name}
                                                    </Text>
                                                    <Text style={[styles.spellTitle, {fontSize: 12}]}>{!spellAdditions.includes(undefined) ? spellAdditions.join(', ') : spellAdditions.filter((add, i, arr) => {return add != undefined})}</Text>
                                                </View>
                                                <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                                    <TouchableOpacity style={{borderWidth: 1, borderRadius: 15, padding: 5, width: '15%' }} 
                                                    onPress={() => {
                                                        if(spellsUsed < 5){setSpellsUsed(spellsUsed + 1)}
                                                    }} 
                                                    onLongPress={() => {
                                                        setSpellsUsed(0)
                                                    }}><Text style={{textAlign: 'center'}}>Cast</Text></TouchableOpacity>
                                                    <View><Text style={{textAlign: 'center', fontSize: 8}}>Cast-Time</Text><Text style={{textAlign: 'center', fontSize: 12}}>{spell.castTime && spell.castTime}</Text></View>
                                                    <View><Text style={{textAlign: 'center', fontSize: 8}}>Range</Text><Text style={{textAlign: 'center', fontSize: 12}}>{spell.range && spell.range}</Text></View>
                                                    <View><Text style={{textAlign: 'center', fontSize: 8}}>Hit/DC</Text><Text style={{textAlign: 'center', fontSize: 12}}>{spell.hitDC && spell.hitDC}</Text></View>
                                                    <View><Text style={{textAlign: 'center', fontSize: 8}}>Damage</Text><Text style={{textAlign: 'center', fontSize: 12}}>{spell.damage.amount > 0 ? `${spell.damage.amount}d${spell.damage.size} ${spell.damage.type}` : ''}</Text></View>
                                                    
                                                    {/* <Text style={styles.spellDetails}>
                                                        {spell.details}
                                                    </Text> */}
                                                </View>
                                            </View>
                                        )
                                    }) : null
                                }
                            </View>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderEndEndRadius: 25,
        borderStartEndRadius: 25,
        backgroundColor: 'green'
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

export default Spells