import { View, Text, StyleSheet, Button } from 'react-native'
import Modal from 'react-native-modal'
import React from 'react'
import CreateCharacterForm from './create_character_form'
import { FormProvider } from './form_context'

const CreateModal = (params) => {
    return (
        <Modal isVisible={params.isModalVisible} animationIn={'slideInUp'} animationOut={'slideOutDown'} animationInTiming={600} animationOutTiming={600} hideModalContentWhileAnimating={true} backdropOpacity={0}>
            <View style={{ backgroundColor: 'white', width: '100%', padding: 10, borderWidth: 1 }}>
                <FormProvider>
                    <CreateCharacterForm toggleModal={params.ToggleModal}/>
                </FormProvider>
                <Button title="Cancel" onPress={params.ToggleModal} />
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    container: {
        color: 'indigo'
    }
})

export default CreateModal