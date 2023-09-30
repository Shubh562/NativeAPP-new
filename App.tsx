import React, { useState, useEffect } from 'react';
import { Image, View, Text, StyleSheet, Platform, TextInput, Button as RNButton } from 'react-native';
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
    const [url, setUrl] = useState<string>('');
    const [loadWebView, setLoadWebView] = useState(false);

    useEffect(() => {
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

    if (!loadWebView) {
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.input}
                    placeholder="Enter the URL"
                    onChangeText={setUrl}
                    value={url}
                />
                <RNButton title="Go" onPress={() => { 
                    if (url) setLoadWebView(true); 
                }} />
            </View>
        );
    }

    return (
        <WebView 
            source={{ uri: url }}
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
    },
    input: {
        width: 300,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        backgroundColor: 'white',
        color: 'black'
    }
});

export default App;
