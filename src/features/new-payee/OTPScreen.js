import React, { useState, useEffect } from "react";
import { View, StyleSheet, Keyboard } from "react-native";
import {
    TextInput,
    Button,
    Title,
    Subheading,
    Snackbar,
    Modal,
    Portal,
    Text,
    PaperProvider,
} from "react-native-paper";
import BioMetricAuth from "../bio-metric/BiometricAuth";

const OTPScreen = ({ navigation }) => {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const [timer, setTimer] = useState(30); // Timer in seconds
    const [canResend, setCanResend] = useState(false);
    const [snackbarVisible, setSnackbarVisible] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true);
    const [showBioMetric, setShowBioMetric] = useState(false);

    const hideModal = () => setShowBioMetric(false);

    useEffect(() => {
        if (timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(countdown);
        } else {
            setCanResend(true);
        }
    }, [timer]);

    const handleChange = (index, value) => {
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value && index < otp.length - 1) {
            // Focus the next input field
            this[`input${ index + 1 }`].focus();
        }
        setSubmitDisabled(index !== otp.length - 1);

        if (index === otp.length - 1) Keyboard.dismiss();
    };

    const handleSubmit = () => {
        const otpCode = otp.join("");

        setShowBioMetric(true);
    };

    const handleResend = () => {
        setTimer(30);
        setCanResend(false);
        setSnackbarVisible(true);
    };

    const handleAuthenticate = React.useCallback((v) => {
        if (v) {
            setShowBioMetric(false)
            navigation.navigate('PaymentSuccessfulScreen')
        }
    }, [])

    return (
        <>
            <View style={styles.container}>
                <Title style={styles.title}>Enter OTP</Title>
                <Subheading style={styles.subtitle}>
                    We have sent a 6-digit code to your phone number.
                </Subheading>

                <View style={styles.inputContainer}>
                    {otp.map((digit, index) => (
                        <TextInput
                            key={index}
                            style={styles.input}
                            value={digit}
                            onChangeText={(value) => handleChange(index, value)}
                            keyboardType="numeric"
                            maxLength={1}
                            textAlign="center"
                            ref={(ref) => {
                                this[`input${ index }`] = ref;
                            }}
                        />
                    ))}
                </View>

                <Button
                    mode="contained"
                    onPress={handleSubmit}
                    style={styles.button}
                    disabled={submitDisabled}
                >
                    Submit
                </Button>

                <View style={styles.timerContainer}>
                    {!canResend ? (
                        <Text style={styles.timerText}>
                            Resend OTP in {timer} seconds
                        </Text>
                    ) : (
                        <Button
                            mode="text"
                            onPress={handleResend}
                            style={styles.resendButton}
                        >
                            Resend OTP
                        </Button>
                    )}
                </View>

                <Snackbar
                    visible={snackbarVisible}
                    onDismiss={() => setSnackbarVisible(false)}
                    action={{
                        label: "Close",
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    OTP Resent! Please check your messages.
                </Snackbar>
            </View>
            <Modal
                visible={showBioMetric}
                contentContainerStyle={styles.modalContainer}
            >
                <Text variant='headlineSmall' style={styles.modalTitle}>Payment Confirmation</Text>
                <Text variant='labelMedium'>
                    Your OTP has been successfully entered. For added security, please complete a biometric verification to proceed with your transaction.
                </Text>
                <Text variant='labelSmall' style={{ marginVertical: 16 }}>
                    Please use your device's biometric authentication (Face ID, Touch ID, or fingerprint) to verify your identity.
                </Text>
                <BioMetricAuth onAuthenticate={handleAuthenticate} />
                <Button mode='contained' onPress={hideModal} style={{ marginLeft: 'auto', marginVertical: 8 }}>Cancel</Button>
            </Modal>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
    },
    title: {
        marginBottom: 16,
    },
    subtitle: {
        marginBottom: 32,
        textAlign: "center",
    },
    inputContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        width: "100%",
        marginBottom: 16,
    },
    input: {
        width: 50,
        height: 50,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        textAlign: "center",
        fontSize: 24,
    },
    button: {
        marginTop: 16,
    },
    timerContainer: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 16,
    },
    timerText: {
        fontSize: 16,
        color: "#000",
    },
    resendButton: {
        marginLeft: 8,
    },
    modalContainer: {
        backgroundColor: "white",
        padding: 20,
        width: "90%",
        margin: "auto",
    },
    modalTitle: {
        marginBottom: 16
    }
});

export default OTPScreen;
