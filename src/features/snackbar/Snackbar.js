import React, { useState } from 'react';
import { View, StyleSheet, Button } from 'react-native';
import { Snackbar as SnackbarPaper, Portal } from 'react-native-paper';

const Snackbar = ({ message }) => {
    const [visible, setVisible] = useState(false);

    const showSnackbar = () => setVisible(true);
    const hideSnackbar = () => setVisible(false);

    return (
        <View style={styles.container}>
            <Button title="Show Snackbar" onPress={showSnackbar} />

            <Portal>
                <SnackbarPaper
                    visible={visible}
                    onDismiss={hideSnackbar}
                    action={{
                        label: 'Close',
                        onPress: () => {
                            // Do something if needed
                        },
                    }}
                    style={styles.snackbar}
                >
                    {message}
                </SnackbarPaper>
            </Portal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    snackbar: {
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: [{ translateX: -150 }], // Adjust according to Snackbar width
        width: 300, // Adjust to match Snackbar width
        backgroundColor: '#323232', // Customize background color if needed
    },
});

export default Snackbar;