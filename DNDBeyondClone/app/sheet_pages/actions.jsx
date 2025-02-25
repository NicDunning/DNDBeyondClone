import { View, Text, StyleSheet, ScrollView} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import React from 'react'
import { useSwipe } from '../../hooks/useSwipe'

const CalculateModifier = (score) => {
    let mod = (score - 10) / 2
    return Math.floor(mod)
}

const AddSymbol = (number) => {return number >= 0 ? `+${number}` : `${number}`}

const getProficiencyBonus = (level) => {
    return Math.floor( level / 4 ) + 1
}

const Actions = (params) => {
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
    const weapons = [
        {name: 'Long-Sword', type: 'Melee Attack', range: '5ft', damage: {amount: 1, size: 6}, hitModifier: 'strength', damageType: 'slashing', properties: [], damageBonus: 0, hitBonus: 0},
        {name: 'Short-Bow', type: 'Ranged Attack', range: '30/60ft', damage: {amount: 2, size: 8}, hitModifier: 'dexterity', damageType: 'piercing', properties: [],  damageBonus: 1, hitBonus: 1},
        {name: 'Pugilist Gloves', type: 'Other Attack', range: '5ft', damage: {amount: 1, size: 6}, hitModifier: 'strength', damageType: 'bludgeoning', properties: ['Thrown (30/60ft)', 'Versatile (1D8)'], damageBonus: 0, hitBonus: 0},]
    const actions = [
        {name: 'Lay on Hands', details: 'Your blessed touch can heal wounds. You have a pool of healing power that replenishes when you take a long rest. With that pool, you can restore a total number of hit points equal to your paladin level x 5. \n\nAs an action, you can touch a creature and draw power from the pool to restore a number of hit points to that creature, up to the maximum amount remaining in your pool. \n\nAlternatively, you can expend 5 hit points from your pool of healing to cure the target of one disease or neutralize one poison affecting it. You can cure multiple diseases and neutralize multiple poisons with a single use of Lay on Hands, expending hit points separately for each one. \n\nThis feature has no effect on undead and constructs.', modifiers: []},
        {name: 'Wild Shape', details: '', modifiers: []},
        {name: 'Channel Divinity: Turn Undead', details: '', modifiers: []}]
    const bonusActions = [
        {name: 'Cunning Action', details: '', modifiers: [] }, 
        {name: 'Steady Aim', details: '', modifiers: [] }, 
        {name: 'Second Wind', details: '', modifiers: [] }]
    const reactions = [
        {name: 'Deflect Missile', details: '', modifiers: [] }, 
        {name: 'Flash of Genius', details: '', modifiers: [] }, 
        {name: 'Soul of Artifice', details: '', modifiers: [] }]
    const specialActions = [
        {name: 'Extra Attack', details: 'Beginning at 5th level, you can attack twice, instead of once, whenever you take the Attack action on your turn.', modifiers: []}, 
        {name: 'Action Surge', details: '', modifiers: [] }, 
        {name: 'Pact of the Chain', details: '', modifiers: [] }]
    const actionLabels = ['Actions', 'Bonus Actions', 'Reactions', 'Special Actions']
    const allActions = [actions].concat([bonusActions], [reactions], [specialActions])

    return (
        <View style={styles.container}>
            <ScrollView style={{borderEndEndRadius: 25, borderStartEndRadius: 25, padding: 10, marginBottom: 10}} onScrollBeginDrag={onTouchStart} onScrollEndDrag={onTouchEnd}>
                {
                    weapons.length > 0 ? weapons.map((weapon, index, array) => {
                        return (
                            <View key={index} style={styles.weapon}>
                            <MaterialCommunityIcons name={weapon.type == 'Melee Attack' ? 'sword' : weapon.type == 'Ranged Attack' ? 'bow-arrow' : 'boxing-glove'} size={24} color={'black'} style={{margin: 10}} />
                            <View style={{width: '40%'}}>
                                <Text style={styles.weaponDetails}>
                                    {weapon.name}
                                </Text>
                                <Text style={styles.weaponDetails}>
                                    {weapon.type}
                                </Text>
                                <Text style={[styles.weaponDetails, {textAlignVertical: 'bottom'}]}>
                                    {weapon.range}
                                </Text>
                            </View>
                                <View style={{width: '40%', marginRight: 20}}>
                                    <Text style={[styles.weaponDetails,{textAlign: 'center'}]}>
                                        {weapon.damage.amount}d{weapon.damage.size}{weapon.damageBonus != 0 ? AddSymbol(weapon.damageBonus) : ''} {weapon.damageType}
                                    </Text>
                                </View>
                            </View>
                        )
                    }) : null
                }
                {
                    allActions.map((actionVariety, index, array) => {
                        // console.log(actionVariety.length)
                        return (
                            <View key={actionLabels[index]}>
                                <Text style={styles.abilityHeader}>{actionLabels[index]}</Text>
                                {
                                    actionVariety.length > 0 ? actionVariety.map((action, jndex, array) => {
                                        // console.log(jndex + (index * 3))
                                        return (
                                            <View key={jndex + (index * 3)} style={styles.action}>
                                                
                                                <View>
                                                    <Text style={styles.abilityTitle}>
                                                        {action.name}
                                                    </Text>
                                                </View>
                                                <View>
                                                    <Text style={styles.abilityDetails}>
                                                        {action.details}
                                                    </Text>
                                                </View>
                                            </View>
                                        )
                                    }) : <View/>
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
        flexDirection: 'row',
        borderEndEndRadius: 25,
        borderStartEndRadius: 25,
        backgroundColor: 'red',
        justifyContent: 'center'
    },
    weapon: {
        height: 100,
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        flexDirection: 'row'
    },
    action: {
        height: 'auto',
        backgroundColor: 'yellow',
        justifyContent: 'center',
        alignItems: 'stretch',
        marginTop: 10
    },
    weaponDetails: {
        textAlign: 'left',
        backgroundColor: 'red'
    },
    abilityHeader: {
        textAlign: 'left', 
        margin: 10, 
        fontSize: 20, 
        fontWeight: 800, 
        borderBottomWidth: 2
    },
    abilityTitle: {
        textAlign: 'left', 
        margin: 10, 
        fontSize: 16, 
        fontWeight: 800
    },
    abilityDetails: {
        textAlign: 'left', 
        paddingHorizontal: 20, 
        paddingBottom: 20, 
        fontSize: 12, 
        backgroundColor: 'orange'
    }
})

export default Actions