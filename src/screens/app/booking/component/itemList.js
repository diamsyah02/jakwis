import {
    StyleSheet,
    View,
    Image,
    TouchableOpacity,
    Text
} from 'react-native'
import { colorDark, colorPrimary, colorRed } from '../../../../configs/constant'

const ItemList = ({ item, navigation }) => {
    return (
        <>
            <TouchableOpacity style={styles.itemVertical} onPress={() => navigation.navigate('Payment', { item: item })}>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <View style={styles.wrapText}>
                <Text style={styles.labelItem}>{item.title}</Text>
                <Text style={{ color: colorDark }}>{item.qty} Ticket - Rp {parseInt(item.qty)*parseInt(item.price)}</Text>
                <Text style={{ color: colorRed }}>{item.created_at} - Unpaid</Text>
                </View>
            </TouchableOpacity>
        </>
    )
}

const styles = StyleSheet.create({
    itemVertical: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#dedede',
        borderRadius: 8,
        padding: 10,
        margin: 5
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 5
    },
    wrapText: {
        borderLeftWidth: 2.5,
        borderColor: colorRed,
        paddingLeft: 5
    },
    labelItem: {
        color: colorDark,
        fontSize: 15,
        fontWeight: 'bold'
    },
})

export default ItemList