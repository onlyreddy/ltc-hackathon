import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Image, SafeAreaView } from 'react-native';

const PaymentSuccessfulScreen = ({ navigation }) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Image
                    source={require('../../assets/success-tick.png')} 
                    style={styles.successImage}
                />
                <Text style={styles.title}>Payment Successful</Text>
                <Text style={styles.message}>Thank you for your payment. Your transaction was completed successfully.</Text>

                <Button
                    title="Go to Home"
                    onPress={() => navigation.navigate('Accounts')}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    content: {
        alignItems: 'center',
    },
    successImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 20,
    },
});

export default PaymentSuccessfulScreen;
