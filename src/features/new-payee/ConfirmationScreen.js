import React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { Button, Text, IconButton } from 'react-native-paper';

const ConfirmationScreen = ({ route, navigation }) => {
    const { name, accountNumber, ifscCode, bankName, amount, remarks } = route.params || {};

    const handleConfirm = () => {
        navigation.navigate('OTPScreen');
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text variant='headlineSmall' style={{ marginBottom: 16 }}>Send To</Text>
            <Text variant='labelLarge'>Amount</Text>
            <Text variant='headlineMedium' style={styles.value}>
                {amount}
            </Text>
            <Text variant='labelLarge'>Name</Text>
            <Text variant='labelMedium' style={styles.value}>
                {name}
            </Text>
            <Text variant='labelLarge'>Account Number</Text>
            <Text variant='labelMedium' style={styles.value}>
                {accountNumber}
            </Text>
            <Text variant='labelLarge'>IFSC Code</Text>
            <Text variant='labelMedium' style={styles.value}>
                {ifscCode}
            </Text>
            <Text variant='labelLarge'>Bank Name</Text>
            <Text variant='labelMedium' style={styles.value}>
                {bankName}
            </Text>
            <Text variant='labelLarge'>Remarks</Text>
            <Text variant='labelMedium' style={styles.value}>
                {remarks}
            </Text>
            <Text variant='titleSmall'>PAY FROM</Text>
            <View style={styles.payFrom}>
                <IconButton icon='bank' color='#006a4d' />
                <View style={styles.pay}>
                    <Text variant='labelSmall'>XXXX4545</Text>
                    <Text variant='labelSmall'>
                        SA | Account Balance: &#x00A3;4545.54
                    </Text>
                </View>
            </View>
            <View style={styles.actions}>
                <Button
                    mode='outlined'
                    onPress={handleConfirm}
                    style={{ marginRight: 16 }}
                >
                    CANCEL
                </Button>
                <Button mode='contained' onPress={handleConfirm}>
                    CONFIRM
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        marginBottom: 16,
    },
    actions: {
        marginTop: 16,
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
    },
    value: {
        marginVertical: 12,
        fontWeight: '700',
    },
    payFrom: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: -16,
    },
    pay: {
        flex: 1,
    },
});

export default ConfirmationScreen;
