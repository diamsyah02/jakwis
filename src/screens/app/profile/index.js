import { useState, useEffect } from 'react'
import {
    TextInput,
    View,
    Text,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import styles from './styles'
import { useAtom } from 'jotai'
import { putID } from '../../../stores'
import { getData, postData } from '../../../configs/fetching'
import Loading from '../../../components/Loading'

const ProfileScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false)
    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [handphone, setHandphone] = useState('')
    const [oldPassword, setOldPassword] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const [idUser, setIdUser] = useAtom(putID)

    useEffect(() => {
        getProfile()
        return () => {}
    }, [])

    async function getProfile() {
        setLoading(true)
        const res = await getData(`auth/profile/${idUser}`)
        if (res != undefined || res != false) {
            setLoading(false)
            setFullname(res.data.result.fullname)
            setEmail(res.data.result.email)
            setHandphone(res.data.result.no_hp)
        }
    }

    async function updateProfile() {
        if(fullname == '' || email == '' || handphone == '' || oldPassword == '' || password == '') return alert('Please input all form!')
        if(password !== confirmPass) return alert('Password is not match!')
        setLoading(true)
        let body = {
            fullname: fullname,
            email: email,
            no_hp: handphone,
            password: password,
            old_password: oldPassword
        }
        const res = await postData(`auth/updateProfile/${idUser}`, body)
        if (res != undefined || res != false) {
            setLoading(false)
            if (res.status != 200) alert(res.response.data.message)
            if (res.status == 200) {
                ToastAndroid.show(res.data.message, ToastAndroid.SHORT)
                setOldPassword('')
                setPassword('')
                setConfirmPass('')
            }
        }
    }
    return (
        <>
            {loading && <Loading />}
            <View style={styles.container}>
                <Text style={styles.title}>Jakwis</Text>
                <Text style={styles.text}>Profile Kamu di Jakarta Wisata App</Text>
                <View style={{ ...styles.wrapInput, marginTop: 25 }}>
                    <Text style={styles.text}>Fullname</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setFullname(text)}
                        value={fullname}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>Email</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setEmail(text)}
                        value={email}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>No Handphone</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={(text) => setHandphone(text)}
                        value={handphone}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>Old Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setOldPassword(text)}
                        value={oldPassword}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>New Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                    />
                </View>
                <View style={styles.wrapInput}>
                    <Text style={styles.text}>Confirm New Password</Text>
                    <TextInput
                        style={styles.input}
                        secureTextEntry={true}
                        onChangeText={(text) => setConfirmPass(text)}
                        value={confirmPass}
                    />
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => updateProfile()}>
                    <Text style={styles.textBtn}>Update</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

export default ProfileScreen