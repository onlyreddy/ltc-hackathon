import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import Accounts from './Routes/accounts/Accounts';
import { Text, Appbar, Badge, useTheme } from 'react-native-paper';
import NewPayeeForm from '../new-payee/NewPayeeForm';
import { createStackNavigator } from '@react-navigation/stack';
import ConfirmationScreen from '../new-payee/ConfirmationScreen';
import OTPScreen from '../new-payee/OTPScreen';
import PaymentSuccessfulScreen from '../new-payee/PaymentSuccessfulScreen';
import { useNavigation } from '@react-navigation/native';
import Settings from '../settings/Settings'
import ExpensesTracker from '../expenses/ExpensesTracker';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ApplyNowScreen = () => (
    <View style={styles.placeholderContainer}>
        <Image
            source={require('../../assets/apply.png')}
            style={styles.placeholderImage}
        />
        <Text variant='headlineLarge' style={{ color: '#006a4d' }}>
            Coming Soon...
        </Text>
    </View>
);

const GrabDealsScreen = () => (
    <View style={styles.placeholderContainer}>
        <Image
            source={require('../../assets/discount.png')}
            style={styles.placeholderDeal}
        />
        <Text variant='headlineLarge' style={{ color: '#006a4d' }}>
            Coming Soon...
        </Text>
    </View>
);

const MoreScreen = () => (
    <View style={styles.placeholderContainer}>
        <Image
            source={require('../../assets/more.png')}
            style={styles.placeholderImage}
        />
        <Text variant='headlineLarge' style={{ color: '#006a4d' }}>
            Coming Soon...
        </Text>
    </View>
);

const AccountsStack = () => (
    <Stack.Navigator>
        <Stack.Screen name="Accounts" component={Accounts} options={{
            headerShown: false,
        }} />
        <Stack.Screen name="NewPayeeForm" component={NewPayeeStack}
            options={{
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerBackImage: () => <MaterialCommunityIcons
                    name={'chevron-left'}
                    size={40}
                    color={'#006a4d'}
                />,
                headerShown: false,
                headerBackTitleVisible: false
            }}
        />
        <Stack.Screen name="Settings" component={Settings}
            options={{
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerBackImage: () => <MaterialCommunityIcons
                    name={'chevron-left'}
                    size={40}
                    color={'#006a4d'}
                />,
                headerShown: false,
                headerBackTitleVisible: false
            }}
        />
    </Stack.Navigator>
);

const NewPayeeStack = () => (
    <Stack.Navigator>
        <Stack.Screen
            name='NewPayeeForm'
            component={NewPayeeForm}
            options={{
                title: 'New Payee',
                headerStatusBarHeight: 10,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerBackImage: () => <MaterialCommunityIcons
                    name={'chevron-left'}
                    size={40}
                    color={'#006a4d'}
                />,
            }}
        />
        <Stack.Screen
            name='ConfirmPayment'
            component={ConfirmationScreen}
            options={{
                title: 'Confirm Payment',
                headerStatusBarHeight: 10,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerBackImage: () => <MaterialCommunityIcons
                    name={'chevron-left'}
                    size={40}
                    color={'#006a4d'}
                />,
            }}
        />
        <Stack.Screen
            name='OTPScreen'
            component={OTPScreen}
            options={{
                title: 'Payment',
                headerStatusBarHeight: 10,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerBackImage: () => <MaterialCommunityIcons
                    name={'chevron-left'}
                    size={40}
                    color={'#006a4d'}
                />,
            }}
        />
        <Stack.Screen
            name='PaymentSuccessfulScreen'
            component={PaymentSuccessfulScreen}
            options={{
                title: 'Payment Successful',
                headerStatusBarHeight: 10,
                headerTitleAlign: 'left',
                headerBackTitleVisible: false,
                headerBackImage: () => <MaterialCommunityIcons
                    name={'chevron-left'}
                    size={40}
                    color={'#006a4d'}
                />,
            }}
        />
    </Stack.Navigator>
);

const MyTabs = () => {
    const { colors } = useTheme()
    const navigation = useNavigation();

    const handleOnAvatarClick = () => navigation.navigate('Settings');

    return (
        <>
            <Appbar.Header style={{ backgroundColor: colors.primary }}>
                <TouchableOpacity onPress={handleOnAvatarClick}>
                    <Image
                        source={require('../../assets/avatar.jpg')}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={styles.empty} />
                <View style={styles.actions}>
                    <Appbar.Action color='#fff' icon='magnify' onPress={() => { }} />
                    <View style={styles.container}>
                        <Appbar.Action
                            icon='bell'
                            onPress={() => console.log('Bell pressed')}
                            color='#fff'
                        />
                        <Badge style={styles.badge}>3</Badge>
                    </View>
                    <Appbar.Action color='#fff' icon='logout' onPress={() => { }} />
                </View>
            </Appbar.Header>
            <Tab.Navigator
                initialRouteName='Expenses'
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;

                        if (route.name === 'Accounts') {
                            iconName = focused ? 'bank' : 'bank-outline';
                        } else if (route.name === 'Apply Now') {
                            iconName = focused
                                ? 'hand-back-right'
                                : 'hand-back-right-outline';
                        } else if (route.name === 'Grab Deals') {
                            iconName = focused ? 'tag' : 'tag-outline';
                        } else if (route.name === 'More') {
                            iconName = focused
                                ? 'dots-horizontal-circle'
                                : 'dots-horizontal-circle-outline';
                        } else if (route.name === 'Expenses') {
                            iconName = focused
                                ? 'file-chart'
                                : 'file-chart-outline';
                        }

                        return (
                            <MaterialCommunityIcons
                                name={iconName}
                                size={size}
                                color={color}
                            />
                        );
                    },
                })}
                tabBarOptions={{
                    activeTintColor: '#006a4d',
                    inactiveTintColor: 'gray',
                }}
            >
                <Tab.Screen name='Accounts' component={AccountsStack} options={{ headerShown: false }} />
                <Tab.Screen name='Apply Now' component={ApplyNowScreen} options={{ headerShown: false }} />
                <Tab.Screen name='Grab Deals' component={GrabDealsScreen} options={{ headerShown: false }} />
                <Tab.Screen name='Expenses' component={ExpensesTracker} options={{ headerShown: false }} />
                <Tab.Screen name='More' component={MoreScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </>
    );
};

export default MyTabs;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'roboto-regular',
    },
    placeholderContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    placeholderImage: {
        width: 300,
        height: 300,
    },
    placeholderDeal: {
        width: 350,
        height: 200,
    },
    image: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginLeft: 12,
    },
    badge: {
        position: 'absolute',
        top: 2,
        left: '50%',
        backgroundColor: 'red',
        color: 'white',
    },
    empty: {
        flex: 1,
    },
    actions: {
        flex: 1,
        flexDirection: 'row',
    }
});
