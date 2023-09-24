import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, Platform } from 'react-native';
import { Button } from '@ant-design/react-native';
import { WebView } from 'react-native-webview';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
const welcomeImage = require('./assets/jiocloud.png');

const requestPermissions = async () => {
    const cameraPermission: any = Platform.select({
        android: PERMISSIONS.ANDROID.CAMERA,
        ios: PERMISSIONS.IOS.CAMERA,
    });

    const microphonePermission: any = Platform.select({
        android: PERMISSIONS.ANDROID.RECORD_AUDIO,
        ios: PERMISSIONS.IOS.MICROPHONE,
    });

    const cameraStatus = await check(cameraPermission);
    const microphoneStatus = await check(microphonePermission);

    if (cameraStatus !== RESULTS.GRANTED) {
        await request(cameraPermission);
    }

    if (microphoneStatus !== RESULTS.GRANTED) {
        await request(microphonePermission);
    }
};

const App: React.FC = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        // Requesting permissions on component mount
        requestPermissions();

        if (showWelcome) {
            setTimeout(() => {
                setShowWelcome(false);
            }, 3000);
        }
    }, [showWelcome]);

    if (showWelcome) {
        return (
            <View style={styles.container}>
                <Image source={welcomeImage} style={styles.welcomeImage} />
            </View>
        );
    }

    if (hasError) {
        return (
            <View style={styles.container}>
                <Text style={styles.errorText}>Failed to connect</Text>
                <Button type="primary" onPress={() => setHasError(false)}>Retry</Button>
            </View>
        );
    }

    return (
        <WebView 
            source={{ uri: 'https://jio-pc.cloudsandbox.in' }}
            onError={(syntheticEvent) => {
                const { nativeEvent } = syntheticEvent;
                console.warn('WebView error: ', nativeEvent);
                setHasError(true);
            }}
            startInLoadingState={true}
            renderLoading={() => (
                <View style={styles.container}>
                    <Text>Loading...</Text>
                </View>
            )}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black'
    },
    welcomeImage: {
        width: 200,
        height: 200,
        resizeMode: 'contain'
    },
    errorText: {
        marginBottom: 20,
        color: 'red',
        fontSize: 16
    }
});

export default App;
