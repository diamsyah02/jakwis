import AsyncStorage from '@react-native-async-storage/async-storage'
import { KEY_AUTH } from './constant'

export const setAsyncStorage = async (data) => {
    try {
        await AsyncStorage.setItem(KEY_AUTH, JSON.stringify(data))
        return true
    } catch(e) {
        console.log(e)
        return false
    }
}

export const getAsyncStorage = async () => {
    try {
        let data = await AsyncStorage.getItem(KEY_AUTH)
        if(data != undefined) return data
        return null
    } catch(e) {
        console.log(e)
        return null
    }
}

export const clearAsyncStorage = async () => {
    try {
        await AsyncStorage.clear()
        return true
    } catch(e) {
        console.log(e)
        return false
    }
}