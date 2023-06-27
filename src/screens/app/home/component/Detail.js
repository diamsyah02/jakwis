import { useMemo, useState } from 'react'
import {
    View,
    Image,
    StyleSheet,
    Text,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Dimensions
} from 'react-native'
import Carousel from 'react-native-reanimated-carousel';
import Icon from 'react-native-vector-icons/FontAwesome5'
import { colorDark, colorLight, colorPrimary } from '../../../../configs/constant'
import { useAtom } from 'jotai'
import { putFullname, putID } from '../../../../stores'

let width = Dimensions.get('screen').width

const Detail = ({ detail, onBook }) => {
    const [idUser, setIdUser] = useAtom(putID)
    const [fullname, setFullname] = useAtom(putFullname)
    const [qty, setQty] = useState(0)

    let images = detail.list_photo.split('||')

    const qtyMemo = useMemo(() => qty, [qty])

    function bookTicket() {
        if (idUser == 0 && fullname == 'Guest') return ToastAndroid.show(`Please login first time!`, ToastAndroid.SHORT)
        if (qty == 0) return ToastAndroid.show(`Minimum book, 1 ticket!`, ToastAndroid.SHORT)
        onBook({ qty: qty, item: detail })
    }

    function changeQty(is) {
        if (is == '-') {
            if (qty > 0) setQty(qty - 1)
        }
        if (is == '+') setQty(qty + 1)
    }
    return (
        <>
            <ScrollView style={styles.container}>
                <Carousel
                    loop
                    width={width}
                    height={width/2}
                    autoPlay={true}
                    data={images}
                    scrollAnimationDuration={1000}
                    onSnapToItem={(index) => console.log('current index:', index)}
                    renderItem={({ item, index }) => (
                        <Image source={{ uri: item }} style={styles.image} />
                    )}
                />
                <View style={styles.wrapText}>
                    <Text style={styles.title}>{detail.title} (Rp {detail.price.toLocaleString()})</Text>
                    <Text style={styles.content}>{detail.description}</Text>
                </View>
            </ScrollView>
            <View style={styles.wrapBtn}>
                <View style={styles.wrapQty}>
                    <TouchableOpacity onPress={() => changeQty('-')}>
                        <Icon name='minus-circle' size={18} color={colorPrimary} />
                    </TouchableOpacity>
                    <Text style={{ color: colorDark }}>{qtyMemo}</Text>
                    <TouchableOpacity onPress={() => changeQty('+')}>
                        <Icon name='plus-circle' size={18} color={colorPrimary} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.btn} onPress={() => bookTicket()}>
                    <Icon name='bookmark' size={12} color={colorLight} />
                    <Text style={styles.textBtn}>Book</Text>
                </TouchableOpacity>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorLight
    },
    wrapText: {
        paddingVertical: 10,
        paddingHorizontal: 13
    },
    title: {
        fontSize: 18,
        color: colorDark,
        fontWeight: 'bold',
        marginBottom: 7
    },
    content: {
        textAlign: 'justify',
        color: colorDark
    },
    wrapBtn: {
        flexDirection: 'row',
        backgroundColor: colorLight,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 13
    },
    image: {
        width: '100%',
        height: 250,
        resizeMode: 'cover'
    },
    btn: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 8,
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: colorPrimary
    },
    textBtn: {
        color: colorLight,
        marginLeft: 5
    },
    wrapQty: {
        flex: 0.8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 25,
        paddingLeft: 5
    }
})

export default Detail