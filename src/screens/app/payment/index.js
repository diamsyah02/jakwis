import { useState, useEffect } from 'react'
import {
    View,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import styles from './styles'
import Detail from './component/detail'
import { colorDark } from '../../../configs/constant'
import { getData, postData } from '../../../configs/fetching'
import Loading from '../../../components/Loading'

const PaymentScreen = ({ navigation, route }) => {
    const [bank, setBank] = useState([])
    const [rekening, setRekening] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        getBank()
        return() => {}
    }, [])
    
    async function getBank() {
        setLoading(true)
        const res = await getData(`bank`)
        if (res != undefined || res != false) {
            setLoading(false)
            setBank(res.data.result)
        }
    }

    async function postPayment() {
        setLoading(true)
        let nameBank = bank.filter((item) => {
            return item.no == rekening
        })
        let body = {
            bank: nameBank[0]['name'],
            rekening: rekening
        }
        const res = await postData(`order/payment/${route.params.item.id}`, body)
        if (res != undefined || res != false) {
            setLoading(false)
            if (res.status != 200) alert(res.response.data.message)
            if (res.status == 200) {
                ToastAndroid.show(`Ticket paid successfully`, ToastAndroid.SHORT)
                navigation.navigate('Home')
            }
        }
    }
    return (
        <>
            {loading && <Loading />}
            <View style={styles.container}>
                <ScrollView style={{ padding: 10 }}>
                    <Detail />
                    <View style={styles.wrapPayment}>
                        <Text style={styles.labelPayment}>Choose Payment Method</Text>
                        <View style={styles.wrapPicker}>
                            <Picker
                                style={styles.picker}
                                selectedValue={rekening}
                                onValueChange={(itemValue, itemIndex) =>
                                    setRekening(itemValue)
                                }>
                                    <Picker.Item label='--- Choose Bank ---' value='' />
                                    {bank.map((item, i) =>
                                        <Picker.Item key={i} label={item.name} value={item.no} />
                                    )}
                            </Picker>
                        </View>
                        {rekening !== '' &&
                            <View style={styles.rekening}>
                                <Text style={{ marginBottom: 5, color: colorDark }}>Please pay to the account number below</Text>
                                <Text style={styles.labelPayment}>{rekening}</Text>
                            </View>
                        }
                    </View>
                </ScrollView>
                <View style={styles.footer}>
                    <TouchableOpacity style={styles.btn} onPress={() => postPayment()}>
                        <Text style={styles.textBtn}>I Already Paid</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </>
    )
}

export default PaymentScreen