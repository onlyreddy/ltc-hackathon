import { StyleSheet, View, ScrollView } from 'react-native';
import { Avatar, Card, Text, IconButton, Button } from 'react-native-paper';
import React from 'react';
import BankOffers from './BankOffers';
import Transactions from './Transactions';
import SendMoney from './SendMoney';
import QuickLinks from './QuickLinks';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const LeftContent = (props) => <Avatar.Icon {...props} icon='bank' />;
const CreditCardLeftContent = (props) => (
    <Avatar.Icon {...props} icon='credit-card-multiple' />
);
const DepositCardLeftContent = (props) => (
    <Avatar.Icon {...props} icon='cash' />
);

const Accounts = () => {
    return (
        <ScrollView>
            <Text variant='displaySmall' style={styles.username}>
                Hi, John Doe
            </Text>
            <View style={styles.container}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                    <Card style={[styles.card, { backgroundColor: '#ecf5f3' }]}>
                        <Card.Title title='ONE VIEW' left={LeftContent} />
                        <Card.Content>
                            <Text variant='titleSmall'>Account Balance</Text>
                            <Text style={styles.balance}>€ 12300.45</Text>
                            <Text variant='titleSmall'>Total account balance</Text>
                            <View style={styles.totalBalance}>
                                <Text style={styles.balance}>€ 31500.65</Text>
                                <IconButton
                                    style={{ position: 'absolute', right: '40%', top: -15 }}
                                    icon='information'
                                    size={20}
                                    onPress={() => console.log('Account Pressed')}
                                />
                            </View>
                        </Card.Content>
                    </Card>
                    <Card style={[styles.card, { backgroundColor: '#f2f7f6' }]}>
                        <Card.Title title='CREDIT CARDS' left={CreditCardLeftContent} />
                        <Card.Content>
                            <Text variant='titleSmall'>Total Limit Utilized</Text>
                            <Text style={styles.balance}>€ 12300.45</Text>
                        </Card.Content>
                    </Card>
                    <Card style={[styles.card, { backgroundColor: '#fafcfc' }]}>
                        <Card.Title title='DEPOSITS' left={DepositCardLeftContent} />
                        <Card.Content>
                            <Text variant='titleSmall'>
                                Grow your savings at attractive interest rates.
                            </Text>
                            <Button mode='text' style={styles.deposit}>
                                Deposit
                            </Button>
                        </Card.Content>
                    </Card>
                    <Button mode='text' style={styles.viewAll}>
                        VIEW ALL
                    </Button>
                </ScrollView>
            </View>
            <View style={styles.promotions}>
                <BankOffers />
            </View>
            <SendMoney />
            <Transactions />
            <QuickLinks />
        </ScrollView>
    );
};

export default Accounts;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10,
    },
    username: {
        paddingLeft: 16,
        paddingTop: 8,
        color: '#006a4d',
    },
    card: {
        width: 250,
        height: 175,
        flex: 1,
        margin: 10,
    },
    balance: {
        fontSize: 16,
        fontWeight: '600',
        paddingBottom: 8,
    },
    totalBalance: {
        justifyContent: 'center',
    },
    deposit: {
        alignItems: 'flex-start',
        marginLeft: -10,
        marginTop: 4,
    },
    viewAll: {
        margin: 'auto',
    },
    promotions: {
        padding: 16,
        height: 225,
        width: '95%',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
});
