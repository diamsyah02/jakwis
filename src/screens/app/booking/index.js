import { useCallback, useEffect, useState } from 'react'
import {
    View,
    FlatList,
    RefreshControl
} from 'react-native'
import styles from './styles'
import ItemList from './component/itemList'
import { getData } from '../../../configs/fetching'
import Loading from '../../../components/Loading'
import { useAtom } from 'jotai'
import { putID } from '../../../stores'

const BookingScreen = ({ navigation }) => {
    const[listBooking, setListBooking] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [idUser, setIdUser] = useAtom(putID)
    useEffect(() => {
        getBooking('')
        return() => setListBooking([])
    }, [])

    async function getBooking(from) {
        if(from == '') setLoading(true)
        const res = await getData(`order/booking/${idUser}`)
        if (res != undefined || res != false) {
            setLoading(false)
            setListBooking(res.data.result)
        }
    } 

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getBooking('refresh')
        setRefreshing(false)
    }, [listBooking])
    return(
        <>
            {loading && <Loading />}
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={listBooking}
                    renderItem={({ item }) => <ItemList item={item} navigation={navigation}/>}
                    keyExtractor={(item, i) => i}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>
        </>
    )
}

export default BookingScreen