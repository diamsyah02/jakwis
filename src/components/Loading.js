import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator
} from 'react-native'
import { colorDark, colorLight, colorPrimary } from '../configs/constant'
const Loading = () => {
    return(
        <>
            <View style={styles.container}>
                <View style={styles.wrapText}>
                    <Text style={styles.textLabel}>JAKWIST</Text>
                    {/* <Text style={styles.text}>Wait a minute...</Text> */}
                    <ActivityIndicator size='small' color={colorPrimary} />
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        position: 'absolute',
        zIndex: 99,
        backgroundColor: colorDark,
        opacity: 0.8,
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapText: {
        backgroundColor: colorLight,
        paddingHorizontal: 30,
        paddingVertical: 20,
        borderRadius: 8
    },
    textLabel: {
        color: colorPrimary,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        marginBottom: 7
    },
    text: {
        color: colorDark,
        textAlign: 'center'
    }
})

export default Loading