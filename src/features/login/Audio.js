import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Button, } from 'react-native-paper'
import { Audio } from "expo-av";
import LottieView from "lottie-react-native";
import mike from "../../assets/mic.json";

export default function AudioRecorder() {
    const [recording, setRecording] = useState(null);
    const [recordingUri, setRecordingUri] = useState(null);
    const [sound, setSound] = useState(null);
    const [permissionResponse, requestPermission] = Audio.usePermissions();
    const [playMic, setPlayMic] = React.useState(false);
    const [isRecording, setIsRecording] = React.useState(false);

    useEffect(() => {
        if (permissionResponse && permissionResponse.status !== "granted") {
            requestPermission();
        }
    }, [permissionResponse]);

    const startRecording = async () => {
        try {
            await Audio.setAudioModeAsync({
                allowsRecordingIOS: true,
                playsInSilentModeIOS: true,
            });

            setIsRecording(true);
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setRecordingUri(null);
        } catch (err) {
            console.error("Failed to start recording", err);
        }
    };

    const stopRecording = async () => {
        try {
            setRecording(null);
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            setRecordingUri(uri);
            setIsRecording(false);
            setPlayMic(false);
        } catch (err) {
            console.error("Failed to stop recording", err);
        }
    };

    const playRecording = async () => {
        try {
            if (recordingUri) {
                const { sound } = await Audio.Sound.createAsync(
                    { uri: recordingUri },
                    { shouldPlay: true }
                );
                setSound(sound);

            }
        } catch (err) {
            console.error("Failed to play recording", err);
        }
    };

    const stopPlayback = async () => {
        try {
            if (sound) {
                await sound.stopAsync();
            }
        } catch (err) {
            console.error("Failed to stop playback", err);
        }
    };

    const handleMicPress = React.useCallback(() => {
        setPlayMic(true);
        startRecording();
    }, [startRecording]);

    React.useEffect(() => {
        let timer = null;

        if (isRecording) {
            timer = setTimeout(() => {
                stopRecording();
            }, 1500);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [isRecording, stopRecording]);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleMicPress}>
                <LottieView
                    style={styles.mic}
                    source={mike}
                    autoPlay={playMic}
                    loop
                />
            </TouchableOpacity>
            {recordingUri &&
                <Button onPress={playRecording}>Play</Button>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
    },
    mic: {
        width: 125,
        height: 125,
    },
});
