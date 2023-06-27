import {
    StyleSheet
} from 'react-native'
import { colorPrimary } from '../../../configs/constant'

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    wrapBtnUp: {
        position: 'absolute', bottom: 10, right: 10
    },
    btnUp: {
        borderRadius: 100,
        backgroundColor: colorPrimary,
        paddingVertical: 10,
        paddingHorizontal: 13
    }
})

export default styles