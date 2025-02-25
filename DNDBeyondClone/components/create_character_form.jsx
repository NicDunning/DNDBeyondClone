import FormInputs from './create_character_form_inputs'
import useFormContext from '../hooks/useFormContext';
import useCharacterContext from '../hooks/useCharacterContext';
import { SaveFile, LoadFile, ClearFile } from './file_system';
import { AddCharacter } from '../components/character_data'
import { Text, View, Form, Button, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react'

const CreateCharacterForm = ({toggleModal}) => {

    const {
        page,
        setPage,
        data,
        titles,
        canSubmit
    } = useFormContext()

    const {
        characters,
        setCharacters
    } = useCharacterContext()

    const title = titles[page]
    const primaryColor = "#0891b2";
    const secondaryColor = 'white'//"#737373";

    const handlePrev = () => {
        setPage(prev => prev - 1) 
    }

    const handleNext = () => {
        setPage(prev => prev + 1) 
    }

    const handleSubmit = async e => {
        e.preventDefault()
        const storedData = await AddCharacter(data)
        setCharacters(storedData)
        toggleModal()
    }

    return (
        <View style={{backgroundColor: 'red'}}>
            <View style={{flexDirection: 'row', backgroundColor: 'orange', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 5}}>
                <Text>{title}</Text>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', width:'40%'}}>
                    <TouchableOpacity style={styles.formButton} onPress={handlePrev} disabled={page == 0}>
                        <MaterialCommunityIcons name="page-previous-outline" size={24} color={secondaryColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.formButton} onPress={handleNext} disabled={page == titles.length - 1}>
                        <MaterialCommunityIcons name="page-next-outline" size={24} color={secondaryColor}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.formButton} disabled={!canSubmit} onPress={handleSubmit}>
                        <MaterialCommunityIcons name="content-save-outline" size={24} color={secondaryColor}/>
                    </TouchableOpacity>
                </View>
            </View>
            <FormInputs/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '95%',
        width: '100%',
        backgroundColor: 'red'
    },
    header: {
        flexDirection: 'row',
        width: '100%'
    },
    formButton: {
        // backgroundColor: '#2196F3',
        alignItems: 'center',
        justifyContent: 'center',
        width: 30,
        height: 30,
        borderRadius: 10,
        margin: 5
    },
    // formButtonText: {
    //     color: 'white',
    //     fontSize: 10
    // }
})

export default CreateCharacterForm