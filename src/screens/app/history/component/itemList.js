import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableOpacity
} from 'react-native'
import { colorDark, colorLight, colorPrimary, colorRed } from '../../../../configs/constant'
import PrintPDF from '../../../../utils/PrintPDF'
import Icon from 'react-native-vector-icons/FontAwesome5'

const ItemList = ({ item, fullname, openMaps }) => {
    return (
        <>
            <View style={styles.itemVertical}>
                <Image source={{ uri: item.photo }} style={styles.image} />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={styles.wrapText}>
                        <Text style={styles.labelItem}>{item.title}</Text>
                        <Text style={{ color: colorDark }}>{item.qty} Ticket - Rp {parseInt(item.qty) * parseInt(item.price)}</Text>
                        <Text style={{ color: colorPrimary }}>{item.created_at}</Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={styles.btnPrint} onPress={() => PrintPDF(item, fullname)}>
                            <Icon name='print' size={12} color={colorLight} />
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.btnMaps} onPress={() => openMaps(item.url_maps)}>
                            <Icon name='map-marked-alt' size={12} color={colorLight} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
        borderColor: colorPrimary,
        paddingLeft: 5
    },
    labelItem: {
        color: colorDark,
        fontSize: 15,
        fontWeight: 'bold'
    },
    btnPrint: {
        width: 30,
        height: 30,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        marginRight: 5,
        backgroundColor: colorPrimary
    },
    btnMaps: {
        width: 30,
        height: 30,
        borderRadius: 50,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: colorRed
    },
    textBtn: {
        color: colorLight,
        textAlign: 'center'
    },
})

export default ItemList