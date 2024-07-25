import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform } from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Button } from 'react-native-paper';
import LottieView from 'lottie-react-native';
import faceID from '../../assets/faceID.json';
import biometric from '../../assets/biometric.json';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const BiometricAuth = () => {
    const [isSupported, setIsSupported] = useState(false);
    const [isEnrolled, setIsEnrolled] = useState(false);
    const [isIOSDevice, setIsIOSDevice] = useState(false);

    // Check for biometric support
    const checkBiometricSupport = async () => {
        const supportedTypes =
            await LocalAuthentication.supportedAuthenticationTypesAsync();
        setIsSupported(supportedTypes.length > 0);
    };

    // Check if biometric is enrolled
    const checkBiometricEnrollment = async () => {
        const isEnrolled = await LocalAuthentication.hasHardwareAsync();
        setIsEnrolled(isEnrolled);
    };

    // Authenticate user
    const authenticateUser = async () => {
        try {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: 'Authenticate',
                fallbackLabel: 'Enter Passcode',
            });

            if (result.success) {
                Alert.alert('Success', 'Authentication was successful!');
            } else {
                Alert.alert('Failure', 'Authentication failed!');
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred during authentication');
        }
    };

    // Run initial checks
    React.useEffect(() => {
        checkBiometricSupport();
        checkBiometricEnrollment();

        setIsIOSDevice(Platform.OS === 'android');
    }, []);

    return (
        <View style={styles.container}>
            {isSupported ? (
                isEnrolled ? (
                    <View onPress={authenticateUser} style={styles.biometricContainer} >
                        <MaterialCommunityIcons name={isIOSDevice ? "face-recognition" : 'fingerprint'} size={40} color="#006a4d" onPress={authenticateUser} />
                        <Text>{isIOSDevice ? 'Face ID' : 'Biometric'}</Text>
                    </View>
                ) : (
                    <Text style={styles.message}>No biometric data enrolled</Text>
                )
            ) : (
                <Text style={styles.message}>
                    Biometric authentication not supported
                </Text>
            )}
        </View >
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    message: {
        fontSize: 16,
        color: 'gray',
        marginTop: 10,
    },
    biometric: {
        width: 50,
        height: 50,
    },
    biometricContainer: {
        flexDirection: 'row',
        alignItems: 'center',

    }
});

export default BiometricAuth;
