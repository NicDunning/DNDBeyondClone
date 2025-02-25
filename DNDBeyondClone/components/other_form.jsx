import { View, Text } from 'react-native'
import useFormContext from '../hooks/useFormContext'
import React from 'react'

const OtherForm = () => {

    const { data, handleChange } = useFormContext()

    return (
        <View>
            <Text>
                Other Stuff Goes Here
            </Text>
        </View>
    )
}

export default OtherForm