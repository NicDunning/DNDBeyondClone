import { View, Text, TextInput, StyleSheet } from 'react-native'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import React, { cloneElement } from 'react'
import useFormContext from '../hooks/useFormContext'

const BackgroundForm = () => {
    const races = [{label: 'Human', value: 'Human'}, {label: 'Halfling', value: 'Halfling'}]
    const skills = [{label: 'Athletics', value: 'Athletics'},{label: 'Acrobatics', value: 'Acrobatics'},{label: 'Arcana', value: 'Arcana'},{label: 'Animal Handling', value: 'Animal Handling'},{label: 'Deception', value: 'Deception'}]
    const { data, handleChange } = useFormContext()

    return (
        <View style={styles.form}>
            <Dropdown 
                data={races} 
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Races'} 
                placeholder={'Select a Race'}
                value={data.characterRace}
                search 
                onChange={(e) => {handleChange({event: e, key: 'characterRace'})}}
                style={styles.dropdown}/>
            <Dropdown 
                data={races} 
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Races'} 
                placeholder={'Select a Sub-Race'}
                value={data.characterSubRace}
                search 
                onChange={(e) => {handleChange({event: e, key: 'characterSubRace'})}}
                style={styles.dropdown}/>
            <Dropdown 
                data={races} 
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Races'} 
                placeholder={'Select a Background'}
                value={data.background}
                search 
                onChange={(e) => {handleChange({event: e, key: 'background'})}}
                style={styles.dropdown}/>
            <MultiSelect
                data={skills}
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Races'} 
                placeholder={data.backgroundProficiencies.length > 0 ? data.backgroundProficiencies.join(', ') : 'Select Proficiencies'}
                value={data.backgroundProficiencies}
                search 
                visibleSelectedItem={false}
                onChange={e => {handleChange({event: e, key: 'backgroundProficiencies', mode: 'multi'})}}
                style={styles.dropdown}/>
        </View>
    )
}

const styles= StyleSheet.create({
    form: {
        padding: 10
    },
    dropdown: {
        backgroundColor:'rgba(0,0,0,0.1)',
        paddingHorizontal: 5,
        borderWidth: 2,
        marginVertical: 5
    },
    dropdownItem: {
        textAlign: 'center',
        backgroundColor: 'black',
        color:'white'
    }
})

export default BackgroundForm