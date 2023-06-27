import {
    StyleSheet
} from 'react-native'
import { colorDark, colorLight, colorPrimary } from '../../../configs/constant'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 40,
        // alignItems: 'center',
        paddingHorizontal: 30
    },
    title: {
        color: colorPrimary,
        fontSize: 55,
        fontWeight: 'bold',
        // marginBottom: 10
    },
    text: {
        color: colorDark,
    },
    wrapInput: {
        paddingVertical: 5,
        width: '100%'
    },
    input: {
        borderWidth: 1,
        borderColor: colorDark,
        paddingHorizontal: 7,
        paddingVertical: 5,
        borderRadius: 8,
        color: colorDark
    },
    btn: {
        width: '100%',
        borderRadius: 8,
        paddingVertical: 10,
        marginTop: 5,
        backgroundColor: colorPrimary
    },
    textBtn: {
        color: colorLight,
        textAlign: 'center'
    }
})

export default styles