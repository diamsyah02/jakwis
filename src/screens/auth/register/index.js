import { useState } from 'react'
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import styles from './styles'
import { postData } from '../../../configs/fetching'
import Loading from '../../../components/Loading'

const RegisterScreen = ({ navigation }) => {
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [handphone, setHandphone] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [loading, setLoading] = useState(false)
    async function onRegister() {
        if(fullname == '' || email == '' || handphone == '' || password == '') return alert('Please input all form!')
        if(password !== confirmPass) return alert('Password is not match!')
        setLoading(true)
        let body = {
            fullname: fullname,
            email: email,
            no_hp: handphone,
            password: password
        }
        const res = await postData(`auth/register`, body)
        if (res != undefined || res != false) {
            setLoading(false)
            if (res.status != 200) alert(res.response.data.message)
            if (res.status == 200) {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
                navigation.goBack()
            }
        }
    }
    return (
        <>
            {loading && <Loading />}
            <View style={styles.container}>
                <Text style={styles.title}>Jakwist</Text>
                <Text style={styles.text}>Register Jakarta Wisata App</Text>
                <View style={{ ...styles.wrapInput, marginTop: 25 }}>
                    <Text style={styles.text}>Fullname</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setFullname(text)}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>No Handphone</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setHandphone(text)}
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
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>Confirm Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setConfirmPass(text)}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => onRegister()}>
                    <Text style={styles.textBtn}>Register</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default RegisterScreen