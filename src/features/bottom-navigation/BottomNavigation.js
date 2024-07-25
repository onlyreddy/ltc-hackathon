import * as React from 'react';
import { Image, StyleSheet, View } from 'react-native'
import { BottomNavigation, Text, Appbar, Avatar, useTheme, Badge } from 'react-native-paper';
import Accounts from './Routes/accounts/Accounts'

const AccountsRoute = () => <Accounts />;

const LoansRoute = () => <View style={styles.placeholderContainer}>
    <Image source={require('../../assets/apply.png')} style={styles.placeholderImage} />
    <Text variant='headlineLarge' style={{ color: '#006a4d' }}>Coming Soon...</Text>
</View>;

const DealsRoute = () => <View style={styles.placeholderContainer}>
    <Image source={require('../../assets/discount.png')} style={styles.placeholderDeal} />
    <Text variant='headlineLarge' style={{ color: '#006a4d' }}>Coming Soon...</Text>
</View>;

const MoreRoute = () => <View style={styles.placeholderContainer}>
    <Image source={require('../../assets/more.png')} style={styles.placeholderImage} />
    <Text variant='headlineLarge' style={{ color: '#006a4d' }}>Coming Soon...</Text>
</View>;

const MyComponent = () => {
    const { colors } = useTheme()
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'accounts', title: 'Accounts', focusedIcon: 'bank', unfocusedIcon: 'bank-outline' },
        { key: 'applyNow', title: 'Apply Now', focusedIcon: 'hand-pointing-up' },
        { key: 'grabDeals', title: 'Grab Deals', focusedIcon: 'tag', unfocusedIcon: 'tag-outline' },
        { key: 'more', title: 'More', focusedIcon: "dots-horizontal-circle", unfocusedIcon: "dots-horizontal-circle-outline" },
    ]);

    const renderScene = BottomNavigation.SceneMap({
        accounts: AccountsRoute,
        applyNow: LoansRoute,
        grabDeals: DealsRoute,
        more: MoreRoute,
    });

    return (
        <>
            <Appbar.Header style={{ backgroundColor: colors.primary }}>
                <Image source={require('../../assets/avatar.jpg')} style={styles.image} />
                <View style={styles.empty} />
                <Appbar.Action color='#fff' icon="magnify" onPress={() => { }} />
                <View style={styles.container}>
                    <Appbar.Action
                        icon="bell"
                        onPress={() => console.log('Bell pressed')}
                        color='#fff'
                    />
                    <Badge style={styles.badge}>3</Badge>
                </View>
                <Appbar.Action color='#fff' icon="logout" onPress={() => { }} />
            </Appbar.Header>
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                activeColor='#006a4d'
            />
        </>
    );
};

export default MyComponent;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
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
        flex: 1
    },

});