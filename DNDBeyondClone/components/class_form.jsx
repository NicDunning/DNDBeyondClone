import { View, Text, StyleSheet } from 'react-native'
import { Dropdown, MultiSelect } from 'react-native-element-dropdown'
import React from 'react'
import useFormContext from '../hooks/useFormContext'

const ClassForm = () => {
    const races = [{label: 'Human', value: 'Human'}, {label: 'Halfling', value: 'Halfling'}]
    const skills = [{label: 'Athletics', value: 'Athletics'},{label: 'Acrobatics', value: 'Acrobatics'},{label: 'Arcana', value: 'Arcana'},{label: 'Animal Handling', value: 'Animal Handling'},{label: 'Deception', value: 'Deception'}]
    const { data, handleChange } = useFormContext()

    return (
        <View style={styles.form}>
            <Dropdown 
                data={races} 
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Classes'} 
                placeholder={'Select a Class'}
                value={data.characterClass}
                search 
                onChange={(e) => {handleChange({event: e, key: 'characterClass'})}}
                style={styles.dropdown}/>
            <Dropdown 
                data={races} 
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Sub-Classes'} 
                placeholder={'Select a Sub-Class'}
                value={data.characterSubClass}
                search 
                onChange={(e) => {handleChange({event: e, key: 'characterSubClass'})}} 
                style={styles.dropdown}/>
            <MultiSelect
                data={skills} 
                value={data.classProficiencies}
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Proficiencies'} 
                placeholder={data.classProficiencies.length > 0 ? data.classProficiencies.join(', ') : 'Select Class Proficiencies'}
                search 
                visibleSelectedItem={false}
                onChange={e => {handleChange({event: e, key: 'classProficiencies', mode: 'multi'})}}
                style={styles.dropdown}/>
            <MultiSelect
                data={races} 
                value={data.toolProficiencies}
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Proficiencies'} 
                placeholder={data.toolProficiencies.length > 0 ? data.toolProficiencies.join(', ') : 'Select Tool Proficiencies'}
                search 
                visibleSelectedItem={false}
                onChange={e => {handleChange({event: e, key: 'toolProficiencies', mode: 'multi'})}}
                style={styles.dropdown}/>
            <MultiSelect
                data={races} 
                value={data.languages}
                labelField={'label'} 
                valueField={'value'} 
                searchPlaceholder={'Languages'} 
                placeholder={data.languages.length > 0 ? data.languages.join(', ') : 'Select Languages'}
                search
                visibleSelectedItem={false}
                onChange={e => {handleChange({event: e, key: 'languages', mode: 'multi'})}}
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

export default ClassForm