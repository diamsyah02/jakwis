import { StyleSheet } from 'react-native'
import { colorDark, colorLight, colorLightGray, colorPrimary } from '../../../configs/constant'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colorLightGray,
    },
    wrapPayment: {
        width: '100%',
        padding: 15,
        backgroundColor: colorLight,
        borderRadius: 8,
        marginTop: 10
    },
    footer: {
        paddingVertical: 13,
        paddingHorizontal: 13,
        backgroundColor: colorLight
    },
    btn: {
        width: '100%',
        paddingVertical: 10,
        backgroundColor: colorPrimary,
        borderRadius: 8
    },
    textBtn: {
        color: colorLight,
        textAlign: 'center'
    },
    wrapPicker: {
        borderWidth: 1,
        borderColor: colorDark,
        borderRadius: 8
    },
    picker: {
        color: colorDark
    },
    labelPayment: {
        color: colorDark,
        fontSize: 18,
        marginBottom: 10
    },
    rekening: {
        marginTop: 20
    }
})

export default styles