import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colorLight, colorPrimary } from '../../../../configs/constant'
import { clearAsyncStorage } from '../../../../configs/localstorage'
import { useAtom } from 'jotai'
import { putFullname, putID } from '../../../../stores'

const MenuBottom = ({ navigation }) => {
    const [idUser, setIdUser] = useAtom(putID)
    const [fullname, setFullname] = useAtom(putFullname)

    async function onLogout() {
        setIdUser(0)
        setFullname('Guest')
        await clearAsyncStorage()
        navigation.navigate('Login')
    }
    return (
        <>
            <View style={styles.container}>
                <View style={styles.wrapFlex}>
                    <TouchableOpacity style={styles.perFlex} onPress={() => navigation.navigate('Booking')}>
                        <Icon name="book" size={15} color={colorLight} />
                        <Text style={styles.text}>Booking</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.perFlex} onPress={() => navigation.navigate('History')}>
                        <Icon name="history" size={15} color={colorLight} />
                        <Text style={styles.text}>History</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.perFlex} onPress={() => onLogout()}>
                        <Icon name={idUser == 0 && fullname == 'Guest' ? 'sign-in-alt' : 'sign-out-alt'} size={15} color={colorLight} />
                        <Text style={styles.text}>{idUser == 0 && fullname == 'Guest' ? 'Login' : 'Logout'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 10,
        paddingHorizontal: 40,
        width: '100%',
    },
    wrapFlex: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        backgroundColor: colorPrimary,
    },
    perFlex: {
        marginHorizontal: 20,
        paddingVertical: 14,
        paddingHorizontal: 7,
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        color: colorLight
    }
})

export default MenuBottom