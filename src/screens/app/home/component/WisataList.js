import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image,
    RefreshControl,
    StyleSheet
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { colorDark } from '../../../../configs/constant'
import { useState } from 'react';

const WisataList = ({ listWisata, FlatListRef, refreshing, showDetail, setContentVerticalOffset, onRefresh, beginFilter }) => {
    const [filter, setFilter] = useState('')

    function onFilter(text) {
        setFilter(text)
        beginFilter(text)
    }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.wrapLabel}>
                <View style={{ flex: 0.4 }}>
                    <Text style={styles.label}>Daftar Wisata</Text>
                </View>
                <View style={styles.wrapPicker}>
                    <Picker
                        style={styles.picker}
                        selectedValue={filter}
                        onValueChange={(itemValue, itemIndex) =>
                            onFilter(itemValue)
                        }>
                        <Picker.Item label='--- Filter ---' value='' />
                        <Picker.Item label='Jakarta Pusat' value='jakarta pusat' />
                        <Picker.Item label='Jakarta Selatan' value='jakarta selatan' />
                        <Picker.Item label='Jakarta Timur' value='jakarta timur' />
                        <Picker.Item label='Jakarta Barat' value='jakarta barat' />
                        <Picker.Item label='Jakarta Utara' value='jakarta utara' />
                    </Picker>
                </View>
            </View>
            <FlatList
                style={styles.wrapScrollVertical}
                ref={FlatListRef}
                data={listWisata}
                numColumns={2}
                renderItem={({ item, i }) =>
                    <TouchableOpacity style={styles.itemVertical} onPress={() => showDetail(item)}>
                        <Image source={{ uri: item.photo }} style={styles.image} />
                        <Text style={styles.labelItem}>{item.title}</Text>
                        <Text style={{ color: colorDark }}>Rp {item.price}</Text>
                    </TouchableOpacity>
                }
                keyExtractor={(item, i) => i}
                onScroll={({ nativeEvent }) => setContentVerticalOffset(nativeEvent.contentOffset.y)}
                refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    wrapScrollVertical: {
        width: '100%',
        paddingTop: 5,
        paddingHorizontal: 5,
        marginVertical: 5
    },
    itemVertical: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#dedede',
        borderRadius: 8,
        padding: 10,
        margin: 5
    },
    wrapLabel: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 15,
        marginTop: 10
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colorDark
    },
    image: {
        width: '100%',
        height: 150,
        marginBottom: 5
    },
    labelItem: {
        color: colorDark
    },
    wrapPicker: {
        flex: 0.6,
        borderWidth: 1,
        borderColor: colorDark,
        borderRadius: 8
    },
    picker: {
        color: colorDark
    },
})

export default WisataList