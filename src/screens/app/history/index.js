import { useCallback, useEffect, useState } from 'react'
import {
    View,
    FlatList,
    RefreshControl,
    Linking,
    Alert
} from 'react-native'
import styles from './styles'
import ItemList from './component/itemList'
import Loading from '../../../components/Loading'
import { getData } from '../../../configs/fetching'
import { useAtom } from 'jotai'
import { putFullname, putID } from '../../../stores'

const HistoryScreen = () => {
    const [listHistory, setListHistory] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [idUser, setIdUser] = useAtom(putID)
    const [fullname, setFullname] = useAtom(putFullname)

    useEffect(() => {
        getHistory('')
        return () => setListHistory([])
    }, [])

    async function getHistory(from) {
        if(from == '') setLoading(true)
        const res = await getData(`order/history/${idUser}`)
        if (res != undefined || res != false) {
            setLoading(false)
            setListHistory(res.data.result)
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getHistory('refresh')
        setRefreshing(false)
    }, [listHistory])

    async function openMaps(url) {
        if(url == null) {
            Alert.alert(`Url not available`);
        } else {
            const supported = await Linking.canOpenURL(url)
            if(supported) {
                await Linking.openURL(url)
            } else {
                Alert.alert(`Don't know how to open this URL: ${url}`);
            }
        }
    }
    
    return (
        <>
            {loading && <Loading />}
            <View style={styles.container}>
                <FlatList
                    style={styles.list}
                    data={listHistory}
                    renderItem={({ item }) => <ItemList item={item} fullname={fullname} openMaps={(url) => openMaps(url)} />}
                    keyExtractor={(item, i) => i}
                    refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
                />
            </View>
        </>
    )
}

export default HistoryScreen