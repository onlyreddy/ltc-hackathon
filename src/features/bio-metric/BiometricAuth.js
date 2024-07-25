import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button, Text } from 'react-native-paper';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const BioMetricAuth = ({ onAuthenticate }) => {
    const [authStatus, setAuthStatus] = useState(false);
    const [biometricTypes, setBiometricTypes] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const checkBiometricSupport = async () => {
            const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
            setBiometricTypes(types);
        };

        checkBiometricSupport();
    }, []);

    const authenticate = async () => {
        try {
            const hasHardware = await LocalAuthentication.hasHardwareAsync();
            if (!hasHardware) {
                setAuthStatus(false);
                return;
            }

            const isEnrolled = await LocalAuthentication.isEnrolledAsync();
            if (!isEnrolled) {
                setAuthStatus('No biometric credentials enrolled');
                return;
            }

            // Check for Face ID specifically
            if (biometricTypes.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
                const result = await LocalAuthentication.authenticateAsync({
                    promptMessage: 'Authenticate with Face ID',
                    fallbackLabel: 'Use Passcode',
                    disableDeviceFallback: false, // Ensure fallback to passcode if biometric fails
                });

                if (result.success) {
                    setAuthStatus(true);
                } else {
                    setAuthStatus(false);
                }
            } else {
                setAuthStatus(false);
            }
        } catch (error) {
            console.error(error);
            setAuthStatus('An error occurred during authentication');
        }
    };

    React.useEffect(() => {
        if (authStatus !== '' && authStatus) {
            navigation.navigate('BottomTabs')
        }
        onAuthenticate && onAuthenticate(authStatus)
    }, [authStatus, onAuthenticate]);

    return (
        <View style={styles.container}>
            <Button onPress={authenticate}
                icon={() => <MaterialCommunityIcons name={Platform.OS === 'ios' ? 'face-recognition' : 'fingerprint'} size={30} color="#006a4d" />}
            >
                <Text variant='labelLarge' style={styles.text}>{Platform.OS === 'ios' ? 'Face ID' : 'Fingerprint'}</Text>
            </Button>
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: '#006a4d',
    },
});

export default BioMetricAuth;
