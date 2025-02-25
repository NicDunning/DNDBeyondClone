import * as FileSystem from 'expo-file-system';

const dir_base = FileSystem.documentDirectory

export const SaveFile = async (fileName, data) => {
    const dir = dir_base + fileName

    console.log("saving file ", dir)

    await FileSystem.writeAsStringAsync(dir, JSON.stringify(data))
}

export const LoadFile = async (fileName) => {

    const dir = dir_base + fileName

    console.log('loading file ', dir)

    const response = await FileSystem.readAsStringAsync(dir)

    return response
}

export const ClearFile = (fileName) => {

    const dir = dir_base + fileName

    console.log('clearing file ', dir)

    FileSystem.writeAsStringAsync(dir, JSON.stringify([]))
}
