import { Text, View } from 'react-native'
import React from 'react'
import useFormContext from '../hooks/useFormContext'
import CharacterForm from './character_form'
import BackgroundForm from './background_form'
import ClassForm from './class_form'
import AbilityScoreForm from './ability_score_form'
import OtherForm from './other_form'

const FormInputs = ({}) => {
    const { page } = useFormContext()
    const display = {
        0: <CharacterForm/>,
        1: <BackgroundForm/>,
        2: <ClassForm/>,
        3: <AbilityScoreForm/>,
        4: <OtherForm/>,
    }

    return (
        <View>
            {display[page]}
        </View>
    )
}

export default FormInputs