import { useState, useRef, useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import {
    Text,
    SafeAreaView,
    ScrollView,
    View,
    Image,
    FlatList,
    TouchableOpacity,
    BackHandler,
    Alert,
    ToastAndroid,
    RefreshControl
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Modal from "react-native-modal"
import styles from './styles'
import MenuBottom from './component/MenuBottom'
import { colorDark, colorLight } from '../../../configs/constant'
import Detail from './component/Detail'
import { getData, postData } from '../../../configs/fetching'
import Loading from '../../../components/Loading'
import { useAtom } from 'jotai'
import { putID } from '../../../stores'
import WisataPopular from './component/WisataPopular'
import WisataList from './component/WisataList'

const HomeScreen = ({ navigation }) => {
    const FlatListRef = useRef(null)
    const [isDetail, setIsDetail] = useState(false)
    const [detail, setDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
    const [listWisata, setListWisata] = useState([])
    const [listWisata2, setListWisata2] = useState([])
    const [listWisataPopular, setListWisataPopular] = useState([])
    const [contentVerticalOffset, setContentVerticalOffset] = useState(0)
    const [idUser, setIdUser] = useAtom(putID)
    const CONTENT_OFFSET_THRESHOLD = 300

    useFocusEffect(
        useCallback(() => {
            const backHandler = BackHandler.addEventListener(
                'hardwareBackPress',
                backAction,
            );
            return () => backHandler.remove();
        }, [])
    )

    useEffect(() => {
        getWisata('')
        return() => {}
    }, [])

    function backAction() {
        Alert.alert('Wait', 'Are you sure you want to close app?', [
            {
                text: 'Cancel',
                onPress: () => null,
                style: 'cancel',
            },
            { text: 'YES', onPress: () => BackHandler.exitApp() },
        ]);
        return true;
    }

    async function getWisata(from) {
        if(from == '') setLoading(true)
        const res = await getData(`wisata`)
        if (res != undefined || res != false) {
            getWisataPopular()
            setListWisata(res.data.result)
            setListWisata2(res.data.result)
        }
    }

    async function getWisataPopular() {
        const res = await getData(`wisata/popular`)
        if (res != undefined || res != false) {
            setLoading(false)
            setListWisataPopular(res.data.result)
        }
    }

    const onRefresh = useCallback(() => {
        setRefreshing(true)
        getWisata('refresh')
        setRefreshing(false)
    },  [listWisata, listWisataPopular])

    function showDetail(param) {
        setDetail(param)
        setIsDetail(!isDetail)
    }

    async function onBook(param) {
        setIsDetail(!isDetail)
        setLoading(true)
        let body = {
            user_id: idUser,
            wisata_id: param.item.id,
            qty: param.qty,
            price: param.item.price
        }
        const res = await postData(`order/booking`, body)
        if (res != undefined || res != false) {
            setLoading(false)
            if (res.status == 200) {
                ToastAndroid.show(`Booking ticket successfully`, ToastAndroid.SHORT)
            }
        }
    }

    function beginFilter(text) {
        if (text != '') {
            let result = listWisata2.filter((item) => {
                return item.region.toLowerCase() == text
            })
            setListWisata(result)
        } else {
            setListWisata(listWisata2)
        }
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                {loading && <Loading />}
                <WisataPopular 
                    listWisataPopular={listWisataPopular} 
                    showDetail={(param) => showDetail(param)} 
                />
                <WisataList 
                    listWisata={listWisata} 
                    FlatListRef={FlatListRef} 
                    refreshing={refreshing}
                    showDetail={(param) => showDetail(param)} 
                    setContentVerticalOffset={(param) => setContentVerticalOffset(param)}
                    onRefresh={onRefresh}
                    beginFilter={(text) => beginFilter(text)}
                />
                {contentVerticalOffset < CONTENT_OFFSET_THRESHOLD &&
                    <MenuBottom navigation={navigation} />
                }
                {contentVerticalOffset > CONTENT_OFFSET_THRESHOLD &&
                    <View style={styles.wrapBtnUp}>
                        <TouchableOpacity style={styles.btnUp} onPress={() => FlatListRef.current.scrollToOffset({ offset: 0, animated: true })}>
                            <Icon name='angle-double-up' size={12} color={colorLight} />
                        </TouchableOpacity>
                    </View>
                }
                <Modal
                    isVisible={isDetail}
                    onBackButtonPress={() => setIsDetail(!isDetail)}
                >
                    <Detail detail={detail} onBook={(param) => onBook(param)} />
                </Modal>
            </SafeAreaView>
        </>
    )
}

export default HomeScreen