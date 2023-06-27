import {
    View,
    ScrollView,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native'
import { colorDark } from '../../../../configs/constant'

const WisataPopular = ({ listWisataPopular, showDetail }) => {
    return (
        <View>
            <View style={styles.wrapLabel}>
                <Text style={styles.label}>Wisata Terpopuler</Text>
            </View>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.wrapScrollHorizontal}>
                {listWisataPopular.map((item, i) =>
                    <TouchableOpacity key={i} style={styles.itemHorizontal} onPress={() => showDetail(item)}>
                        <Image source={{ uri: item.photo }} style={styles.image} />
                        <Text style={styles.labelItem}>{item.title}</Text>
                        <Text style={{ color: colorDark }}>Rp {item.price}</Text>
                    </TouchableOpacity>
                )}
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    wrapScrollHorizontal: {
        width: '100%',
        paddingTop: 5,
        paddingHorizontal: 5,
        marginVertical: 5
    },
    itemHorizontal: {
        width: 300,
        height: 230,
        borderWidth: 1,
        borderColor: '#dedede',
        borderRadius: 8,
        padding: 10,
        marginHorizontal: 5
    },
    wrapLabel: {
        marginLeft: 15,
        marginTop: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colorDark
    },
    image: {
        width: '100%',
        height: '80%',
        marginBottom: 5
    },
    labelItem: {
        color: colorDark
    },
})

export default WisataPopular