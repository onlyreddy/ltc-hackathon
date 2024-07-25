import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Text, Button, Image, Alert } from 'react-native';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';

export default function App() {
    const [hasCameraPermission, setHasCameraPermission] = useState(null);
    const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(null);
    const [cameraRef, setCameraRef] = useState(null);
    const [photo, setPhoto] = useState(null);

    useEffect(() => {
        const requestPermissions = async () => {
            try {
                const { status: cameraStatus } = await Camera.requestPermissionsAsync();
                const { status: mediaLibraryStatus } = await MediaLibrary.requestPermissionsAsync();

                setHasCameraPermission(cameraStatus === 'granted');
                setHasMediaLibraryPermission(mediaLibraryStatus === 'granted');
            } catch (error) {
                console.error('Error requesting permissions:', error);
            }
        };

        requestPermissions();
    }, []);

    const takePicture = async () => {
        if (cameraRef) {
            try {
                const { uri } = await cameraRef.takePictureAsync({ quality: 0.5 });
                savePicture(uri);
            } catch (error) {
                console.error('Error taking picture:', error);
                Alert.alert('Error', 'Failed to take picture');
            }
        }
    };

    const savePicture = async (uri) => {
        try {
            const fileName = `${ FileSystem.documentDirectory }photo.jpg`;
            await FileSystem.copyAsync({
                from: uri,
                to: fileName,
            });
            const asset = await MediaLibrary.createAssetAsync(fileName);
            await MediaLibrary.createAlbumAsync('MyPhotos', asset, false);
            Alert.alert('Photo Saved', `Saved to ${ fileName }`);
            setPhoto({ uri: fileName });
        } catch (error) {
            console.error('Error saving picture:', error);
            Alert.alert('Error', 'Failed to save photo');
        }
    };

    if (hasCameraPermission === null || hasMediaLibraryPermission === null) {
        return <View style={styles.container}><Text>Requesting permissions...</Text></View>;
    }

    if (!hasCameraPermission || !hasMediaLibraryPermission) {
        return <Text>No access to camera or media library</Text>;
    }

    return (
        <View style={styles.container}>
            <Camera style={styles.camera} ref={ref => setCameraRef(ref)}>
                <View style={styles.buttonContainer}>
                    <Button title="Take Photo" onPress={takePicture} />
                </View>
            </Camera>
            {photo && <Image source={{ uri: photo.uri }} style={styles.image} />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 20,
        justifyContent: 'center',
    },
    image: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginTop: 10,
    },
});
