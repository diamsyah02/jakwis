import { createStackNavigator } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import { useAtom } from 'jotai'
import { Text, TouchableOpacity, ToastAndroid } from 'react-native'
import { colorLight, colorPrimary } from '../configs/constant';
import HomeScreen from '../screens/app/home';
import LoginScreen from '../screens/auth/login';
import RegisterScreen from '../screens/auth/register';
import BookingScreen from '../screens/app/booking';
import HistoryScreen from '../screens/app/history';
import ProfileScreen from '../screens/app/profile';
import PaymentScreen from '../screens/app/payment';
import { putFullname } from '../stores';

const Stack = createStackNavigator();

const HeaderRightHome = ({ fullname }) => {
    const navigation = useNavigation();
    function navigate() {
        if(fullname != 'Guest') navigation.navigate('Profile')
        else ToastAndroid.show(`Please login first time!`, ToastAndroid.SHORT)
    }
    return (
        <>
            <TouchableOpacity style={{ marginRight: 13 }} onPress={() => navigate()}>
                <Text style={{ color: colorLight, fontSize: 16 }}>{fullname}</Text>
            </TouchableOpacity>
        </>
    )
}

const MyStack = () => {
    const [fullname, setFullname] = useAtom(putFullname)
    return (
        <Stack.Navigator
            screenOptions={{
                headerTintColor: colorLight,
                headerStyle: {
                    backgroundColor: colorPrimary
                },
                headerTitleStyle: {
                    color: colorLight
                }
            }}
        >
            <Stack.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerTitle: '',
                    headerLeft: () => <Text style={{ color: colorLight, fontWeight: 'bold', fontSize: 22, marginLeft: 13 }}>JAKWIST</Text>,
                    headerRight: () => <HeaderRightHome fullname={fullname} />,
                }}
            />
            <Stack.Screen
                name='Booking'
                component={BookingScreen}
            />
            <Stack.Screen
                name='History'
                component={HistoryScreen}
            />
            <Stack.Screen
                name='Payment'
                component={PaymentScreen}
            />
            <Stack.Screen
                name='Profile'
                component={ProfileScreen}
            />
            <Stack.Screen
                name='Login'
                component={LoginScreen}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name='Register'
                component={RegisterScreen}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    );
}

export default MyStack