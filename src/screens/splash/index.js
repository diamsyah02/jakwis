import { useCallback, useEffect } from 'react'
import {
    Text,
    View,
    Image
} from 'react-native'
import styles from './styles'
import { getAsyncStorage } from '../../configs/localstorage'
import { KEY_AUTH } from '../../configs/constant'
import { useAtom } from 'jotai'
import { putFullname, putID } from '../../stores'

const SplashScreen = () => {
    const [idUser, setIdUser] = useAtom(putID)
    const [fullname, setFullname] = useAtom(putFullname)

    useEffect(() => {
        callBackGetDataUser()
        return () => {}
    }, [])
    
    const callBackGetDataUser = useCallback(() => {
        getDataUserFromAsyncStorage()
    }, [idUser, fullname])

    async function getDataUserFromAsyncStorage() {
        const data = await getAsyncStorage(KEY_AUTH)
        if(data != null) {
            const parsed = JSON.parse(data)
            setIdUser(parsed.id)
            setFullname(parsed.fullname)
        }
    }
    return(
        <>
            <View style={styles.container}>
                <Image source={require('../../assets/icon.png')} style={{ width:'100%', height: 150, resizeMode: 'contain' }} />
                <Text style={styles.text}>Jakwist</Text>
                <Text>Jakarta Wisata App</Text>
            </View>
        </>
    )
}

export default SplashScreen