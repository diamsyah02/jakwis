import { useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useAtom } from 'jotai'
import {
    BackHandler,
    Alert,
    TextInput,
    View,
    Text,
    TouchableOpacity
} from 'react-native'
import styles from './styles'
import { postData } from '../../../configs/fetching'
import Loading from '../../../components/Loading'
import { setAsyncStorage } from '../../../configs/localstorage'
import { putFullname, putID } from '../../../stores'

const LoginScreen = ({ navigation }) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [fullname, setFullname] = useAtom(putFullname)
    const [idUser, setIdUser] = useAtom(putID)

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, [])
    )

    function backAction() {
        Alert.alert('Wait', 'Are you sure you want to close app?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    };

    async function onLogin() {
        if(email == '' || password == '') return alert('Please input all form!')
        setLoading(true)
        let body = {
            email: email,
            password: password
        }
        const res = await postData(`auth/login`, body)
        if (res != undefined || res != false) {
            setLoading(false)
            console.log(res.response)
            if (res.status != 200) alert(res.response.data.message)
            if (res.status == 200) {
                setAsyncStorage(res.data.result)
                setFullname(res.data.result.fullname)
                setIdUser(res.data.result.id)
                navigation.navigate('Home')
            }
        }
    }
    return (
        <>
            {loading && <Loading />}
            <View style={styles.container}>
                <Text style={styles.title}>Jakwist</Text>
                <Text style={styles.text}>Login Jakarta Wisata App</Text>
                <View style={{ ...styles.wrapInput, marginTop: 25 }}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => onLogin()}>
                    <Text style={styles.textBtn}>Login</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btnRegister} onPress={() => navigation.navigate('Register')}>
                    <Text style={{ ...styles.text, textAlign: 'center' }}>Belum punya akun?</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default LoginScreen