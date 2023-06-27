import {
    View,
    Text,
    StyleSheet
} from 'react-native'
import { colorDark, colorLight } from '../../../../configs/constant'

const Detail = () => {
    return(
        <>
            <View style={styles.container}>
                <Text style={{...styles.text, fontWeight: 'bold', fontSize: 20, marginBottom: 10}}>Example Jakwis 1</Text>
                <View style={styles.wrap}>
                    <Text style={{...styles.text, flex: 0.2}}>Qty</Text>
                    <Text style={{...styles.text, flex: 0.1}}>:</Text>
                    <Text style={{...styles.text, flex: 0.7}}>2 Ticket</Text>
                </View>
                <View style={styles.wrap}>
                    <Text style={{...styles.text, flex: 0.2}}>Price</Text>
                    <Text style={{...styles.text, flex: 0.1}}>:</Text>
                    <Text style={{...styles.text, flex: 0.7}}>Rp. 30.000</Text>
                </View>
                <View style={styles.wrap}>
                    <Text style={{...styles.text, flex: 0.2}}>Date</Text>
                    <Text style={{...styles.text, flex: 0.1}}>:</Text>
                    <Text style={{...styles.text, flex: 0.7}}>06 Mei 2023</Text>
                </View>
                <View style={styles.wrap}>
                    <Text style={{...styles.text, flex: 0.2}}>Address</Text>
                    <Text style={{...styles.text, flex: 0.1}}>:</Text>
                    <Text style={{...styles.text, flex: 0.7}}>Ragunan Pasar Minggu Jakarta Selatan, Jakarta.</Text>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 15,
        backgroundColor: colorLight,
        borderRadius: 8
    },
    text: {
        color: colorDark,
    },
    wrap: {
        flexDirection: 'row',
        marginVertical: 5
    }
})

export default Detail